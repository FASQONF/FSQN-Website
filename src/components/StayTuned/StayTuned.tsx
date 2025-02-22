"use client";

import Image from "next/image";
import styles from "./StayTuned.module.css";

export default function StayTuned() {
  return (
    <section className={styles.stayTunedSection}>
      <div className={styles.container}>
        <div className={styles.textBlock}>
          <h2 className={styles.title}>
            Stay <span>tuned</span>
          </h2>
          <p className={styles.subtitle}>Follow Fasqon in social media!</p>
        </div>

        <div className={styles.iconsBlock}>
          {/* X (Twitter) */}
          <a
            href="https://twitter.com/" 
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
          >
            <Image
              src="/icons/x.svg"
              alt="X (Twitter)"
              width={53}
              height={53}
            />
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
          >
            <Image
              src="/icons/telegram.svg"
              alt="Telegram"
              width={53}
              height={53}
            />
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
          >
            <Image
              src="/icons/instagram.svg"
              alt="Instagram"
              width={53}
              height={53}
            />
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
          >
            <Image
              src="/icons/discord.svg"
              alt="Discord"
              width={53}
              height={53}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
