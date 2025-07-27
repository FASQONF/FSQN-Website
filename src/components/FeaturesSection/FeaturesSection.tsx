"use client";

import { motion, AnimatePresence, easeInOut, Variants } from "framer-motion";
import styles from "./FeaturesSection.module.css";
import { useState, useMemo } from "react";
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
  whileInView: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.5, ease: easeInOut }
  },
  exit: { height: 0, opacity: 0, transition: { duration: 0.5, ease: easeInOut } },
};

// Phone image animation
const imageVariants: Variants = {
  initial: { y: 20, opacity: 0, filter: "brightness(100%)", scale: 1 },
  animate: { y: 0, opacity: 1, filter: "brightness(100%)", scale: 1, transition: { duration: 0.25, ease: easeInOut } },
  exit: { y: 20, opacity: 0.5,filter: "brightness(60%)", scale: 1, transition: { duration: 0.25, ease: easeInOut } },
};

// Accordion title animation
const titleVariants: Variants = {
  closed: { fontSize: "18px", lineHeight: "111%", letterSpacing: "0.06em", color: "rgba(255,255,255,0.8)" },
  open: { fontSize: "24px", lineHeight: "83%", letterSpacing: "0.04em", color: "#0e0" },
};

export default function FeaturesSection() {
  // Localization hook
  const { t, translations } = useLocalization();
  const section = ((translations as any).featuresSection as FeaturesSectionTranslations)
    ?? { title: '', subtitle: '', features: [] };

  // Memoized parsed title
  const titleHtml = useMemo(
    () => parse(t("featuresSection.title")),
    [t]
  );

  const features = Array.isArray(section.features) ? section.features : [];
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  // Currently active feature
  const activeFeature = activeIndex !== null ? features[activeIndex] : null;

  const handleToggle = (index: number) => {
    setActiveIndex(prev => (prev === index ? prev : index));
  };

  return (
    <section className={styles.features}>
      {/* Section title (parsed HTML) */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
      >
        <h2 className={styles.sectionTitle}>{titleHtml}</h2>
        <p className={styles.subtitle}>{t("featuresSection.subtitle")}</p>
      </motion.div>

      {/* Main content: left (image) + right (accordion) */}
      <motion.div
        className={styles.featuresSection}
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
      >
        {/* Left: phone image */}
        <div className={styles.leftSide}>
          <div className={styles.phoneContainer}>
            <AnimatePresence initial={false} mode="wait">
              {activeFeature?.screenImage && (
                <motion.img
                  key={activeFeature.screenImage}
                  src={activeFeature.screenImage}
                  alt={activeFeature.name}
                  width={300}
                  height={600}
                  loading="lazy"
                  className={styles.phoneFrame}
                  variants={imageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                />
              )}
            </AnimatePresence>
          </div>
        </div>
        {/* Right: features accordion */}
        <div className={styles.rightSide}>
          <ul className={styles.featureList}>
            {features.map((feature, idx) => {
              const isOpen = activeIndex === idx;
              return (
                <li key={feature.name} className={styles.accordionItem}>
                  {/* Accordion title */}
                  <motion.div
                    className={styles.accordionTitle}
                    onClick={() => handleToggle(idx)}
                    variants={titleVariants}
                    initial="closed"
                    animate={isOpen ? "open" : "closed"}
                    transition={{ duration: 0.3, ease: easeInOut }}
                  >
                    {feature.name}
                  </motion.div>
                  {/* Accordion content (description) */}
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
