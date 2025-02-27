"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./CryptoCards.module.css";
import { cardsData } from "./cardsData";

export default function CryptoCards() {
  // Индекс текущей (центральной) карты
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = cardsData.length; // Например, 3

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
  const currentCard = cardsData[currentIndex];

  return (
    <section className={styles.sliderSection}>
      {/* Фоновые диаманты */}
      <div className={styles.diamond1}>
        <Image
          src="/images/cards/diamond1.png"
          alt="Diamond 1"
          width={450}
          height={450}
        />
      </div>
      <div className={styles.diamond2}>
        <Image
          src="/images/cards/diamond2.png"
          alt="Diamond 2"
          width={300}
          height={300}
        />
      </div>
      <div className={styles.diamond3}>
        <Image
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
        <h2 className={styles.mainTitle}>
          Fasqon <span>Crypto Card</span>
        </h2>
        <p className={styles.subtitle}>Payments anywhere, anytime</p>

        {/* Телефон (фон) */}
        <div className={styles.phoneContainer}>
          <Image
            src="/images/cards/phone.png"
            alt="Phone background"
            width={336}
            height={678}
            className={styles.phoneBg}
          />
        </div>

        {/* Обёртка для карт */}
        <div className={styles.cardsWrapper}>
          {cardsData.map((card, idx) => (
            <div
              key={card.title}
              className={`${styles.card} ${getPositionClass(idx)}`}
              onClick={() => handleCardClick(idx)}
            >
              <Image
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
        <div className={styles.benefitItem}>
          <Image src="/icons/check.svg" alt="Web3 IBAN" width={24} height={24} />
          <span>Personal Web3 IBAN</span>
        </div>
        <div className={styles.benefitItem}>
          <Image
            src="/icons/check.svg"
            alt="Apple & Google Pay"
            width={24}
            height={24}
          />
          <span>Google & Apple Pay</span>
        </div>
        <div className={styles.benefitItem}>
          <Image src="/icons/check.svg" alt="No KYC" width={24} height={24} />
          <span>No KYC (up to €200)</span>
        </div>
        <div className={styles.benefitItem}>
          <Image src="/icons/check.svg" alt="Cashback" width={24} height={24} />
          <span>Cashback up to 5%</span>
        </div>
      </div>
    </section>
  );
}
