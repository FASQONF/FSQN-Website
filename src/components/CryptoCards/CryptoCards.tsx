"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./CryptoCards.module.css";
import { cardsData } from "./cardsData";

export default function CryptoCards() {
    // Индекс текущей (центральной) карты
    const [currentIndex, setCurrentIndex] = useState(0);
    const length = cardsData.length; // 3
  
    // Клик по карте: если кликнули на левую/правую — делаем её центральной
    const handleCardClick = (index: number) => {
      if (index !== currentIndex) {
        setCurrentIndex(index);
      }
    };
  
    // Определяем класс (left/center/right) для каждой карты
    const getPositionClass = (index: number) => {
      const relativePos = (index - currentIndex + length) % length;
      // При 3 картах: 0 => центр, 1 => справа, 2 => слева
      if (relativePos === 0) return styles.centerCard;
      if (relativePos === 1) return styles.rightCard;
      return styles.leftCard;
    };
  
    // Текущая (центральная) карта
    const currentCard = cardsData[currentIndex];
  
    return (
      <section className={styles.sliderSection}>
        {/* === Фоновые диаманты (absolute, позади всего) === */}
        <div className={styles.diamond1}>
          <Image
            src="/images/diamonds/diamond1.png"
            alt="Diamond 1"
            width={200}
            height={200}
          />
        </div>
        <div className={styles.diamond2}>
          <Image
            src="/images/diamonds/diamond2.png"
            alt="Diamond 2"
            width={300}
            height={300}
          />
        </div>
  
        {/* === Внутренний контейнер (relative), чтобы располагать элементы абсолютно === */}
        <div className={styles.sliderInner}>
          {/* Заголовки */}
          <h2 className={styles.mainTitle}>
            Fasqon <span>Crypto Card</span>
          </h2>
          <p className={styles.subtitle}>Payment anywhere, anytime</p>
  
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
  
          {/* Обёртка для карт (absolute) */}
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
  
          {/* Текст о центральной карте (absolute, ближе к картам) */}
          <div className={styles.cardInfo}>
            <h3 className={styles.cardTitle}>{currentCard.title}</h3>
            <p className={styles.cardDescription}>{currentCard.description}</p>
          </div>
        </div>
  
        {/* Преимущества (иконки) внизу (в потоке) */}
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
            <span>No KYC (up to 200 eur)</span>
          </div>
          <div className={styles.benefitItem}>
            <Image
              src="/icons/check.svg"
              alt="Cashback"
              width={24}
              height={24}
            />
            <span>Cashback up to 5%</span>
          </div>
        </div>
      </section>
    );
  }
