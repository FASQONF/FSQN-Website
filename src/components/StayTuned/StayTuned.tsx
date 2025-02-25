"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./StayTuned.module.css";

export default function StayTuned() {
  return (
    <section className={styles.stayTunedSection}>
      <div className={styles.container}>
        {/* Текстовый блок – появляется слева направо */}
        <motion.div
          className={styles.textBlock}
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className={styles.title}>
            Stay <span>tuned</span>
          </h2>
          <p className={styles.subtitle}>Follow Fasqon in social media!</p>
        </motion.div>

        {/* Блок иконок – появляется справа налево */}
        <motion.div
          className={styles.iconsBlock}
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}
