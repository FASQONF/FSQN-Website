"use client";

import { Suspense, useEffect } from "react";
import styles from "./page.module.css";

import HeroSection from "@/components/HeroSection/HeroSection";
import AirdropBanner from '@/components/AirdropBanner/AirdropBanner';
import FeaturesSection from "@/components/FeaturesSection/FeaturesSection";
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

export default function Home() {
  // Handle hash navigation when the page loads
  useEffect(() => {
    // Check if there's a hash in the URL
    if (window.location.hash) {
      // Get the element ID from the hash
      const elementId = window.location.hash.substring(1);

      // Find the element
      const element = document.getElementById(elementId);

      // If the element exists, scroll to it after a small delay
      // The delay ensures all content is loaded
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
        <Suspense fallback={null}>
          <HeroSection />
          <UltimateUX />
          <div id="about">
            <WhyFasqonSection />
          </div>
          {/*<AirdropBanner /> */}
          <div id="crypto-cards">
            <CryptoCards />
          </div>
          <div id="passive-income">
            <StoreToEarn />
          </div>
          <MiniAppSection />
          <div id="about-us">
            <TeamSection />
          </div>
          <PartnersSection />
          <FAQSection />
          <MediaSection />
          <ContactSection />
        </Suspense>
      </main>
    </div>
  );
}