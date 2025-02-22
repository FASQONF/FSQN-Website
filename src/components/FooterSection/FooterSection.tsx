"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./FooterSection.module.css";

export default function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Левая часть */}
        <div className={styles.leftBlock}>
          {/* Логотип */}
          <div className={styles.logoWrapper}>
            <Image
              src="/logo.svg"
              alt="Fasqon logo"
              width={60}
              height={60}
              className={styles.logo}
            />
          </div>

          {/* Адреса и Email (с иконками) */}
          <div className={styles.infoBlock}>
            <div className={styles.infoItem}>
              <Image
                src="/icons/location.svg"
                alt="Location"
                width={20}
                height={20}
              />
              <p>Rua dos Aranhas n.º 51, sala 14, 9000-044, Funchal, Portugal</p>
            </div>
            <div className={styles.infoItem}>
              <Image
                src="/icons/location.svg"
                alt="Location"
                width={20}
                height={20}
              />
              <p>
                Lagoas Park, Building 7 - 1st floor South, office 13, 
                2740-244 Porto Salvo, Portugal
              </p>
            </div>
            <div className={styles.infoItem}>
              <Image
                src="/icons/email.svg"
                alt="Email"
                width={20}
                height={20}
              />
              <p>
                <a href="mailto:office@fasqon.com" className={styles.email}>
                  office@fasqon.com
                </a>
              </p>
            </div>
          </div>

          {/* Соц.иконки */}
          <div className={styles.social}>
            <Link href="https://twitter.com/" target="_blank">
              <Image src="/icons/twitter.svg" alt="Twitter" width={24} height={24} />
            </Link>
            <Link href="https://t.me/" target="_blank">
              <Image src="/icons/telegram.svg" alt="Telegram" width={24} height={24} />
            </Link>
            <Link href="https://discord.gg/" target="_blank">
              <Image src="/icons/discord.svg" alt="Discord" width={24} height={24} />
            </Link>
            {/* Добавь остальные соцсети, если нужно */}
          </div>

          {/* Копирайт */}
          <div className={styles.copyright}>
            <p>Copyright © Fasqon</p>
          </div>
        </div>

        {/* Правая часть: Компания + кнопки */}
        <div className={styles.rightBlock}>
          <div className={styles.companyInfo}>
            <p>Fasqon, Unipessoal LDA (Zona Franca da Madeira)</p>
            <p>NIPC: 51739346 (Portugal)</p>
            <p>Access registration code: 2853-2787-4837</p>
          </div>
          <div className={styles.buttons}>
            <Link href="/documents" className={styles.btn}>
              Documents
            </Link>
            <Link href="/contact" className={styles.btn}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
