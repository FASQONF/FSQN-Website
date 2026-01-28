"use client";

import { Suspense, useEffect } from "react";
import styles from "./page.module.css";
import Header from "@/components/Header/Header";

import HeroSection from "@/components/HeroSection/HeroSection";
import CryptoCards from "@/components/CryptoCards/CryptoCards";
import StoreToEarn from "@/components/StoreToEarn/StoreToEarn";
import UltimateUX from "@/components/UltimateUserExperience/UltimateUX";
import MiniAppSection from "@/components/MiniApp/MiniApp"
import TeamSection from "@/components/TeamSection/TeamSection";
import PartnersSection from "@/components/PartnersSection/PartnersSection";
import MediaSection from "@/components/MediaSection/MediaSection";
import WhyFasqonSection from "@/components/WhyFasqonSection/WhyFasqonSection";
import FAQSection from "@/components/FAQSection/FAQSection";
import ContactSection from "@/components/ContactSection/ContactSection";
import RoadMapSection from "@/components/RoadMapSection/RoadMapSection";
import FasPaySection from "@/components/FasPaySection/FasPaySection";
import CommunityHubSection from "@/components/CommunityHubSection/CommunityHubSection";
import MonitizationsStreams from "@/components/MonitizationsStreams/MonitizationsStreams";
import AdvisorsSection from "@/components/AdvisorsSection/AdvisorsSection";

export default function Home() {
  // Handle hash navigation when the page loads
  useEffect(() => {
    if (window.location.hash) {
      const elementId = window.location.hash.substring(1);
      const element = document.getElementById(elementId);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  return (
    <div>
      <main className={styles.main}>
        <Header />
        <Suspense fallback={null}>
          <HeroSection />
          <UltimateUX />
          <div id="about">
            <WhyFasqonSection />
          </div>
          <div id="crypto-cards">
            <CryptoCards />
          </div>
          <div id="passive-income">
            <StoreToEarn />
          </div>
          <FasPaySection />
          <CommunityHubSection />
          <MiniAppSection />
          <MonitizationsStreams />
          <RoadMapSection />
          <div id="about-us">
            <TeamSection />
          </div>
          <AdvisorsSection />
          <PartnersSection />
          <FAQSection />
          <MediaSection />
          <ContactSection />
        </Suspense>
      </main>
    </div>
  );
}