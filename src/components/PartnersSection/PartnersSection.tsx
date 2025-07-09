"use client";

import { motion } from "framer-motion";
import styles from "./PartnersSection.module.css";
import { useLocalization } from '@/context/LocalizationContext';
import parse from "html-react-parser";
import { useEffect, useState } from "react";

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
  const section = (translations.partnersSection as unknown) as PartnersSectionType;
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileOrTablet(window.innerWidth <= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const bisonBank = section.partners.find(partner => partner.name === "Bison Bank");
  const otherPartners = section.partners.filter(partner => partner.name !== "Bison Bank").slice(0, 19);
  
  const displayPartners = isMobileOrTablet && bisonBank 
    ? [bisonBank, ...otherPartners] 
    : section.partners.slice(0, 20);

  return (
    <section className={styles.partnersSection}>
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

        {/* Logo grid */}
        <div className={styles.grid}>
          {displayPartners.map((partner) => (
            <motion.div
              key={partner.name}
              className={`${styles.card} ${partner.name === "Bison Bank" ? styles.bison : ""
                }`}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.8 }}
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
