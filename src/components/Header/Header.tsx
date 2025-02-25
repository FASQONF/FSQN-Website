"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./Header.module.css";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Tokenomics", href: "/tokenomics" },
  { name: "About", href: "/about" },
  { name: "Join Us", href: "/join-us" },
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
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={isActive ? styles.activeLink : styles.link}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Кнопка White Paper (десктоп) */}
      <div className={styles.right}>
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

      {/* Оверлей (если нужно) */}
      {menuOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}

      {/* Мобильное меню (справа) */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.showMenu : ""}`}
      >
        <div className={styles.greenLine}></div>

        <ul className={styles.mobileNavList}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={isActive ? styles.activeLink : styles.link}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

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
