"use client";
"use client";

import React, { useState, useEffect, TouchEvent, useRef } from "react";
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
                  <RoadmapListItem
                    key={`${block.year}-mobile-${idx}`}
                    textHtml={item}
                  />
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
  const { t, translations } = useLocalization();

  // Safely pull out your roadmap data; fallback to empty if missing
  const roadmapSection =
    (translations['roadmapSection'] as {
      years?: YearBlock[];
    }) || {};
  const years: YearBlock[] = roadmapSection.years || [];

  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(years.length || 0);
  const [cycleDirection, setCycleDirection] = useState<"show" | "hide">("hide");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setVisibleCount(years.length);
    setCycleDirection("hide");
  }, [years.length]);

  const handleCardCycle = () => {
    if (!years.length) return;
    setVisibleCount((prev) => {
      if (cycleDirection === "hide") {
        const next = Math.max(1, prev - 1);
        if (next === 1) {
          setCycleDirection("show");
        }
        return next;
      }
      const next = Math.min(years.length, prev + 1);
      if (next === years.length) {
        setCycleDirection("hide");
      }
      return next;
    });
  };

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
        <motion.h1
          className="title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={headerVariants}
        >
          {parse(t('roadmapSection.title'))}
        </motion.h1>
        <motion.p
          className="subtitle"
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
            {years.map((block, index) => {
              const isVisible = index < visibleCount;
              return (
                <motion.div
                  key={block.year}
                  className={`${styles.card} ${!isVisible ? styles.cardHidden : ""}`}
                  variants={cardVariants}
                  onClick={handleCardCycle}
                  role="button"
                  tabIndex={isVisible ? 0 : -1}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleCardCycle();
                    }
                  }}
                  aria-hidden={!isVisible}
                >
                  <h3 className={styles.cardYear}>
                    {parse(t(`roadmapSection.years.${years.indexOf(block)}.year`))}
                  </h3>
                  <ul className={styles.itemList}>
                    {block.items.map((itemContent, idx) => {
                      const translationPath = `roadmapSection.years.${years.indexOf(block)}.items.${idx}`;
                      const localized = t(translationPath);
                      const htmlContent = localized || itemContent;

                      return (
                        <RoadmapListItem
                          key={`${block.year}-${idx}`}
                          textHtml={htmlContent}
                        />
                      );
                    })}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}

interface RoadmapListItemProps {
  textHtml: string;
}

function RoadmapListItem({ textHtml }: RoadmapListItemProps) {
  const headingMatch = textHtml.match(/<h4[^>]*>(.*?)<\/h4>/i);
  const headingContent = headingMatch ? headingMatch[1].trim() : null;
  const contentHtml = headingMatch ? textHtml.replace(headingMatch[0], "").trim() : textHtml;
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isMultiline, setIsMultiline] = useState(false);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const updateState = () => {
      if (!element) return;
      const computed = window.getComputedStyle(element);
      const lineHeight = parseFloat(computed.lineHeight);
      if (!lineHeight) return;
      const height = element.getBoundingClientRect().height;
      setIsMultiline(height - lineHeight > 2);
    };

    updateState();

    if (typeof ResizeObserver !== "undefined") {
      const resizeObserver = new ResizeObserver(() => updateState());
      resizeObserver.observe(element);
      return () => resizeObserver.disconnect();
    }
  }, [contentHtml]);

  return (
    <li className={styles.item}>
      {headingContent && (
        <h4 className={styles.itemHeading}>{parse(headingContent)}</h4>
      )}
      {!headingContent && (
        <div
          className={`${styles.textWrapper} ${isMultiline ? styles.textWrapperTall : ""}`}
        />
      )}
      <p ref={textRef}>{parse(contentHtml)}</p>
    </li>
  );
}
