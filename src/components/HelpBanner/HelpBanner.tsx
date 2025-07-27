"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import parse from "html-react-parser";
import { X as CloseIcon, Plus as PlusIcon } from "lucide-react";
import { useLocalization } from "@/context/LocalizationContext";
import styles from "./HelpBanner.module.css";

const HelpBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useLocalization();

  useEffect(() => {
    const closed = localStorage.getItem("helpBannerClosed");
    if (!closed) {
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("helpBannerClosed", "true");
    setVisible(false);
  };

  const handlePrimary = () => {
    window.open("https://t.me/fasqonbot", "_blank");
  };
  const handleDetails = () => {
    // TODO
  };

  if (!visible) return null;

  return (
    <div className={styles.helpBanner}>
      <button
        className={styles.closeBtn}
        onClick={handleClose}
        aria-label={t("helpBanner.closeAria")}
      >
        <CloseIcon size={25} />
      </button>

      <div className={styles.avatarContainer}>
        <Image
          src="/images/help/avatar.png"
          alt="Help Avatar"
          width={156}
          height={156}
          className={styles.avatar}
          unoptimized
        />
      </div>

      <div className={styles.body}>
        <div className={styles.message}>
          {parse(t("helpBanner.message"))}
        </div>

        <button className={styles.primaryBtn} onClick={handlePrimary}>
          {t("helpBanner.primaryText")}
        </button>

        <div className={styles.footer}>
          <a
            href="https://x.com/fasqon"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.xLink}
            aria-label="X"
          >
            <Image
              src="/images/help/x.svg"
              alt="X"
              width={24}
              height={24}
              unoptimized
            />
          </a>

          <button className={styles.detailsBtn} onClick={handleDetails}>
            <PlusIcon size={16} className={styles.plusIcon} />
            {t("helpBanner.detailsText")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpBanner;
