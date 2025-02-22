"use client";

import Image from "next/image";
import styles from "./TeamSection.module.css";

const teamMembers = [
  {
    name: "Orest Petryna",
    role: "Founder",
    country: "Portugal",
    flag: "/images/flags/portugal.svg",
    image: "/images/team/orest.png",
    description:
      "Experienced in managing international e-commerce and Fintech companies, with a focus on strategic growth and innovation.",
  },
  {
    name: "Serhiy Khrun",
    role: "Co-Founder",
    country: "Poland",
    flag: "/images/flags/poland.svg",
    image: "/images/team/serhiy.png",
    description:
      "Specializes in developing advanced payment solutions, with a deep understanding of financial technologies and user experience.",
  },
  {
    name: "Sergio Latansky",
    role: "CBDO",
    country: "Spain",
    flag: "/images/flags/spain.svg",
    image: "/images/team/sergio.png",
    description:
      "Expert in identifying growth opportunities, analyzing financial data, and leading high-performing teams to achieve business goals.",
  },
];

export default function TeamSection() {
  return (
    <section className={styles.teamSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Our <span>Team</span>
        </h2>
        <p className={styles.subtitle}>
          The company was founded in February 2023 in Portugal, by a team of individuals
          seriously concerned with the lack of convenient payment solutions for retail
          and business in web3
        </p>

        <div className={styles.grid}>
          {teamMembers.map((member) => (
            <div key={member.name} className={styles.card}>
              <div className={styles.avatarWrapper}>
                <Image
                  src={member.image}
                  alt={member.name}
                  width={222}
                  height={222}
                  className={styles.avatar}
                />
              </div>
              <h3 className={styles.memberName}>{member.name}</h3>
              <p className={styles.memberRole}>{member.role}</p>
              <div className={styles.countryBlock}>
                <Image
                  src={member.flag}
                  alt={member.country}
                  width={24}
                  height={16}
                  className={styles.flag}
                />
                <span className={styles.countryName}>{member.country}</span>
              </div>
              <p className={styles.description}>{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
