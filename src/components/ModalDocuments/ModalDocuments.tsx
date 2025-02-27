"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import styles from "./ModalDocuments.module.css";

interface ModalDocumentsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalDocuments({ isOpen, onClose }: ModalDocumentsProps) {
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
              <h3>Legal documents</h3>
              <button
                className={styles.closeButton}
                onClick={onClose}
              >
                &times;
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Список документов */}
              <Link href="https://fasqon.com/PRIVACY%20STATEMENT.pdf" className={styles.documentButton}>
                Privacy Policy
              </Link>
              <Link href="https://fasqon.com/Anti-money.pdf" className={styles.documentButton}>
                Anti-Money Laundering Policy
              </Link>
              <Link href="https://fasqon.com/Tokens-risk-disclosure-statement.pdf" className={styles.documentButton}>
                Tokens Risk Disclosure
              </Link>
              <Link href="https://fasqon.com/Token-sale-agreement.pdf" className={styles.documentButton}>
                Token Sale Agreement
              </Link>
              <Link href="https://fasqon.com/TERMS%20OF%20USE.pdf" className={styles.documentButton}>
                Terms Of Use
              </Link>
              <Link href="https://fasqon.com/Cookies.pdf" className={styles.documentButton}>
                Cookies
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
