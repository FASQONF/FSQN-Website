"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./CryptoCards.module.css";
import { useLocalization } from '../../context/LocalizationContext';
import parse from "html-react-parser";

interface CryptoCardItem {
  title: string;
  description: string;
  cardImg: string;
}

interface CryptoBenefit {
  icon: string;
  text: string;
}

interface CryptoCardsSection {
  title: string;
  subtitle: string;
  cards: CryptoCardItem[];
  benefits: CryptoBenefit[];
}

export default function CryptoCards() {
  const { t, translations } = useLocalization();
  const [currentIndex, setCurrentIndex] = useState(0);
  const section = (
    (translations.cryptoCardsSection as unknown) as CryptoCardsSection
  ) ?? { title: "", subtitle: "", cards: [], benefits: [] };

  const cards = Array.isArray(section.cards) ? section.cards : [];
  const benefits = Array.isArray(section.benefits) ? section.benefits : [];

  const length = cards.length;

  const handleCardClick = (index: number) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const getPositionClass = (index: number) => {
    const relativePos = (index - currentIndex + length) % length;
    if (relativePos === 0) return styles.centerCard;
    if (relativePos === 1) return styles.rightCard;
    return styles.leftCard;
  };

  const currentCard = cards[currentIndex] || { title: "", description: "" };

  return (
    <section className={styles.sliderSection}>
      {/* Bg diamonds */}
      <div className={styles.diamond1}>
        <img
          src="/images/cards/diamond1.png"
          alt="Diamond 1"
          width={450}
          height={450}
        />
      </div>
      <div className={styles.diamond2}>
        <img
          src="/images/cards/diamond2.png"
          alt="Diamond 2"
          width={300}
          height={300}
        />
      </div>
      <div className={styles.diamond3}>
        <img
          src="/images/cards/diamond3.png"
          alt="Diamond 3"
          width={400}
          height={400}
        />
      </div>
      <motion.div
        className={styles.sliderInner}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
      >
        {/* Headers */}
        <h2 className={styles.mainTitle}>{parse(t("cryptoCardsSection.title"))}</h2>
        <p className={styles.subtitle}>{parse(t("cryptoCardsSection.subtitle"))}</p>
        {/* Phone bg */}
        <div className={styles.phoneContainer}>
          <img
            src="/images/cards/phone.png"
            alt="Phone background"
            width={336}
            height={678}
            className={styles.phoneBg}
          />
        </div>

        {/* Cards container */}
        <div className={styles.cardsWrapper}>
          {cards.map((card: any, idx: any) => (<div
            key={card.title}
            className={`${styles.card} ${getPositionClass(idx)}`}
            onClick={() => handleCardClick(idx)}
          >
            <img
              src={card.cardImg}
              alt={card.title}
              width={400}
              height={250}
              className={styles.cardImage}
            />
          </div>
          ))}
        </div>

        {/* Main text */}
        <div className={styles.cardInfo}>
          <h3 className={styles.cardTitle}>{currentCard.title}</h3>
          <p className={styles.cardDescription}>
            {currentCard.description}
          </p>
        </div>
      </motion.div>

      <div className={styles.ctaWrapper}>
        <a href="/Presentation.pdf" target="_blank"
          className={styles.ctaButton}>
          {t("cryptoCardsSection.ctaText")}
        </a>
      </div>

      {/* Benefits icons */}
      <div className={styles.benefits}>
        {benefits.map((benefit: any, index: any) => (
          <div key={index} className={styles.benefitItem}>
            <img src={benefit.icon} alt={benefit.text} width={24} height={24} />
            <span>{benefit.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
