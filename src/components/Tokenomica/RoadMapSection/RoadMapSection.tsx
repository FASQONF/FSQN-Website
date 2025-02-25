"use client";

import Image from "next/image";
import styles from "./RoadMapSection.module.css";

const roadMapData = [
  {
    year: "2024",
    items: [
      "Pre-sale Round B",
      "Wallet MVP development",
      "Launch telegram mini app",
      "Register crypto-fiat license",
    ],
  },
  {
    year: "2025",
    items: [
      "Mass app marketing campaign",
      "Strategic partnerships",
      "IDO",
      "Wallet closed Alpha test",
      "CEX listings",
      "Czech Republic banking license",
      "Reach 1M active users",
    ],
  },
  {
    year: "2026",
    items: [
      "Series A fundraising",
      "Expanding to the regions of Asia and the Middle East",
    ],
  },
  {
    year: "2027-2030",
    items: [
      "Attracting 10M+ active users",
      "Expansion and scaling (increasing transaction volume, more integrations, new products)",
      "AI assistants and additional services",
      "Full ownership profitability with a goal of achieving 30% margin by 2030",
    ],
  },
];

export default function RoadMapSection() {
  return (
    <section className={styles.roadmapSection}>
      {/* Фоновое изображение */}
      

      <div className={styles.container}>
        <h2 className={styles.title}>
          Road <span>Map</span>
        </h2>
        <p className={styles.subtitle}>Key stages of FASQON development</p>

        <div className={styles.grid}>
          {roadMapData.map((block) => (
            <div key={block.year} className={styles.card}>
              <h3 className={styles.cardYear}>{block.year}</h3>
              <ul className={styles.itemList}>
                {block.items.map((item, idx) => (
                  <li key={idx} className={styles.item}>
                    <div className={styles.iconWrapper}>
                      <Image
                        src="/icons/check.svg"
                        alt="Check"
                        width={16}
                        height={16}
                      />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.backgroundImage}>
        <Image
          src="/images/tokenomics/chain.png"
          alt="Roadmap Background"
          fill
        //   height={1000}
          objectFit="cover"
          quality={100}
        />
      </div>
      </div>
    </section>
  );
}
