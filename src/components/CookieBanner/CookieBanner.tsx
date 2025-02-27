"use client";

import React, { useState, useEffect, JSX } from "react";
import styles from "./CookieBanner.module.css";

/**
 * Баннер, который сохраняет решение пользователя о cookies в cookie
 * (cookieConsent=accepted или cookieConsent=rejected).
 * Если cookie не установлено, баннер отображается.
 */
export default function CookieBanner(): JSX.Element | null {
  const [showBanner, setShowBanner] = useState<boolean>(false);

  useEffect(() => {
    // Проверяем наличие cookie: cookieConsent=accepted или cookieConsent=rejected
    if (typeof document !== "undefined") {
      const hasAccepted = document.cookie.includes("cookieConsent=accepted");
      const hasRejected = document.cookie.includes("cookieConsent=rejected");

      if (!hasAccepted && !hasRejected) {
        setShowBanner(true);
      }
    }
  }, []);

  const handleAccept = () => {
    // Устанавливаем cookie cookieConsent=accepted на 1 год
    document.cookie = "cookieConsent=accepted; path=/; max-age=31536000";
    setShowBanner(false);
  };

  const handleReject = () => {
    // Устанавливаем cookie cookieConsent=rejected на 1 год
    document.cookie = "cookieConsent=rejected; path=/; max-age=31536000";
    setShowBanner(false);
  };

  if (!showBanner) return null; // Если баннер скрыт, ничего не рендерим

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
