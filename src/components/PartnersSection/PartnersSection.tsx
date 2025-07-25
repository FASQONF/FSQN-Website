"use client";

import { motion } from "framer-motion";
import styles from "./PartnersSection.module.css";
import { useLocalization } from '@/context/LocalizationContext';
import parse from "html-react-parser";
import { useEffect, useState, useMemo } from "react";

interface PartnerItem {
  name: string;
  logo: string;
}
interface PartnersSectionType {
  title: string;
  partners: PartnerItem[];
  mediaTitle: string;
  media: PartnerItem[];
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

  const special = section.partners.find(p => p.name === "Bison Bank");
  const otherPartners = section.partners.filter(p => p.name !== "Bison Bank").slice(0, 19);
  const displayPartners = isMobileOrTablet && special
    ? [special, ...otherPartners]
    : section.partners.slice(0, 20);

  const delays = useMemo(
    () => displayPartners.map(() => Math.random() * 0.5),
    [displayPartners]
  );

  const mediaDelays = useMemo(
    () => section.media.map(() => Math.random() * 0.5),
    [section.media]
  );

  return (
    <section className={styles.partnersSection}>
      <div className={styles.container}>
        {/* Header */}
        <motion.h2
          className={styles.title}
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          {parse(section.title)}
        </motion.h2>

        {/* Partners logo grid */}
        <div className={styles.grid}>
          {displayPartners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className={`${styles.card} ${partner.name === "Bison Bank" ? styles.special : ""}`}
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

        <div className={styles.mediaBlock}>
          {/* Header 2 */}
          <motion.h2
            className={styles.title}
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            {parse(section.mediaTitle)}
          </motion.h2>

          {/* Media logo grid */}
          <div className={styles.mediaGrid}>
            {section.media.map((item, idx) => (
              <motion.div
                key={item.name}
                className={styles.mediaCard}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.3, delay: mediaDelays[idx] }}
              >
                <div className={styles.logoWrapper}>
                  <img src={item.logo} alt={item.name} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
