"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./PartnersSection.module.css";

const partners = [
  {
    name: "PureFi",
    logo: "/images/partners/purefi.png",
    description: "Bridging Compliance and Security in Web3 Ecosystems",
  },
  {
    name: "AMLBot",
    logo: "/images/partners/amlbot.png",
    description: "One-stop assessment compliance solution for crypto business",
  },
  {
    name: "Green Light Equity (GLE)",
    logo: "/images/partners/gle.png",
    description: "An alternative investments group",
  },
  {
    name: "Vareger Group OÜ",
    logo: "/images/partners/vareger.png",
    description: "Has implemented software for banks and fintech projects",
  },
  {
    name: "Trustify Legal",
    logo: "/images/partners/trustify.png",
    description: "Responsible for compliance with legal regulations and licensing",
  },
  {
    name: "Hot Killers",
    logo: "/images/partners/hotkillers.png",
    description: "Marketing support team, which has raised over $100 million for the projects",
  },
];

export default function PartnersSection() {
  return (
    <section className={styles.partnersSection}>
      {/* Фоновое изображение с анимацией увеличения */}
      <motion.div
        className={styles.bgMotion}
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <div className={styles.container}>
        {/* Заголовок */}
        <motion.h2
          className={styles.title}
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8 }}
        >
          Backers <span>&</span> <span>Partners</span>
        </motion.h2>

        {/* Подзаголовок */}
        <motion.p
          className={styles.subtitle}
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Backed and supported by highly professional companies on the market
        </motion.p>

        {/* Карточки партнеров */}
        <div className={styles.grid}>
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className={styles.card}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
            >
              <div className={styles.logoWrapper}>
                <img src={partner.logo} alt={partner.name} />
              </div>
              <h3 className={styles.partnerName}>{partner.name}</h3>
              <p className={styles.partnerDescription}>{partner.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
