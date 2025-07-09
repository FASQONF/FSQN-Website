"use client";

import React, { useState, useEffect, JSX } from "react";
import styles from "./CookieBanner.module.css";

export default function CookieBanner(): JSX.Element | null {
  const [showBanner, setShowBanner] = useState<boolean>(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const hasAccepted = document.cookie.includes("cookieConsent=accepted");
      const hasRejected = document.cookie.includes("cookieConsent=rejected");

      if (!hasAccepted && !hasRejected) {
        setShowBanner(true);
      }
    }
  }, []);

  const handleAccept = () => {
    document.cookie = "cookieConsent=accepted; path=/; max-age=31536000";
    setShowBanner(false);
  };

  const handleReject = () => {
    document.cookie = "cookieConsent=rejected; path=/; max-age=31536000";
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className={styles.cookieBanner}>
      <div className={styles.bannerContent}>
        <div className={styles.textBlock}>
          <h4>We value your privacy</h4>
          <p>
            We use cookies to enhance your browsing experience, analyze site
            traffic, and for security. By clicking “Accept Cookies”, you consent
            to our use of cookies.&nbsp;
            <a href="https://fasqon.ai/Fasqon_Cookies.pdf" target="_blank" rel="noopener noreferrer">
              Cookie Policy
            </a>
          </p>
        </div>
        <div className={styles.buttonGroup}>
          <button onClick={handleAccept} className={styles.acceptBtn}>
            Accept Cookies
          </button>
          <button onClick={handleReject} className={styles.rejectBtn}>
            Reject Cookies
          </button>
        </div>
      </div>
    </div>
  );
}
