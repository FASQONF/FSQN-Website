"use client";

import { motion } from "framer-motion";
import styles from "./TeamSection.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import parse from "html-react-parser";
import linkedin from "../../../public/icons/linkedin.png"

export default function TeamSection() {
  const t = useTranslation();

  return (
    <section className={styles.teamSection}>
      <div className={styles.container}>
        {/* Заголовок и описание */}
        <motion.div
          className={styles.header}
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
         <h2 className={styles.title}>{parse(t.teamSection.title)}</h2>
         <p className={styles.subtitle}>{t.teamSection.subtitle}</p>
        </motion.div>

        {/* Карточки команды */}
        <div className={styles.grid}>
        {t.teamSection.members.map((member: any, index: number) => (            <motion.div
              key={member.name}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
              <div className={styles.avatarWrapper}>
                <picture>
                  <source media="(max-width: 768px)" srcSet={member.mobileImage} />
                  <source media="(min-width: 769px)" srcSet={member.image} />
                  <img
                    src={member.image}
                    alt={member.name}
                    width="222"
                    height="222"
                    className={styles.avatar}
                  />
                </picture>
              </div>
              <div className={styles.cardInfo}>
                <h3 className={styles.memberName}>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkedinLink}
                  >
                   <img className={styles.linkedinIcon} src={linkedin.src} alt="linkedin"/>{member.name} 
                  </a>
                </h3>
                <p className={styles.memberRole}>{member.role}</p>
                <div className={styles.countryBlock}>
                  <img
                    src={member.flag}
                    alt={member.country}
                    width="24"
                    height="16"
                    className={styles.flag}
                  />
                  <span className={styles.countryName}>{member.country}</span>
                </div>
                <p className={styles.description}>{member.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
