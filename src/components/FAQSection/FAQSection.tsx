"use client";

import { useState } from "react";
import { motion, AnimatePresence, easeInOut, Variants } from "framer-motion";
import styles from "./FAQSection.module.css";
import { useLocalization } from '../../context/LocalizationContext';

interface FAQItem {
  question: string;
  answer: string;
}
interface FAQSectionType {
  title: string;
  items: FAQItem[];
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { translations } = useLocalization();

  const section = (translations.faqSection as unknown) as FAQSectionType;

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };
  const leftColumnItems = section.items.slice(0, 3);
  const rightColumnItems = section.items.slice(3, 6);

  const cardVariants = {
    initial: { scale: 0.8, opacity: 0, rotate: -5 },
    whileInView: { scale: 1, opacity: 1, rotate: 0 },
  };

  const answerVariants: Variants = {
    hidden: { height: 0, opacity: 0 },
    whileInView: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.5, ease: easeInOut }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.5, ease: easeInOut }
    }
  };

  return (
    <section className={styles.faqSection}>
      <motion.h2
        className={styles.title}
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {section.title}
      </motion.h2>

      <div className={styles.grid}>
        <div className={styles.column}>
          {leftColumnItems.map((item, index) => {
            const actualIndex = index;
            const isOpen = openIndex === actualIndex;
            return (
              <motion.div
                key={index}
                className={styles.faqItem}
                variants={cardVariants}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              >
                <div className={styles.questionRow} onClick={() => handleToggle(actualIndex)}>
                  <p className={styles.question}>{item.question}</p>
                  <div className={styles.plusIcon}>{isOpen ? "-" : "+"}</div>
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className={styles.answer}
                      variants={answerVariants}
                      initial="hidden"
                      whileInView="whileInView"
                      exit="exit"
                      viewport={{ once: true, amount: 0.8 }}
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className={styles.column}>
          {rightColumnItems.map((item, index) => {
            const actualIndex = index + 3;
            const isOpen = openIndex === actualIndex;
            return (
              <motion.div
                key={actualIndex}
                className={styles.faqItem}
                variants={cardVariants}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              >
                <div className={styles.questionRow} onClick={() => handleToggle(actualIndex)}>
                  <p className={styles.question}>{item.question}</p>
                  <div className={styles.plusIcon}>{isOpen ? "-" : "+"}</div>
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className={styles.answer}
                      variants={answerVariants}
                      initial="hidden"
                      whileInView="whileInView"
                      exit="exit"
                      viewport={{ once: true, amount: 0.8 }}
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
