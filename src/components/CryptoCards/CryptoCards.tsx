"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./CryptoCards.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import parse from "html-react-parser";

export default function CryptoCards() {
  const t = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = t.cryptoCardsSection.cards.length;

  // При клике на карту делаем её центральной
  const handleCardClick = (index: number) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  // Определяем класс (left/center/right) для каждой карты
  const getPositionClass = (index: number) => {
    const relativePos = (index - currentIndex + length) % length;
    if (relativePos === 0) return styles.centerCard;
    if (relativePos === 1) return styles.rightCard;
    return styles.leftCard;
  };

  // Текущая (центральная) карта
  const currentCard = t.cryptoCardsSection.cards[currentIndex];

  return (
    <section className={styles.sliderSection}>
      {/* Фоновые диаманты */}
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
      {/* Основной контент секции – анимируется, когда секция в зоне видимости */}
      <motion.div
        className={styles.sliderInner}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
      >
        {/* Заголовки */}
        <h2 className={styles.mainTitle}>{parse(t.cryptoCardsSection.title)}</h2>
        <p className={styles.subtitle}>{t.cryptoCardsSection.subtitle}</p>
        {/* Телефон (фон) */}
        <div className={styles.phoneContainer}>
          <img
            src="/images/cards/phone.png"
            alt="Phone background"
            width={336}
            height={678}
            className={styles.phoneBg}
          />
        </div>

        {/* Обёртка для карт */}
        <div className={styles.cardsWrapper}>
          {t.cryptoCardsSection.cards.map((card:any, idx:any) => (            <div
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

        {/* Текст о центральной карте */}
        <div className={styles.cardInfo}>
          <h3 className={styles.cardTitle}>{currentCard.title}</h3>
          <p className={styles.cardDescription}>
            {currentCard.description}
          </p>
        </div>
      </motion.div>

      {/* Преимущества (иконки) внизу */}
      <div className={styles.benefits}>
        {t.cryptoCardsSection.benefits.map((benefit:any, index:any) => (
          <div key={index} className={styles.benefitItem}>
            <img src={benefit.icon} alt={benefit.text} width={24} height={24} />
            <span>{benefit.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
