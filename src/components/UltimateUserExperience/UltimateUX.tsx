"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import styles from "./UltimateUX.module.css";
import { useLocalization } from '@/context/LocalizationContext';
import parse from "html-react-parser";


interface FeatureItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface UltimateUXSection {
  title: string;
  subtitle: string;
  features: {
    id: string;
    title: string;
    description: string;
    image: string;
  }[];
}

function getAnimationProps(id: string, disableAnimation: boolean) {
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
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const disableAnimation = isMobile;
  const { t, translations } = useLocalization();

  const section = (translations.ultimateUX as unknown) as UltimateUXSection;
  const rawFeatures = section.features ?? [];

  return (
    <div className={styles.container}>
      {/* Header */}
      <motion.div
        className={styles.header}
        initial={disableAnimation ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
        whileInView={
          disableAnimation ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }
        }
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className={styles.title}>{parse(t("ultimateUX.title"))}</h1>
        <p className={styles.subtitle}>{t("ultimateUX.subtitle")}</p>
      </motion.div>

      {/* Cards grid */}
      <div className={styles.grid}>
        {rawFeatures.map((feature: FeatureItem) => {
          const animationProps = getAnimationProps(feature.id, disableAnimation);
          const delay = parseInt(feature.id, 10) * 0.2;
          return (
            <motion.div
              key={feature.id}
              className={`${styles.card} ${styles["card" + feature.id]} ${feature.id === "02" ? styles.whiteCard : ""
                }`}
              initial={animationProps.initial}
              whileInView={animationProps.animate}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.8, delay }}
            >
              {feature.id === "01" ? (
                <>
                  <div className={styles.cardNumber}>{feature.id}</div>
                  <img
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
                  <img
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
