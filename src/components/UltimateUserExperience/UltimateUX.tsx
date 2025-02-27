"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import styles from "./UltimateUX.module.css";

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

const features: FeatureItem[] = [
  {
    id: "01",
    title: "Seed Phrase Registration",
    description:
      "Easily sign up using a unique seed phrase to ensure your privacy",
    image: "/images/ux/seed-phrase.png",
  },
  {
    id: "02",
    title: "AI Assistants",
    description:
      "Provide security, anti-fraud, education and entertainment",
    image: "/images/ux/ai-assistant.png",
  },
  {
    id: "03",
    title: "Safe Chatting",
    description: "Secret P2P messaging mode between devices",
    image: "/images/ux/safe-chat.png",
  },
  {
    id: "04",
    title: "Fraud&Theft Protection",
    description:
      "Multi-factor authentication that enhances security",
    image: "/images/ux/protection.png",
  },
];

function getAnimationProps(id: string, disableAnimation: boolean) {
  // Если анимация отключена, возвращаем одинаковые значения initial и animate
  if (disableAnimation) {
    return {
      initial: { opacity: 1, x: 0, y: 0, rotate: 0 },
      animate: { opacity: 1, x: 0, y: 0, rotate: 0 },
    };
  }
  // Иначе возвращаем исходные варианты
  switch (id) {
    case "01":
      return {
        initial: { x: -100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
      };
    case "02":
      return {
        initial: { x: 100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
      };
    case "03":
      return {
        initial: { y: 100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
      };
    case "04":
      return {
        initial: { y: -100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
      };
    default:
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      };
  }
}

export default function UltimateUX() {
  // Определяем, мобильное ли устройство (например, ширина < 768px)
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const disableAnimation = isMobile; // Для мобильных отключаем появление

  return (
    <div className={styles.container}>
      {/* Заголовок и подзаголовок */}
      <motion.div
        className={styles.header}
        initial={disableAnimation ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
        whileInView={
          disableAnimation ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }
        }
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className={styles.title}>
          Ultimate <span className={styles.highlight}>User Experience</span>
        </h1>
        <p className={styles.subtitle}>Discover the best with Fasqon</p>
      </motion.div>

      {/* Сетка карточек */}
      <div className={styles.grid}>
        {features.map((feature) => {
          const animationProps = getAnimationProps(feature.id, disableAnimation);
          const delay = parseInt(feature.id, 10) * 0.2;
          return (
            <motion.div
              key={feature.id}
              className={`${styles.card} ${styles["card" + feature.id]} ${
                feature.id === "02" ? styles.whiteCard : ""
              }`}
              initial={animationProps.initial}
              whileInView={animationProps.animate}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.8, delay }}
            >
              {feature.id === "01" ? (
                <>
                  <div className={styles.cardNumber}>{feature.id}</div>
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={250}
                    height={400}
                    className={`${styles.cardImage} ${styles["image" + feature.id]}`}
                  />
                  <div className={styles.cardContentBottom}>
                    <h3 className={styles.cardTitle}>{feature.title}</h3>
                    <p className={styles.cardDescription}>
                      {feature.description}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.cardContent}>
                    <div className={styles.cardNumber}>{feature.id}</div>
                    <h3 className={styles.cardTitle}>{feature.title}</h3>
                    <p className={styles.cardDescription}>
                      {feature.description}
                    </p>
                  </div>
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={250}
                    height={400}
                    className={`${styles.cardImage} ${styles["image" + feature.id]}`}
                  />
                </>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
