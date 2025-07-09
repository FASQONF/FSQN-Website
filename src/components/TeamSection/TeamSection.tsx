"use client";

import { motion } from "framer-motion";
import styles from "./TeamSection.module.css";
import { useLocalization } from '@/context/LocalizationContext';
import parse from "html-react-parser";

interface TeamMember {
  name: string;
  role: string;
  country: string;
  flag: string;
  image: string;
  mobileImage: string;
  description: string;
  linkedin: string;
}
interface Partner {
  title: string;
  subtitle: string;
  description: string;
}
interface TeamSectionType {
  title: string;
  subtitle: string;
  members: TeamMember[];
  partner: Partner;
}

export default function TeamSection() {
  const { translations } = useLocalization();
  const section = (translations.teamSection as unknown) as TeamSectionType;

  return (
    <section className={styles.teamSection}>
      <div className={styles.container}>
        {/* Header & Description */}
        <motion.div
          className={styles.header}
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>{parse(section.title)}</h2>
        </motion.div>

        {/* Teams cards */}
        <div className={styles.grid}>
          {section.members.map((member, index) => (
            <motion.div
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
                    width={150}
                    height={150}
                    className={styles.avatar}
                  />
                </picture>
              </div>
              <div className={styles.cardInfo}>
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
                <p className={styles.description}>{member.description}</p>
                <div className={styles.bottomRow}>
                  <div className={styles.countryBlock}>
                    <img
                      src={member.flag}
                      alt={member.country}
                      width={24}
                      height={16}
                      className={styles.flag}
                    />
                    <span className={styles.countryName}>{member.country}</span>
                  </div>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkedinLink}
                    >
                      <img
                        className={styles.linkedinIcon}
                        src="/icons/linkedin.svg"
                        alt="LinkedIn"
                        width={21}
                        height={21}
                      />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <img
          className={styles.line}
          src="/icons/line.png"
        />

        {/* New block below the line */}
        <div className={styles.partnerBlock}>
          <div className={styles.imageContainer}>
            <img
              src="/images/partners/vareger.png"
              alt="Vareger"
              className={styles.partnerImage}
            />
          </div>
          <div className={styles.textContainer}>
            <h3 className={styles.partnerTitle}>{section.partner.title}</h3>
            <h4 className={styles.partnerSubtitle}>{section.partner.subtitle}</h4>
            <p className={styles.partnerText}>
              {section.partner.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
