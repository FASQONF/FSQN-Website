"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import styles from "./Header.module.css";

const navLinks = [
  { name: "Wallet", href: "#features" },
  { name: "Crypto card", href: "#crypto-cards" },
  { name: "Passive Income", href: "#passive-income" },
  { name: "About Us", href: "#about-us" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Обработчик для якорных ссылок
  const handleAnchorClick = (href:any) => (e:any) => {
    e.preventDefault();
    // Если мы не на главной, то переход на главную с якорем:
    if (pathname !== "/") {
      router.push("/" + href);
    } else {
      // Если уже на главной, ищем элемент с id (без "#") и прокручиваем плавно
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      {/* Левая часть (логотип) */}
      <div className={styles.left}>
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={40}
            height={40}
            className={styles.logoImage}
          />
        </Link>
      </div>

      {/* Десктоп-меню */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={handleAnchorClick(link.href)}
                className={styles.link}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Правая часть - кнопки Tokenomics и White Paper */}
      <div className={styles.right}>
        <Link href="/tokenomics" className={styles.whitePaperBtn}>
          Tokenomics
        </Link>
        <Link
          href="https://dev.fasqon.com/FASQON_EN.pdf"
          className={styles.whitePaperBtn}
        >
          White Paper
        </Link>
      </div>

      {/* Бургер (мобильное меню) */}
      {!menuOpen && (
        <div className={styles.burger} onClick={toggleMenu}>
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
        </div>
      )}

      {/* Оверлей */}
      {menuOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}

      {/* Мобильное меню */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.showMenu : ""}`}>
        <div className={styles.greenLine}></div>
        <ul className={styles.mobileNavList}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={handleAnchorClick(link.href)}
                className={styles.link}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <Link
          href="/tokenomics"
          className={styles.mobileWhitePaperBtn}
          onClick={() => setMenuOpen(false)}
        >
          Tokenomics
        </Link>
        <Link
          href="https://dev.fasqon.com/FASQON_EN.pdf"
          className={styles.mobileWhitePaperBtn}
          onClick={() => setMenuOpen(false)}
        >
          White Paper
        </Link>
      </div>
    </header>
  );
}
