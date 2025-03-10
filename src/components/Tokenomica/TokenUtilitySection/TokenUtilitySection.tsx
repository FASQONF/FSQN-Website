"use client";

import { motion } from "framer-motion";
import styles from "./TokenUtilitySection.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import parse from "html-react-parser";
const titleVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.8 } 
  },
};

const descVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.8, delay: 0.5 } 
  },
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.6 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 1 } 
  },
};

const linesVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 1, delay: 0.3 } 
  },
};

export default function TokenUtilitySection() {
  const t = useTranslation();

  return (
    <section className={styles.tokenUtilitySection}>
      <div className={styles.container}>
        <motion.h2 
          className={styles.title}
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
           {parse(t.tokenUtilitySection.title)}
        </motion.h2>

        <motion.div 
          className={styles.descRow}
          variants={descVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className={styles.descCol}>
            <p>
              {t.tokenUtilitySection.description[0]}
            </p>
            <p>
            {t.tokenUtilitySection.description[1]}
            </p>
          </div>
          <div className={styles.descCol}>
            <p>
            {t.tokenUtilitySection.description[2]}
            </p>
            <p>
            {t.tokenUtilitySection.description[3]}
            </p>
          </div>
        </motion.div>

        <motion.div 
          className={styles.cardsGrid}
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* Фоновая картинка с линиями */}
          <motion.div 
            className={styles.lines}
            variants={linesVariants}
          >
            <img src="/images/tokenomics/lines.png" alt="Lines" className={styles.linesImage} />
          </motion.div>

          <motion.div className={styles.firstLine} variants={cardVariants}>
            <div className={styles.card}> {t.tokenUtilitySection.cards[0][0]}</div>
            <div className={styles.card}>{t.tokenUtilitySection.cards[0][1]}</div>
            <div className={styles.card}>{t.tokenUtilitySection.cards[0][2]}</div>
            <div className={styles.card}>{t.tokenUtilitySection.cards[0][3]}</div>
          </motion.div>
          <motion.div className={styles.secondLine} variants={cardVariants}>
            <div className={styles.card}>{t.tokenUtilitySection.cards[1]}</div>
          </motion.div>
          <motion.div className={styles.thirdLine} variants={cardVariants}>
            <div className={styles.card}>{t.tokenUtilitySection.cards[2][0]}</div>
            <div className={styles.card}>{t.tokenUtilitySection.cards[2][1]}</div>
            <div className={styles.card}>{t.tokenUtilitySection.cards[2][2]}</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
