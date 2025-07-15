"use client";

import { motion, AnimatePresence, easeInOut, Variants } from "framer-motion";
import styles from "./FeaturesSection.module.css";
import { useState } from "react";
import { useLocalization } from '@/context/LocalizationContext';
import parse from "html-react-parser";


interface Feature {
  name: string;
  description: string;
  screenImage?: string;
}

interface FeaturesSectionTranslations {
  title: string;
  subtitle: string;
  features: Feature[];
}

const answerVariants: Variants = {
  hidden: { height: 0, opacity: 0 },
  whileInView: { height: "auto", opacity: 1, transition: { duration: 0.5, ease: easeInOut } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.5, ease: easeInOut } },
};

export default function FeaturesSection() {
  const { t, translations } = useLocalization();
  const section =
    ((translations as any).featuresSection as FeaturesSectionTranslations)
    ?? { title: '', subtitle: '', features: [] };

  const features = Array.isArray(section.features) ? section.features : [];
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const activeFeature = activeIndex !== null ? features[activeIndex] : null;

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };
  return (
    <section className={styles.features}>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
      >
        <h2 className={styles.sectionTitle}>{parse(t("featuresSection.title"))}</h2>
        <p className={styles.subtitle}>{t("featuresSection.subtitle")}</p>
      </motion.div>

      <motion.div
        className={styles.featuresSection}
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.leftSide}>
          <div className={styles.phoneContainer}>
            <img
              src="/images/phones/main.png" // Рамка телефона
              alt="Phone Frame"
              width={355}
              height={716}
              className={styles.phoneFrame}
            />
            {activeFeature && activeFeature.screenImage && (
              <img
                src={activeFeature.screenImage}
                alt={activeFeature.name}
                width={300}
                height={600}
                className={styles.phoneScreen}
              />
            )}
          </div>
        </div>
        <div className={styles.rightSide}>
          <ul className={styles.featureList}>
            {features.map((feature: any, idx: number) => {
              const isOpen = activeIndex === idx;
              return (
                <li key={feature.name} className={styles.accordionItem}>
                  <div
                    className={`${styles.accordionTitle} ${isOpen ? styles.activeItem : ""}`}
                    onClick={() => handleToggle(idx)}
                  >
                    {feature.name}
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className={styles.accordionContent}
                        variants={answerVariants}
                        initial="hidden"
                        whileInView="whileInView"
                        exit="exit"
                        viewport={{ once: true, amount: 0.8 }}
                      >
                        <p>{feature.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
