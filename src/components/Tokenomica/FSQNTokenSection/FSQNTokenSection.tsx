"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./FSQNTokenSection.module.css";

export default function FSQNTokenSection() {
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
          <Image
            src="/images/tokenomics/metal1.png"
            alt="Crystal 1"
            fill
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
            <Image
              src="/images/tokenomics/metal2.png"
              alt="Crystal 2"
              fill
              className={styles.crystalImage}
            />
          </motion.div>

          <div className={styles.phoneWrapper}>
            <Image
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
          <h2 className={styles.title}>
            FSQN <span>Token</span>
          </h2>
          <p className={styles.description}>
            <span>
              With our FSQN token, you get access to all the functionality of our
              platform!
            </span>
            <br />
            <br />
            The utilitarian FSQN token enables payment for services,
            access to features, transparent emission distribution, various token
            sale stages, and participation in a promising project's development.
          </p>

          <div className={styles.iconsRow}>
            <div className={styles.iconCard}>
              <Image
                src="/images/tokenomics/bsc-icon.png" /* Иконка BSC */
                alt="BSC"
                width={189}
                height={92}
              />
            </div>
            <div className={styles.iconCard}>
              <Image
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
