"use client";

import React, { useState, useEffect, TouchEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./RoadMapSection.module.css";

// Интерфейс для элемента роадмапа
interface RoadMapItem {
  year: string;
  items: string[];
}

const roadMapData: RoadMapItem[] = [
  {
    year: "2024",
    items: [
      "Pre-sale Round B",
      "Wallet MVP development",
      "Launch telegram mini app",
      "Register crypto-fiat license",
    ],
  },
  {
    year: "2025",
    items: [
      "Mass app marketing campaign",
      "Strategic partnerships",
      "IDO",
      "Wallet closed Alpha test",
      "CEX listings",
      "Czech Republic banking license",
      "Reach 1M active users",
    ],
  },
  {
    year: "2026",
    items: [
      "Series A fundraising",
      "Expanding to the regions of Asia and the Middle East",
    ],
  },
  {
    year: "2027-2030",
    items: [
      "Attracting 10M+ active users",
      "Expansion and scaling (increasing transaction volume, more integrations, new products)",
      "AI assistants and additional services",
      "Full ownership profitability with a goal of achieving 30% margin by 2030",
    ],
  },
];

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

  // Обработчики для свайпа (используем тип TouchEvent)
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStart - touchEnd;
    const threshold = 50; // минимальная дистанция для свайпа
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
      {/* Отображаем текущую и предыдущие карточки */}
      {data.map((block, index) => {
        let slideClass = "";
        if (index === currentIndex) {
          slideClass = "active"; // Активная карточка
        } else if (index < currentIndex) {
          slideClass = "previous"; // Предыдущие карточки
        } else {
          slideClass = "next"; // Следующая карточка (скрыта)
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

export default function RoadMapSection() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={styles.roadmapSection}>
      {/* Фоновое изображение */}
      <motion.div
        className={styles.backgroundImage}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={bgVariants}
      >
        <Image
          src="/images/tokenomics/chain.png"
          alt="Roadmap Background"
          fill
          objectFit="cover"
          quality={100}
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
          Road <span>Map</span>
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={headerVariants}
        >
          Key stages of FASQON development
        </motion.p>

        {isMobile ? (
          <MobileVerticalSlider data={roadMapData} />
        ) : (
          <motion.div
            className={styles.grid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={gridVariants}
          >
            {roadMapData.map((block) => (
              <motion.div key={block.year} className={styles.card} variants={cardVariants}>
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
