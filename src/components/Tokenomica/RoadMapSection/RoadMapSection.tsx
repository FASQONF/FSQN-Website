"use client";

import React, { useState, useEffect, TouchEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./RoadMapSection.module.css";
import { useLocalization } from '@/context/LocalizationContext';
import parse from "html-react-parser";


interface RoadMapItem {
  year: string;
  items: string[];
}

const headerVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
};

const bgVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 1 } },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 1 } },
};

const cardVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 1 } },
};

interface MobileVerticalSliderProps {
  data: RoadMapItem[];
}

function MobileVerticalSlider({ data }: MobileVerticalSliderProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStart - touchEnd;
    const threshold = 50;
    if (swipeDistance > threshold && currentIndex < data.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (swipeDistance < -threshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div
      className={styles.mobileSlider}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {data.map((block, index) => {
        let slideClass = "";
        if (index === currentIndex) {
          slideClass = "active";
        } else if (index < currentIndex) {
          slideClass = "previous";
        } else {
          slideClass = "next";
        }

        return (
          <motion.div
            key={block.year}
            className={`${styles.slide} ${styles[slideClass]}`}
            initial={{ y: "100%" }}
            animate={{
              y:
                slideClass === "active"
                  ? "0%"
                  : slideClass === "previous"
                    ? `-${(currentIndex - index) * 60}px`
                    : "100%",
            }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.card}>
              <h3 className={styles.cardYear}>{block.year}</h3>
              <ul className={styles.itemList}>
                {block.items.map((item, idx) => (
                  <li key={idx} className={styles.item}>
                    <div className={styles.iconWrapper}>
                      <Image
                        src="/icons/check.svg"
                        alt="Check"
                        width={16}
                        height={16}
                      />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

interface YearBlock {
  year: string;
  items: string[];
}

export default function RoadMapSection() {
  const [isMobile, setIsMobile] = useState(false);
  const { t, translations } = useLocalization();

  // Safely pull out your roadmap data; fallback to empty if missing
  const roadmapSection =
    (translations['roadmapSection'] as {
      years?: YearBlock[];
    }) || {};
  const years: YearBlock[] = roadmapSection.years || [];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className={styles.roadmapSection}>
      {/* Background image animation */}
      <motion.div
        className={styles.backgroundImage}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={bgVariants}
      >
        <img
          src="/images/tokenomics/chain.png"
          alt={t('roadmapSection.backgroundAlt') /* add this key to your JSON */}
        />
      </motion.div>

      <div className={styles.container}>
        <motion.h2
          className={styles.title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={headerVariants}
        >
          {parse(t('roadmapSection.title'))}
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={headerVariants}
        >
          {parse(t('roadmapSection.subtitle'))}
        </motion.p>

        {isMobile ? (
          <MobileVerticalSlider data={years} />
        ) : (
          <motion.div
            className={styles.grid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={gridVariants}
          >
            {years.map((block) => (
              <motion.div
                key={block.year}
                className={styles.card}
                variants={cardVariants}
              >
                <h3 className={styles.cardYear}>
                  {parse(t(`roadmapSection.years.${years.indexOf(block)}.year`))}
                </h3>
                <ul className={styles.itemList}>
                  {block.items.map((itemKey, idx) => (
                    <li key={idx} className={styles.item}>
                      <div className={styles.iconWrapper}>
                        <Image
                          src="/icons/check.svg"
                          alt="Check mark"
                          width={16}
                          height={16}
                        />
                      </div>
                      <span>
                        {parse(t(`roadmapSection.years.${years.indexOf(block)}.items.${idx}`))}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}