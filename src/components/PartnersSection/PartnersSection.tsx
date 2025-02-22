"use client";

import Image from "next/image";
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
      <div className={styles.container}>
        <h2 className={styles.title}>
          Backers <span>&</span> <span>Partners</span>
        </h2>
        <p className={styles.subtitle}>
          Backed and supported by highly professional companies on the market
        </p>

        <div className={styles.grid}>
          {partners.map((partner) => (
            <div key={partner.name} className={styles.card}>
              <div className={styles.logoWrapper}>
                <img src={partner.logo} alt={partner.name} />
              </div>
              <h3 className={styles.partnerName}>{partner.name}</h3>
              <p className={styles.partnerDescription}>{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
