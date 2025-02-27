"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./Header.module.css";

// Обновлённый массив ссылок – теперь якорные ссылки
const navLinks = [
  { name: "Wallet", href: "#features" },
  { name: "Crypto card", href: "#crypto-cards" },
  { name: "Passive Income", href: "#passive-income" },
  { name: "About Us", href: "#about-us" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
          {navLinks.map((link) => {
            // Если это якорная ссылка, то сравниваем pathname с "#" не имеет смысла,
            // поэтому можно просто применять нужный класс.
            return (
              <li key={link.name}>
                <Link href={link.href} className={styles.link}>
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Кнопка White Paper (десктоп) */}
      <div className={styles.right}>
        <Link href="/tokenimicks" className={styles.whitePaperBtn}>
        Tokenomics
        </Link>
        <Link href="/white-paper" className={styles.whitePaperBtn}>
          White Paper
        </Link>
      </div>

      {/* Бургер - рендерим ТОЛЬКО если меню закрыто */}
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
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.showMenu : ""}`}
      >
        <div className={styles.greenLine}></div>
        <ul className={styles.mobileNavList}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={styles.link}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
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
          href="/white-paper"
          className={styles.mobileWhitePaperBtn}
          onClick={() => setMenuOpen(false)}
        >
          White Paper
        </Link>
      </div>
    </header>
  );
}
