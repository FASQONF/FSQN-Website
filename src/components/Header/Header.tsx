"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./Header.module.css";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "About", href: "/about" },
  { name: "Join Us", href: "/join-us" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link href="/">
          <Image
            src="/logo.svg" 
            alt="Logo"
            width={40}
            height={40}
            className={styles.logoImage}
          />
        </Link>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={isActive ? styles.activeLink : styles.link}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Правая часть - кнопка White Paper */}
      <div className={styles.right}>
        <Link href="/white-paper" className={styles.whitePaperBtn}>
          White Paper
        </Link>
      </div>
    </header>
  );
}
