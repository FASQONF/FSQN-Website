"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";

// Импортируем компонент модального окна
import ModalDocuments from "../ModalDocuments/ModalDocuments";

export default function Footer() {
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);

  const openModal = () => setShowDocumentsModal(true);
  const closeModal = () => setShowDocumentsModal(false);

  return (
    <footer className={styles.footer}>
      {/* Верхний контейнер с тремя блоками */}
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

        {/* Левая часть: Email + Адреса */}
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
            <a href="mailto:office@fasqon.com" className={styles.textGray}>
              office@fasqon.com
            </a>
          </div>

          {/* Адрес №1 */}
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
            <p className={styles.textGray}>
              Rua dos Aranhas n.º 51, sala 14, 9000-044, Funchal, Portugal
            </p>
          </div>

          {/* Адрес №2 */}
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
            <p className={styles.textGray}>
              Lagoas Park, Building 7 - 1st floor South, office 13, 2740-244 Porto Salvo, Portugal
            </p>
          </div>
          <div className={styles.copyright}>
              <p className={styles.textGray}>Copyright©Fasqon</p>
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
          {/* Instagram */}
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

        {/* Средняя часть: Доп. инфо (NIPC и т.д.) */}
        <div className={styles.middleSide}>
          <p className={styles.textGray}>Fasqon, Unipessoal LDA (Zona Franca da Maderia)</p>
          <p className={styles.textGray}>NIPC: 517935436 (Portugal)</p>
          <p className={styles.textGray}>
            Access registration code (Código de acesso): 2853-2787-4837
          </p>

          <div className={styles.rightSide}>
            <div className={styles.buttons}>
              {/* Кнопка «Documents» открывает модалку */}
              <button onClick={openModal} className={styles.button}>
                Documents
              </button>
              <Link href="#" className={styles.button}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Подключаем модалку и передаём пропы */}
      <ModalDocuments
        isOpen={showDocumentsModal}
        onClose={() => setShowDocumentsModal(false)}
      />
    </footer>
  );
}
