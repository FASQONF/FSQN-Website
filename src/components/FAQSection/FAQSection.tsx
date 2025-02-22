"use client";

import { useState } from "react";
import styles from "./FAQSection.module.css";

// Пример массива из 6 FAQ
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
  // openIndex хранит индекс вопроса, который сейчас раскрыт (или null, если все закрыты)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // Первые три вопроса – левая колонка
  const leftColumnItems = faqItems.slice(0, 3);
  // Последние три – правая колонка
  const rightColumnItems = faqItems.slice(3, 6);

  return (
    <section className={styles.faqSection}>
      <h2 className={styles.title}>FAQ</h2>

      <div className={styles.grid}>
        {/* Левая колонка (3 вопроса) */}
        <div className={styles.column}>
          {leftColumnItems.map((item, index) => {
            // Индекс для левой колонки – это общий index
            // Но нам нужно учитывать, что "item" – часть slice(0,3)
            // Чтобы корректно проверять openIndex, передадим index напрямую (0..2).
            const actualIndex = index; // 0..2
            const isOpen = openIndex === actualIndex;

            return (
              <div key={index} className={styles.faqItem}>
                <div
                  className={styles.questionRow}
                  onClick={() => handleToggle(actualIndex)}
                >
                  <p className={styles.question}>{item.question}</p>
                  <div className={styles.plusIcon}>
                    {isOpen ? "-" : "+"}
                  </div>
                </div>
                {isOpen && (
                  <div className={styles.answer}>
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Правая колонка (3 вопроса) */}
        <div className={styles.column}>
          {rightColumnItems.map((item, index) => {
            // Индекс для правой колонки – 0..2, но в общем массиве это 3..5
            // Значит actualIndex = index + 3
            const actualIndex = index + 3;
            const isOpen = openIndex === actualIndex;

            return (
              <div key={actualIndex} className={styles.faqItem}>
                <div
                  className={styles.questionRow}
                  onClick={() => handleToggle(actualIndex)}
                >
                  <p className={styles.question}>{item.question}</p>
                  <div className={styles.plusIcon}>
                    {isOpen ? "-" : "+"}
                  </div>
                </div>
                {isOpen && (
                  <div className={styles.answer}>
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
