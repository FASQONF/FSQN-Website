"use client";

import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import styles from "./UltimateUX.module.css";
import { useLocalization } from '@/context/LocalizationContext';
import parse from "html-react-parser";
import ResponsiveCarousel from "@/utils/carousel/ResponsiveCarousel";


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
  switch (id) {
    case "01":
    case "05":
      return { initial: { x: -100, opacity: 0 }, animate: { x: 0, opacity: 1 } };
    case "02":
    case "03":
    case "04":
    case "06":
      return { initial: { x: 100, opacity: 0 }, animate: { x: 0, opacity: 1 } };
    default:
      return { initial: { opacity: 0 }, animate: { opacity: 1 } };
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
      <motion.div
        className={styles.header}
        initial={disableAnimation ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
        whileInView={disableAnimation ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="title">{parse(t("ultimateUX.title"))}</h1>
        <h2 className={`subtitle ${styles.highlight}`}>{parse(t("ultimateUX.subtitle"))}</h2>
      </motion.div>

      {!isMobile && (
        <div className={styles.grid}>
          {rawFeatures.map((feature) => (
            <motion.div
              key={feature.id}
              className={`${styles.card} ${styles["card" + feature.id]}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.cardNumber}>{feature.id}</div>
              <img
                src={feature.image}
                alt={feature.title}
                width={250}
                height={400}
                className={`${styles.cardImage} ${styles["image" + feature.id]}`}
              />
              <div className={styles.cardContentBottom}>
                <h3 className={styles.cardTitle}>{parse(feature.title)}</h3>
                <p className={styles.cardDescription}>{parse(feature.description)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {isMobile && (
        <ResponsiveCarousel enableOn="mobile" breakpointPx={768} loop={false} showArrows>
          {rawFeatures.map((feature) => (
            <div key={feature.id} className={styles.card}>
              <div className={styles.cardNumber}>{feature.id}</div>
              <img
                src={feature.image}
                alt={feature.title}
                width={250}
                height={400}
                className={`${styles.cardImage} ${styles["image" + feature.id]}`}
              />
              <div className={styles.cardContentBottom}>
                <h3 className={styles.cardTitle}>{parse(feature.title)}</h3>
                <p className={styles.cardDescription}>{parse(feature.description)}</p>
              </div>
            </div>
          ))}
        </ResponsiveCarousel>
      )}
    </div>
  );
}