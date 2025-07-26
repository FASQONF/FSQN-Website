"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";
import ModalDocuments from "../ModalDocuments/ModalDocuments";
import { useLocalization } from '@/context/LocalizationContext';
import HelpBanner from "@/components/HelpBanner/HelpBanner";

export default function Footer() {
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
  const { t } = useLocalization();

  const openModal = () => setShowDocumentsModal(true);
  const closeModal = () => setShowDocumentsModal(false);

  return (
    <footer className={styles.footer}>
      <HelpBanner />
      {/* Top Container */}
      <div className={styles.topContainer}>
        <div className={styles.logoContainer}>
          <Image
            src="/logo.svg"
            alt="Logo"
            width={40}
            height={40}
            className={styles.logoImage}
          />
        </div>

        {/* Left Part: Email + Address */}
        <div className={styles.leftSide}>
          {/* Email */}
          <div className={styles.inlineRow}>
            <svg className={styles.icon} viewBox="0 0 24 24">
              <path d="M12 13.065L.055 5.108A2 2 0 0 1 2 
                3h20a2 2 0 0 1 1.945 2.108L12 
                13.065zM12 15L.06 6.109A2 2 0 0 0 
                0 7.5v9.993A2.5 2.5 0 0 0 2.5 20h19a2.5 
                2.5 0 0 0 2.5-2.5V7.5a2 2 0 0 0-.06-1.391L12 15z"
              />
            </svg>
            <a href="mailto:support@fasqon.com" className={styles.textGray}>
              {t("footerSection.email")}
            </a>
          </div>

          {/* Address №1 */}
          <div className={styles.inlineRow}>
            <svg className={styles.icon} viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 
                5 9c0 5.25 7 13 7 13s7-7.75 
                7-13c0-3.87-3.13-7-7-7zm0 
                9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 
                2.5-2.5 2.5 1.12 2.5 2.5-1.12 
                2.5-2.5 2.5z"
              />
            </svg>
            <p className={styles.textGray}>{t("footerSection.address1")}</p>
          </div>

          <div className={styles.inlineRow}>
            <svg className={styles.icon} viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 
                5 9c0 5.25 7 13 7 13s7-7.75 
                7-13c0-3.87-3.13-7-7-7zm0 
                9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 
                2.5-2.5 2.5 1.12 2.5 2.5-1.12 
                2.5-2.5 2.5z"
              />
            </svg>
            <p className={styles.textGray}>{t("footerSection.address2")}</p>
          </div>
          <div className={styles.copyright}>
            <p className={styles.textGray}>{t("footerSection.copyright")}</p>
            <div className={styles.social}>
              {/* X (Twitter) */}
              <a
                href="https://x.com/fasqon"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <Image
                  src="/icons/mobile/twitter.svg"
                  alt="X (Twitter)"
                  width={18}
                  height={18}
                />
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/fasqonofficial"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <Image
                  src="/icons/mobile/telegram.svg"
                  alt="Telegram"
                  width={23}
                  height={23}
                />
              </a>
              <a
                href="https://t.me/fasqonchat"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <Image
                  src="/icons/mobile/telegram2.svg"
                  alt="Telegram"
                  width={23}
                  height={23}
                />
              </a>
              <a
                href="https://www.instagram.com/fasqon_official/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <Image
                  src="/icons/mobile/instagram.svg"
                  alt="Instagram"
                  width={23}
                  height={23}
                />
              </a>
              <a
                href="https://medium.com/@fasqon.official"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <Image
                  src="/icons/mobile/medium.svg"
                  alt="Instagram"
                  width={23}
                  height={23}
                />
              </a>
              {/* Discord */}
              <a
                href="https://discord.com/invite/gkRd9vSEr8"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <Image
                  src="/icons/mobile/discord.svg"
                  alt="Discord"
                  width={23}
                  height={23}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Middle: Additional Info (NIPC) */}
        <div className={styles.middleSide}>
          <p className={styles.textGray}>{t("footerSection.companyName")}</p>
          <p className={styles.textGray}>{t("footerSection.nipc")}</p>
          <p className={styles.textGray}>{t("footerSection.accessCode")}</p>

          <div className={styles.rightSide}>
            <div className={styles.buttons}>
              <button onClick={openModal} className={styles.button}>
                {t("footerSection.documents")}
              </button>
              <Link href="#" className={styles.button}>
                {t("footerSection.contactUs")}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ModalDocuments
        isOpen={showDocumentsModal}
        onClose={() => setShowDocumentsModal(false)}
      />
    </footer>
  );
}
