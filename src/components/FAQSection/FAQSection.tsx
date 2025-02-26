"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FAQSection.module.css";

const faqItems = [
  {
    question: "What is FASQON and how does it ensure user privacy?",
    answer:
      "FASQON is a next-gen blockchain platform focused on user privacy by leveraging advanced encryption, zero-knowledge proofs, and secure key management.",
  },
  {
    question: "How does FASQON’s private bank card work?",
    answer:
      "FASQON’s private bank card integrates seamlessly with your crypto wallet, allowing you to spend digital assets in real-world transactions while ensuring privacy.",
  },
  {
    question: "How does the FASQON blockchain messenger work?",
    answer:
      "It’s a decentralized messaging protocol that uses end-to-end encryption and distributed storage, ensuring no central entity can access or censor conversations.",
  },
  {
    question: "Can I participate in token sales on FASQON, and what are the stages?",
    answer:
      "Yes, FASQON is currently in the fundraising stage for its token sale. The investment stages include Seed Round, Private Sale, and an upcoming IDO (Initial DEX Offering).",
  },
  {
    question: "How can I register on FASQON, and what information is required?",
    answer:
      "Registering on FASQON requires a valid email, basic KYC (if needed for certain services), and the creation of a secure seed phrase for wallet access.",
  },
  {
    question: "What unique features does FASQON offer?",
    answer:
      "FASQON offers multi-chain support, advanced AI-driven security, private bank cards, and a blockchain-based messenger for secure, censorship-resistant communication.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // Разбиваем FAQ на две колонки
  const leftColumnItems = faqItems.slice(0, 3);
  const rightColumnItems = faqItems.slice(3, 6);

  // Варианты анимации для FAQ пункта
  const cardVariants = {
    initial: { scale: 0.8, opacity: 0, rotate: -5 },
    whileInView: { scale: 1, opacity: 1, rotate: 0 },
  };

  // Анимация для содержимого аккордеона (ответа)
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
        FAQ
      </motion.h2>

      <div className={styles.grid}>
        {/* Левая колонка */}
        <div className={styles.column}>
          {leftColumnItems.map((item, index) => {
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

        {/* Правая колонка */}
        <div className={styles.column}>
          {rightColumnItems.map((item, index) => {
            const actualIndex = index + 3; // 3..5
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
