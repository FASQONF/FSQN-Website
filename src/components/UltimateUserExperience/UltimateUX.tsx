"use client";

import { useState } from "react";
import styles from "./UltimateUX.module.css";

// Если у тебя отдельный файл types.ts – можешь импортировать оттуда
interface FeatureItem {
  id: string;
  title: string;
  description: string;
  image: string;
  className: string;
}

const features: FeatureItem[] = [
  {
    id: "01",
    title: "Seed Phrase Registration",
    description:
      "Sign up easily with a unique seed phrase, ensuring your privacy",
    image: "/images/ux/seed-phrase.png",
    className: styles.seed,
  },
  {
    id: "02",
    title: "AI Assistants",
    description:
      "Provide security, anti-fraud, education and entertainment",
    image: "/images/ux/ai-assistant.png",
    className: styles.ai,
  },
  {
    id: "03",
    title: "Safe Chatting",
    description: "Secret P2P messaging mode between devices",
    image: "/images/ux/safe-chat.png",
    className: styles.chat,
  },
  {
    id: "04",
    title: "Fraud&Theft Protection",
    description: "Multi-factor authentication that enhances security",
    image: "/images/ux/protection.png",
    className: styles.protection,
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

      {/* Сетка 2×2 на десктопе */}
      <div className={styles.grid}>
        {features.map((feature) => (
          <div key={feature.id} className={`${styles.card} ${feature.className}`}>
            <div className={styles.cardNumber}>{feature.id}</div>
            <h3 className={styles.cardTitle}>{feature.title}</h3>
            <p className={styles.cardDescription}>{feature.description}</p>
            <img
              src={feature.image}
              alt={feature.title}
              className={styles.cardImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
