"use client";

import { motion } from "framer-motion";
import styles from "./HeroSection.module.css";
import { useLocalization } from '@/context/LocalizationContext';
import parse from "html-react-parser";

export default function HeroSection() {
  const { t } = useLocalization();

  return (
    <section className={styles.heroSection}>
      {/* Текстовый блок, появляется слева → направо */}
      <motion.div 
        className={styles.content}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className={styles.title}>
        {parse(t("title"))}
        </h1>
        <p className={styles.description}>
        {parse(t("description"))}
        </p>
        <a href="/Presentation.pdf" target="_blank" className={styles.ctaButton}>
        {t("cta")}
        </a>
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
