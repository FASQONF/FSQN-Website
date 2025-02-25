"use client";

import { motion } from "framer-motion";
import styles from "./TeamSection.module.css";

const teamMembers = [
  {
    name: "Orest Petryna",
    role: "Founder",
    country: "Portugal",
    flag: "/images/flags/portugal.svg",
    image: "/images/team/orest.png",
    mobileImage: "/images/team/orest-mobile.png",
    description:
      "Experienced in managing international e-commerce and Fintech companies, with a focus on strategic growth and innovation.",
  },
  {
    name: "Serhiy Khrun",
    role: "Co-Founder",
    country: "Poland",
    flag: "/images/flags/poland.svg",
    image: "/images/team/serhiy.png",
    mobileImage: "/images/team/serhiy-mobile.png",
    description:
      "Specializes in developing advanced payment solutions, with a deep understanding of financial technologies and user experience.",
  },
  {
    name: "Sergio Latansky",
    role: "CBDO",
    country: "Spain",
    flag: "/images/flags/spain.svg",
    image: "/images/team/sergio.png",
    mobileImage: "/images/team/sergio-mobile.png",
    description:
      "Expert in identifying growth opportunities, analyzing financial data, and leading high-performing teams to achieve business goals.",
  },
];

export default function TeamSection() {
  return (
    <section className={styles.teamSection}>
      <div className={styles.container}>
        {/* Заголовок и описание */}
        <motion.div
          className={styles.header}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>
            Our <span>Team</span>
          </h2>
          <p className={styles.subtitle}>
            The company was founded in February 2023 in Portugal, by a team of individuals
            seriously concerned with the lack of convenient payment solutions for retail
            and business in web3
          </p>
        </motion.div>

        {/* Карточки команды */}
        <div className={styles.grid}>
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
                <h3 className={styles.memberName}>{member.name}</h3>
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
