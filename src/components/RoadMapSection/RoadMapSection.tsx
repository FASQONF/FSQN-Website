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

const MOBILE_LEAVING_DURATION = 500;

interface MobileVerticalSliderProps {
  data: RoadMapItem[];
}

function MobileVerticalSlider({ data }: MobileVerticalSliderProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [mobileCycleDirection, setMobileCycleDirection] = useState<"forward" | "backward">("forward");
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);

  useEffect(() => {
    setCurrentIndex(0);
    setMobileCycleDirection("forward");
    setLeavingIndex(null);
  }, [data.length]);

  useEffect(() => {
    if (leavingIndex === null) return;
    const timeout = window.setTimeout(() => setLeavingIndex(null), MOBILE_LEAVING_DURATION);
    return () => window.clearTimeout(timeout);
  }, [leavingIndex]);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const cycleSlides = (overrideDirection?: "forward" | "backward") => {
    if (!data.length) return;

    setCurrentIndex((prevIndex) => {
      const lastIndex = data.length - 1;
      let directionToUse = overrideDirection ?? mobileCycleDirection;

      if (!overrideDirection) {
        if (directionToUse === "forward" && prevIndex === lastIndex) {
          directionToUse = "backward";
        } else if (directionToUse === "backward" && prevIndex === 0) {
          directionToUse = "forward";
        }
      }

      const nextIndex =
        directionToUse === "forward"
          ? Math.min(prevIndex + 1, lastIndex)
          : Math.max(prevIndex - 1, 0);

      if (directionToUse !== mobileCycleDirection) {
        setMobileCycleDirection(directionToUse);
      }

      if (directionToUse === "backward") {
        setLeavingIndex(prevIndex);
      } else {
        setLeavingIndex(null);
      }

      return nextIndex;
    });
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStart - touchEnd;
    const threshold = 50;
    if (swipeDistance > threshold) {
      if (currentIndex < data.length - 1) {
        cycleSlides("forward");
      }
    } else if (swipeDistance < -threshold) {
      if (currentIndex > 0) {
        cycleSlides("backward");
      }
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleActiveTap = () => {
    cycleSlides();
  };

  const handleActiveKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      cycleSlides();
    }
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
        const isLeaving = leavingIndex === index;
        const slideClasses = [
          styles.slide,
          slideClass ? styles[slideClass] : "",
          isLeaving ? styles.leaving : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <motion.div
            key={block.year}
            className={slideClasses}
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
            onClick={index === currentIndex ? handleActiveTap : undefined}
            role={index === currentIndex ? "button" : undefined}
            tabIndex={index === currentIndex ? 0 : -1}
            onKeyDown={index === currentIndex ? handleActiveKeyDown : undefined}
            aria-label={index === currentIndex ? `Roadmap ${block.year}` : undefined}
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

        <div className={styles.tapIndicator}>
          <div className={styles.tapIndicatorAnim}></div>
        </div>

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
              return (
                <motion.div
                  key={block.year}
                  className={styles.card}
                  variants={cardVariants}
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
