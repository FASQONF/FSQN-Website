"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./FeaturesSection.module.css";

// Каждый пункт имеет название, описание и картинку-экран (прозрачный PNG)
const features = [
  {
    name: "Crypto Card",
    description:
      "Discover a virtual or physical cryptocurrency card from Fasqon and spend cryptocurrency wherever and whenever you like.",
    // screenImage: "/images/phones/main.png",
  },
  {
    name: "Buy",
    description:
      "Easily purchase cryptocurrency using your Fasqon Wallet. Enjoy low fees and instant transactions.",
    screenImage: "/images/phones/buy.png",
  },
  {
    name: "Sell",
    description:
      "Convert your crypto back to fiat whenever you want, with transparent rates and quick payouts.",
    screenImage: "/images/phones/sell.png",
  },
  {
    name: "Swap",
    description:
      "Swap between different cryptocurrencies in seconds, without leaving your wallet interface.",
    screenImage: "/images/phones/swap.png",
  },
  {
    name: "Earn",
    description:
      "Stake or lend your crypto assets and earn passive income with Fasqon’s secure staking program.",
    screenImage: "/images/phones/hold.png",
  },
  {
    name: "Talk",
    description:
      "Stay connected with built-in messaging and support chat. Ask questions, share tips, and grow together.",
    screenImage: "/images/phones/talk.png",
  },
];

export default function FeaturesSection() {
 
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

 
  const activeFeature =
    activeIndex !== null ? features[activeIndex] : null;

  return (
    <section className={styles.features}>
      <h2 className={styles.sectionTitle}>
          Discover Fasqon <span>Crypto Wallet</span>
        </h2>
        <p className={styles.subtitle}>All features in one app</p>
      <div className={styles.featuresSection}>
        <div className={styles.leftSide}>
          <div className={styles.phoneContainer}>
         <Image
           src="/images/phones/main.png" // Рамка телефона
           alt="Phone Frame"
           width={355}
           height={716}
           className={styles.phoneFrame}
         />

         {/* Прозрачный экран, меняется в зависимости от activeIndex */}
         {activeFeature && activeFeature.screenImage && (
           <Image
             src={activeFeature.screenImage}
             alt={activeFeature.name}
             width={300}
             height={600}
             className={styles.phoneScreen}
           />
         )}
          </div>
        </div>
        <div className={styles.rightSide}>
          <ul className={styles.featureList}>
            {features.map((feature, idx) => {
              const isOpen = activeIndex === idx;

              // Функция, которая меняет/сбрасывает индекс
              const handleClick = () => {
                if (isOpen) {
                  // Если кликнули на уже открытый пункт, можно свернуть (null)
                  setActiveIndex(null);
                } else {
                  // Иначе раскрываем пункт idx
                  setActiveIndex(idx);
                }
              };

              return (
                <li key={feature.name} className={styles.accordionItem}>
                  {/* Заголовок пункта */}
                  <div
                    className={`${styles.accordionTitle} ${
                      isOpen ? styles.activeItem : ""
                    }`}
                    onClick={handleClick}
                  >
                    {feature.name}
                  </div>

                  {/* Текст, который показывается только если isOpen = true */}
                  {isOpen && (
                    <div className={styles.accordionContent}>
                      <p>{feature.description}</p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
