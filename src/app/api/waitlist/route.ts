import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const RATE_LIMIT_WINDOW_MS = 2 * 60 * 1000; // 2 min
const RATE_LIMIT_MAX = 3;

type Hit = { ts: number };

const hitsByKey = new Map<string, Hit[]>();

function getClientKey(req: Request) {
    const ip =
        req.headers.get("cf-connecting-ip") ||
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        "unknown";

    return ip;
}

function isRateLimited(key: string) {
    const now = Date.now();
    const arr = hitsByKey.get(key) ?? [];
    const fresh = arr.filter((h) => now - h.ts < RATE_LIMIT_WINDOW_MS);

    if (fresh.length >= RATE_LIMIT_MAX) {
        hitsByKey.set(key, fresh);
        const retryAfterSec = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - fresh[0].ts)) / 1000);
        return { limited: true as const, retryAfterSec };
    }

    fresh.push({ ts: now });
    hitsByKey.set(key, fresh);
    return { limited: false as const, retryAfterSec: 0 };
}

function isEmailValid(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function normalizeEmail(email: string) {
    return email.trim().toLowerCase();
}

function csvEscape(v: string) {
    const s = String(v ?? "");
    if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
}

async function ensureDir(p: string) {
    await fs.mkdir(p, { recursive: true });
}

async function fileExists(p: string) {
    try {
        await fs.stat(p);
        return true;
    } catch {
        return false;
    }
}

function parseCsvLine(line: string): string[] {
    const out: string[] = [];
    let cur = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const ch = line[i];

        if (inQuotes) {
            if (ch === '"') {
                const next = line[i + 1];
                if (next === '"') {
                    cur += '"';
                    i++;
                } else {
                    inQuotes = false;
                }
            } else {
                cur += ch;
            }
        } else {
            if (ch === ",") {
                out.push(cur);
                cur = "";
            } else if (ch === '"') {
                inQuotes = true;
            } else {
                cur += ch;
            }
        }
    }

    out.push(cur);
    return out;
}

async function withFileLock(lockPath: string, fn: () => Promise<Response>) {
    let handle: fs.FileHandle | null = null;

    for (let i = 0; i < 10; i++) {
        try {
            handle = await fs.open(lockPath, "wx");
            break;
        } catch {
            await new Promise((r) => setTimeout(r, 50));
        }
    }

    if (!handle) {
        return NextResponse.json({ ok: false, error: "Busy. Try again." }, { status: 503 });
    }

    try {
        return await fn();
    } finally {
        try { await handle.close(); } catch { }
        try { await fs.unlink(lockPath); } catch { }
    }
}

export async function POST(req: Request) {
    try {
        const key = getClientKey(req);
        const rl = isRateLimited(key);

        if (rl.limited) {
            return NextResponse.json(
                { ok: false, error: "Too many requests. Try again later." },
                { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
            );
        }

        const body = (await req.json().catch(() => null)) as
            | { name?: unknown; email?: unknown; waitlist?: unknown; subscribe?: unknown }
            | null;

        const name = String(body?.name ?? "").trim();
        const email = normalizeEmail(String(body?.email ?? ""));
        const waitlist = Boolean(body?.waitlist ?? false);
        const subscribe = Boolean(body?.subscribe ?? false);

        if (!name) {
            return NextResponse.json({ ok: false, error: "Name is required." }, { status: 400 });
        }
        if (!email || !isEmailValid(email)) {
            return NextResponse.json({ ok: false, error: "Valid email is required." }, { status: 400 });
        }

        const now = new Date().toISOString();
        const dataDir = path.join(process.cwd(), "data");
        const filePath = path.join(dataDir, "waitlist.csv");
        const lockPath = path.join(dataDir, "waitlist.lock");

        await ensureDir(dataDir);

        return await withFileLock(lockPath, async () => {
            const HEADER = "name,mail,waitlist,subscribe,time";
            const exists = await fileExists(filePath);

            if (!exists) {
                await fs.writeFile(filePath, HEADER + "\n", "utf8");
            }

            const csv = await fs.readFile(filePath, "utf8");
            const rawLines = csv.split(/\r?\n/);

            const firstLine = (rawLines[0] ?? "").trim();
            const hasHeader = firstLine.toLowerCase() === HEADER;

            const dataLines = (hasHeader ? rawLines.slice(1) : rawLines)
                .map((l) => l.trim())
                .filter(Boolean);

            const newRow =
                `${csvEscape(name)},` +
                `${csvEscape(email)},` +
                `${waitlist ? "true" : "false"},` +
                `${subscribe ? "true" : "false"},` +
                `${csvEscape(now)}`;

            let replaced = false;
            const nextLines = dataLines.map((line) => {
                const cols = parseCsvLine(line);
                const existingEmail = normalizeEmail(cols[1] ?? "");
                if (existingEmail && existingEmail === email) {
                    replaced = true;
                    return newRow;
                }
                return line;
            });

            if (!replaced) nextLines.push(newRow);

            const nextCsv = HEADER + "\n" + nextLines.join("\n") + "\n";
            await fs.writeFile(filePath, nextCsv, "utf8");

            return NextResponse.json({ ok: true, updated: replaced });
        });
    } catch {
        return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
    }
}
