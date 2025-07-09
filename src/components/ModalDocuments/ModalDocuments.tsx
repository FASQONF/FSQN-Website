"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ModalDocuments.module.css";
import { useLocalization } from '@/context/LocalizationContext';

interface ModalDocumentsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalDocuments({ isOpen, onClose }: ModalDocumentsProps) {
  const { t } = useLocalization();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.modalHeader}>
              <h3>{t("modalDocuments.title")}</h3>
              <button
                className={styles.closeButton}
                onClick={onClose}
              >
                &times;
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Docs */}
              <a
                href="/PRIVACY_STATEMENT.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.documentButton}
              >
                {t("modalDocuments.privacyPolicy")}
              </a>
              <a href="/Anti-money.pdf" className={styles.documentButton} target="_blank"
                rel="noopener noreferrer">
                {t("modalDocuments.amlPolicy")}
              </a>
              <a href="/Tokens-risk-disclosure-statement.pdf" className={styles.documentButton} target="_blank"
                rel="noopener noreferrer">
                {t("modalDocuments.tokensRisk")}
              </a>
              <a href="/Token-sale-agreement.pdf" className={styles.documentButton} target="_blank"
                rel="noopener noreferrer">
                {t("modalDocuments.tokenSale")}
              </a>
              <a href="/TERMS_OF_USE.pdf" className={styles.documentButton} target="_blank"
                rel="noopener noreferrer">
                {t("modalDocuments.termsOfUse")}
              </a>
              <a href="/Cookies.pdf" className={styles.documentButton} target="_blank"
                rel="noopener noreferrer">
                {t("modalDocuments.cookies")}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
