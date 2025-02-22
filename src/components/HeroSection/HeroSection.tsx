
import Image from "next/image";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Buy, store and earn crypto with <span>Fasqon Wallet</span>
        </h1>
        <p className={styles.description}>
          Discover Fasqon’s unmatched earning opportunities and crypto debit card.
          Enjoy the best crypto rates, cashback on Apple &amp; Google Pay and much more.
        </p>
        <a href="#" className={styles.ctaButton}>
          Get my Fasqon card!
        </a>
      </div>

      <div className={styles.images}>
        <div className={styles.phoneContainer}>
          <Image
            src="/images/phone1.png"
            alt="Fasqon Wallet phone 1"
            width={355}
            height={588}
            className={styles.phoneLeft}
          />
          <Image
            src="/images/phone2.png"
            alt="Fasqon Wallet phone 2"
            width={374}
            height={563}
            className={styles.phoneRight}
          />
        </div>

        {/* Одна картинка с кристаллами */}
       
      </div>
      <Image
          src="/images/diamond.png"
          alt="Green crystals"
          width={1300}
          height={1300}
          className={styles.crystalsImage}
        />
    </section>
  );
}
