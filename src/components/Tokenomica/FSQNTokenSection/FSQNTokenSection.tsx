"use client";

import { motion } from "framer-motion";
import styles from "./FSQNTokenSection.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import parse from "html-react-parser";
export default function FSQNTokenSection() {
  const t = useTranslation();

  return (
    <section className={styles.fsqnSection}>
      <div className={styles.container}>
        {/* Кристалл 1 (фон) с анимацией справа -> влево */}
        <motion.div
          className={styles.crystal1Wrapper}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <img
            src="/images/tokenomics/metal1.png"
            alt="Crystal 1"
            // fill
            className={styles.crystalImage}
          />
        </motion.div>

        {/* Блок с телефоном и кристаллом 2 */}
        <motion.div
          className={styles.phoneBlock}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div
            className={styles.crystal2Wrapper}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <img
              src="/images/tokenomics/metal2.png"
              alt="Crystal 2"
              // fill
              className={styles.crystalImage}
            />
          </motion.div>

          <div className={styles.phoneWrapper}>
            <img
              src="/images/tokenomics/phone.png"
              alt="FSQN token phone screen"
              width={355}
              height={716}
              className={styles.phoneImage}
            />
          </div>
        </motion.div>

        {/* Текстовый блок (заголовок, описание, иконки) появляется слева -> направо */}
        <motion.div
          className={styles.textBlock}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h2 className={styles.title}>{parse(t.fsqnTokenSection.title)}</h2>
          <p className={styles.description}>{parse(t.fsqnTokenSection.description)}</p>

          <div className={styles.iconsRow}>
            <div className={styles.iconCard}>
              <img
                src="/images/tokenomics/bsc-icon.png" /* Иконка BSC */
                alt="BSC"
                width={189}
                height={92}
              />
            </div>
            <div className={styles.iconCard}>
              <img
                src="/images/tokenomics/fsqn-icon.png" /* Иконка FSQN */
                alt="FSQN"
                width={225}
                height={88}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
