"use client";

import { motion } from "framer-motion";
import styles from "./HeroSection.module.css";
import socialStyles from "@/components/ContactSection/ContactSection.module.css";
import { useLocalization } from '@/context/LocalizationContext';
import { SOCIALS } from "@/components/ContactSection/ContactSection";
import parse from "html-react-parser";

export default function HeroSection() {
  const { t } = useLocalization();

  return (
    <section className={styles.heroSection}>
      <motion.div
        className={styles.content}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="title">
          {parse(t("title"))}
        </h1>
        <h2 className="subtitle">
          {parse(t("subtitle"))}
        </h2>
        <div className={styles.description}>
          {parse(t("description"))}
        </div>
        <div className={socialStyles.socials}>
          {SOCIALS.map(s => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className={socialStyles.socialLink}
            >
              <img src={s.icon} alt={s.name} className={socialStyles.socialIcon} />
            </a>
          ))}
        </div>
        {/* <a href="https://tokensale.fasqon.com" target="_blank" className={styles.ctaButton}>
          {t("cta")}
        </a> */}
      </motion.div>

      <motion.div
        className={styles.imagesWrapper}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.phoneContainer}>
          <img
            src="/images/phone1.png"
            alt="Fasqon Wallet phone 1"
            width={355}
            height={588}
            className={styles.phoneLeft}
          />
          <img
            src="/images/phone2.png"
            alt="Fasqon Wallet phone 2"
            width={374}
            height={563}
            className={styles.phoneRight}
          />
        </div>

        <div className={styles.crystalsWrapper}>
          <img
            src="/images/diamond.png"
            alt="Green crystals"
            width={800}
            height={800}
            className={styles.crystalsImage}
          />
        </div>
      </motion.div>
    </section>
  );
}
