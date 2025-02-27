"use client";

import styles from "./page.module.css";

// Импортируем наш Header и секции
import Header from "@/components/Header/Header";
import HeroSection from "@/components/HeroSection/HeroSection";
import PressMentions from "@/components/PressMentions/PressMentions";
import FeaturesSection from "@/components/FeaturesSection/FeaturesSection";
import CryptoCards from "@/components/CryptoCards/CryptoCards";
import StoreToEarn from "@/components/StoreToEarn/StoreToEarn";
import StayTuned from "@/components/StayTuned/StayTuned";
import UltimateUX from "@/components/UltimateUserExperience/UltimateUX";
import TeamSection from "@/components/TeamSection/TeamSection";
import PartnersSection from "@/components/PartnersSection/PartnersSection";
import FAQSection from "@/components/FAQSection/FAQSection";
import Footer from "@/components/FooterSection/FooterSection";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <HeroSection />
        <PressMentions />
        <div id="features">
          <FeaturesSection />
        </div>
        <div id="crypto-cards">
          <CryptoCards />
        </div>
        <div id="passive-income">
          <StoreToEarn />
        </div>
        <StayTuned />
        <UltimateUX />
        <div id="about-us">
          <TeamSection />
        </div>
        <PartnersSection />
        <FAQSection />
      </main>
    </div>
  );
}
