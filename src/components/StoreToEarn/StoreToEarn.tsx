"use client";

import Image from "next/image";
import styles from "./StoreToEarn.module.css";

// Пример массива с данными для иконок
const items = [
  { icon: "/icons/user.svg", label: "User A" },
  { icon: "/icons/crypto.svg", label: "Holds crypto" },
  { icon: "/icons/wallet.svg", label: "Fasqon Cold Wallet" },
  { icon: "/icons/lending.svg", label: "Lending Pool" },
  { icon: "/icons/incentives.svg", label: "Users incentives" },
  { icon: "/icons/borrowingfee.svg", label: "Borrowing fee" },
  { icon: "/icons/user2.svg", label: "User B" },
  { icon: "/icons/borrowfunds.svg", label: "Borrowing funds" },
];

export default function StoreToEarn() {
  return (
    <section className={styles.storeSection}>
      {/* Фоновая картинка (цепь) – если нужна абсолютная, можно раскомментировать */}
      
      <div className={styles.bgImage}>
        <Image
          src="/images/chain.png" 
          alt="Chain background"
          fill // cover всю область
          className={styles.chainImage}
        />
      </div>
     

      <div className={styles.content}>
        <h2 className={styles.title}>
          Store to <span>Earn</span>
        </h2>
        <p className={styles.description}>
          Earn passive income by simply holding assets in the Fasqon wallet
          and spending your reward anytime with Fasqon card. 
          <br />
          Hold now. Never pay
        </p>

        <div className={styles.grid}>
          {items.map((item) => (
            <div key={item.label} className={styles.card}>
              <Image
                src={item.icon}
                alt={item.label}
                width={40}
                height={40}
                className={styles.icon}
              />
              <p className={styles.cardLabel}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
