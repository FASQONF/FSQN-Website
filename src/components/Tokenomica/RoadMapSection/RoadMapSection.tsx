"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./RoadMapSection.module.css";

const roadMapData = [
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

/* Варианты для появления заголовка (сверху вниз) */
const headerVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
};

/* Варианты для фонового изображения (увеличение) */
const bgVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 1 } },
};

/* Варианты для карточек (desktop) */
const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 1,
    },
  },
};

const cardVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1 },
  },
};

export default function RoadMapSection() {
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

        {/* Для десктопа */}
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
      </div>
    </section>
  );
}
