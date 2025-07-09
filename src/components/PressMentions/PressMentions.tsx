"use client";

import styles from "./PressMentions.module.css";

const logos = [
  { src: "/images/partners/cryptomode.png", alt: "CryptoMode" },
  { src: "/images/partners/Chaiwire.png", alt: "Chainwire" },
  { src: "/images/partners/Finbold.png", alt: "Finbold" },
  { src: "/images/partners/CoinMarketCap.png", alt: "CoinMarketCap" },
];

export default function PressMentions() {
  const repeatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className={styles.pressSection}>

      <div className={styles.carousel}>
        <div className={styles.track}>
          {repeatedLogos.map((logo, idx) => (
            <div key={idx} className={styles.logoItem}>
              <img src={logo.src} alt={logo.alt} className={styles.logoImage} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
