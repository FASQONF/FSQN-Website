"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FAQSection.module.css";
import { useTranslation } from "@/hooks/useTranslation";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = useTranslation();

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };
  const leftColumnItems = t.faqSection.items.slice(0, 3);
  const rightColumnItems = t.faqSection.items.slice(3, 6);

  const cardVariants = {
    initial: { scale: 0.8, opacity: 0, rotate: -5 },
    whileInView: { scale: 1, opacity: 1, rotate: 0 },
  };

  const answerVariants = {
    hidden: { height: 0, opacity: 0 },
    whileInView: { height: "auto", opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
    exit: { height: 0, opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } },
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
         {t.faqSection.title}
      </motion.h2>

      <div className={styles.grid}>
        {/* Левая колонка */}
        <div className={styles.column}>
          {leftColumnItems.map((item:any, index:any) => {
            const actualIndex = index; // 0..2
            const isOpen = openIndex === actualIndex;
            return (
              <motion.div
                key={index}
                className={styles.faqItem}
                variants={cardVariants}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, amount: 0.8 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
              >
                <div
                  className={styles.questionRow}
                  onClick={() => handleToggle(actualIndex)}
                >
                  <p className={styles.question}>{item.question}</p>
                  <div className={styles.plusIcon}>
                    {isOpen ? "-" : "+"}
                  </div>
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
          {rightColumnItems.map((item:any, index:any) => {
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
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
              >
                <div
                  className={styles.questionRow}
                  onClick={() => handleToggle(actualIndex)}
                >
                  <p className={styles.question}>{item.question}</p>
                  <div className={styles.plusIcon}>
                    {isOpen ? "-" : "+"}
                  </div>
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
