"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
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
        Your crypto <span>neobank</span> for daily payments{/* Buy, store and earn crypto with <span>Fasqon Wallet</span> */}
        </h1>
        <p className={styles.description}>
          Discover Fasqon’s unmatched earning opportunities and crypto debit card.
          Enjoy the best crypto rates, cashback on Apple &amp; Google Pay and much more.
        </p>
        <a href="#" className={styles.ctaButton}>
          Get my Fasqon card!
        </a>
      </motion.div>

      {/* Блок с изображениями (телефоны + кристаллы) */}
      <motion.div 
        className={styles.imagesWrapper}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.phoneContainer}>
          <Image
            src="/images/phone1.png"
            alt="Fasqon Wallet phone 1"
            width={355}
            height={588}
            className={styles.phoneLeft}
          />
          <Image
            src="/images/phone2.png"
            alt="Fasqon Wallet phone 2"
            width={374}
            height={563}
            className={styles.phoneRight}
          />
        </div>

        {/* Кристаллы располагаем внутри того же контейнера */}
        <div className={styles.crystalsWrapper}>
          <Image
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
