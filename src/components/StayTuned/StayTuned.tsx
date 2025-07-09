"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./StayTuned.module.css";
import { useLocalization } from '@/context/LocalizationContext';
import parse from "html-react-parser";


export default function StayTuned() {
  const { t } = useLocalization();

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
          <h2 className={styles.title}>{parse(t("stayTuned.title"))}</h2>
          <p className={styles.subtitle}>{t("stayTuned.subtitle")}</p>
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
            href="https://x.com/fasqon"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
          >
            <img
              src="/icons/x.svg"
              alt="X (Twitter)"
              width={53}
              height={53}
            />
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/fasqonofficial"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
          >
            <img
              src="/icons/telegram.svg"
              alt="Telegram"
              width={53}
              height={53}
            />
          </a>
          <a
            href="https://t.me/fasqonchat"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
          >
            <img
              src="/icons/telegram2.svg"
              alt="Telegram"
              width={53}
              height={53}
            />
          </a>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/fasqon_official/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
          >
            <img
              src="/icons/instagram.svg"
              alt="Instagram"
              width={53}
              height={53}
            />
          </a>
          <a
            href="https://medium.com/@fasqon.official"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
          >
            <img
              src="/icons/medium.svg"
              alt="Instagram"
              width={53}
              height={53}
            />
          </a>
          {/* Discord */}
          <a
            href="https://discord.com/invite/gkRd9vSEr8"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
          >
            <img
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
