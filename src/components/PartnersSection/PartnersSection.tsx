"use client";

import { motion } from "framer-motion";
import styles from "./PartnersSection.module.css";
import { useLocalization } from "@/context/LocalizationContext";
import parse from "html-react-parser";
import { useMemo } from "react";

interface PartnerItem {
  name: string;
  logo: string;
}
interface PartnersSectionType {
  title: string;
  partners: PartnerItem[];
}

export default function PartnersSection() {
  const { translations } = useLocalization();
  const section = translations.partnersSection as unknown as PartnersSectionType;

  const displayPartners = section.partners;

  const delays = useMemo(
    () => displayPartners.map(() => Math.random() * 0.5),
    [displayPartners]
  );

  return (
    <section className={styles.partnersSection}>
      <div className={styles.container}>
        <motion.h1
          className="title"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          {parse(section.title)}
        </motion.h1>

        <div className={styles.grid}>
          {displayPartners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className={styles.card}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.3, delay: delays[index] }}
            >
              <div className={styles.logoWrapper}>
                <img src={partner.logo} alt={partner.name} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}