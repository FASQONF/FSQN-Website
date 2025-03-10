"use client";

import { motion } from "framer-motion";
import styles from "./PartnersSection.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import parse from "html-react-parser";

export default function PartnersSection() {
  const t = useTranslation();

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
           {parse(t.partnersSection.title)}
        </motion.h2>

        {/* Подзаголовок */}
        <motion.p
          className={styles.subtitle}
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t.partnersSection.subtitle}
        </motion.p>

        {/* Карточки партнеров */}
        <div className={styles.grid}>
          {t.partnersSection.partners.map((partner: any, index: number) => (
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
