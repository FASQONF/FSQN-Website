"use client";

import { motion } from "framer-motion";
import styles from "./PartnersSection.module.css";
import { useLocalization } from '@/context/LocalizationContext';
import parse from "html-react-parser";

interface PartnerItem {
  name: string;
  logo: string;
  description: string;
}
interface PartnersSectionType {
  title: string;
  subtitle: string;
  partners: PartnerItem[];
}

export default function PartnersSection() {
  const { translations } = useLocalization();
  const section = (translations.partnersSection as unknown) as PartnersSectionType;

  return (
    <section className={styles.partnersSection}>
      <motion.div
        className={styles.bgMotion}
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <div className={styles.container}>
        {/* Header */}
        <motion.h2
          className={styles.title}
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8 }}
        >
          {parse(section.title)}
        </motion.h2>

        {/* Header 2 */}
        <motion.p
          className={styles.subtitle}
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {section.subtitle}
        </motion.p>

        {/* Partners */}
        <div className={styles.grid}>
          {section.partners.map((partner, index) => (
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
