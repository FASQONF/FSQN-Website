"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FAQSection.module.css";

const faqItems = [
  {
    question: "What is FASQON and how does it ensure user privacy?",
    answer:
      "Fasqon is a private AI-powered ecosystem designed for secure communication, crypto-fiat transactions, and confidential data storage. It uses seed phrase authentication instead of phone numbers or emails, ensuring user data remains protected. Messages and transactions are encrypted, and Fasqon does not store any personal information on centralized servers.",
  },
  {
    question: "How does FASQON’s private bank card work?",
    answer:
      "Fasqon offers a crypto-friendly bank card linked to a personal IBAN, allowing users to spend crypto and fiat seamlessly. The card can be topped up via SEPA transfers, P2P payments, and crypto deposits. For transactions up to €200, no KYC is required, ensuring accessibility while maintaining security standards.",
  },
  {
    question: "How does the FASQON blockchain messenger work?",
    answer:
      "Fasqon’s messenger is a secure, encrypted communication tool that does not require a SIM card for registration. Users sign up using a seed phrase, ensuring a private and secure connection. The messenger supports P2P transactions, allowing users to send payments directly through chat. All messages and transactions are encrypted end-to-end.",
  },
  {
    question: "Can I participate in token sales on FASQON, and what are the stages?",
    answer:
      "Yes, Fasqon’s token, FSQN, is available in different sales stages. The private sale rounds have set prices, with the next phase being a private round at $0.015 per token, followed by an IDO at $0.03. Users can participate in these sales through official Fasqon channels and partner exchanges.",
  },
  {
    question: "How can I register on FASQON, and what information is required?",
    answer:
      "Registration on Fasqon does not require personal data such as a phone number or email. Instead, users create an account with a seed phrase, ensuring a high level of privacy and security. This method eliminates the risk of identity leaks while granting full control over funds and communications.",
  },
  {
    question: "What unique features does FASQON offer?",
    answer:
      "Fasqon combines a Web3 wallet, a private bank card, a secure messenger, and AI-powered financial tools in a single platform. Key features include a personal IBAN, crypto-fiat conversions, P2P payments, encrypted messaging, AI assistants for financial automation, and a Play-to-Airdrop rewards system.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const leftColumnItems = faqItems.slice(0, 3);
  const rightColumnItems = faqItems.slice(3, 6);

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
