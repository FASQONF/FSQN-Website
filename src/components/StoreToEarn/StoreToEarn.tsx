"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./StoreToEarn.module.css";
import { AnimatedLineDesktop } from "./AnimatedLineDesktop";
import { AnimatedLineMobile } from "./AnimatedLineMobile";
import { useEffect, useState } from "react";

export function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

const items = [
  { icon: "/icons/user.svg", label: "User A" },
  { icon: "/icons/crypto.svg", label: "Holds crypto" },
  { icon: "/icons/wallet.svg", label: "Fasqon Cold Wallet" },
  { icon: "/icons/lending.svg", label: "Lending Pool" },
  { icon: "/icons/incentives.svg", label: "Users incentives" },
  { icon: "/icons/borrowingfee.svg", label: "Borrowing fee" },
  { icon: "/icons/user2.svg", label: "User B" },
  { icon: "/icons/borrowfunds.svg", label: "Borrowing funds" },
];

// Анимации
const contentVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
};

const gridVariants = {
  hidden: { y: -30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { staggerChildren: 0.1, duration: 0.8 },
  },
};

const cardVariants = {
  hidden: { y: -30, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const bgVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 1 } },
};

export default function StoreToEarn() {
  const width = useWindowWidth();
  const isMobile = width && width < 1024;

  return (
    <section className={styles.storeSection}>
      {/* Фоновое изображение */}
      <motion.div
        className={styles.bgImage}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={bgVariants}
      >
        <Image
          src="/images/chain.png"
          alt="Chain background"
          fill
          className={styles.chainImage}
        />
      </motion.div>

      {/* Контент (заголовок и описание) */}
      <motion.div
        className={styles.content}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={contentVariants}
      >
        <h2 className={styles.title}>
          Store to <span>Earn</span>
        </h2>
        <p className={styles.description}>
          Earn passive income by simply holding assets in the Fasqon wallet
          and spending your reward anytime with Fasqon card.
          <br />
          Hold now. Pay never.
        </p>
      </motion.div>

      {/* Обёртка для карточек и анимированной линии */}
      <div className={styles.cardsWrapper}>
        {/* Анимированная линия */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={styles.animatedLineWrapper}
        >
          {isMobile ? <AnimatedLineMobile /> : <AnimatedLineDesktop />}
        </motion.div>
        {/* Сетка карточек */}
        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={gridVariants}
        >
          {items.map((item) => (
            <motion.div key={item.label} className={styles.card} variants={cardVariants}>
              <Image
                src={item.icon}
                alt={item.label}
                width={40}
                height={40}
                className={styles.icon}
              />
              <p className={styles.cardLabel}>{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
