"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./TokenUtilitySection.module.css";

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
          Token <span>Utility</span>
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
              Access the enhanced features of our messenger/wallet by maintaining a certain token balance.
            </p>
            <p>
              Receive discounts on commissions and service fees by using FSQN tokens for payments.
            </p>
          </div>
          <div className={styles.descCol}>
            <p>
              Benefit from our daily buyback strategy, with 25% of profits used to purchase and burn tokens.
            </p>
            <p>
              Explore trading opportunities within our platform for potential gains.
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
            <div className={styles.card}>Get Card</div>
            <div className={styles.card}>Payments</div>
            <div className={styles.card}>Internal Trxs</div>
            <div className={styles.card}>Passive income mode</div>
          </motion.div>
          <motion.div className={styles.secondLine} variants={cardVariants}>
            <div className={styles.card}>Treasury</div>
          </motion.div>
          <motion.div className={styles.thirdLine} variants={cardVariants}>
            <div className={styles.card}>40% Ecosystem growth</div>
            <div className={styles.card}>50% User incentives</div>
            <div className={styles.card}>10% Monthly Burn</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
