"use client";

import styles from "./UltimateUX.module.css";

// Если у тебя отдельный файл types.ts – можешь импортировать оттуда
interface FeatureItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

const features: FeatureItem[] = [
  {
    id: "01",
    title: "Seed Phrase Registration",
    description: "Sign up easily with a unique seed phrase, ensuring your privacy",
    image: "/images/ux/seed-phrase.png",
  },
  {
    id: "02",
    title: "AI Assistants",
    description: "Provide security, anti-fraud, education and entertainment",
    image: "/images/ux/ai-assistant.png",
  },
  {
    id: "03",
    title: "Safe Chatting",
    description: "Secret P2P messaging mode between devices",
    image: "/images/ux/safe-chat.png",
  },
  {
    id: "04",
    title: "Fraud&Theft Protection",
    description: "Multi-factor authentication that enhances security",
    image: "/images/ux/protection.png",
  },
];

export default function UltimateUX() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Ultimate <span className={styles.highlight}>User Experience</span>
        </h1>
        <p className={styles.subtitle}>Discover the best with Fasqon</p>
      </div>

      <div className={styles.grid}>
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`${styles.card} ${styles[`card${feature.id}`]} ${
              feature.id === "02" ? styles.whiteCard : ""
            }`}
          >
            {feature.id === "01" ? (
              <>
                <div className={styles.cardNumber}>{feature.id}</div>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className={`${styles.cardImage} ${styles[`image${feature.id}`]}`}
                />
                <div className={styles.cardContentBottom}>
                  <h3 className={styles.cardTitle}>{feature.title}</h3>
                  <p className={styles.cardDescription}>{feature.description}</p>
                </div>
              </>
            ) : (
              <>
                <div className={styles.cardContent}>
                  <div className={styles.cardNumber}>{feature.id}</div>
                  <h3 className={styles.cardTitle}>{feature.title}</h3>
                  <p className={styles.cardDescription}>{feature.description}</p>
                </div>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className={`${styles.cardImage} ${styles[`image${feature.id}`]}`}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}