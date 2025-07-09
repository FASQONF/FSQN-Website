"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import styles from "./Header.module.css";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocalization } from '@/context/LocalizationContext';

function HeaderComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { t } = useLocalization();

  // Get the current language parameter
  const currentLang = searchParams.get("lang") || "en";

  const navLinks = [
    { name: t("header.navLinks.wallet"), href: "#features" },
    { name: t("header.navLinks.cryptoCard"), href: "#crypto-cards" },
    { name: t("header.navLinks.passiveIncome"), href: "#passive-income" },
    { name: t("header.navLinks.aboutUs"), href: "#about-us" },
  ];
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleAnchorClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    // Extract the anchor ID without the "#"
    const anchorId = href.substring(1);

    // If we're not on the home page, navigate to home with anchor and preserve language
    if (pathname !== "/") {
      router.push(`/?lang=${currentLang}#${anchorId}`);
    } else {
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }

      window.history.pushState({}, "", `/?lang=${currentLang}#${anchorId}`);
    }

    setMenuOpen(false);
  };

  // Create URL with the current language parameter
  const createUrlWithLang = (path: string) => {
    return `${path}?lang=${currentLang}`;
  };

  return (
    <header className={styles.header}>
      {/* Left part (logo) */}
      <div className={styles.left}>
        <Link href={createUrlWithLang("/")}>
          <Image
            src="/logo.svg"
            alt="Logo"
            width={40}
            height={40}
            className={styles.logoImage}
          />
        </Link>
      </div>

      {/* Desktop menu */}
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

      {/* Right part - Tokenomics and White Paper buttons */}
      <div className={styles.right}>
        <Link href={createUrlWithLang("/tokenomics")} className={styles.whitePaperBtn}>
          {t("header.tokenomics")}
        </Link>
        <Link
          href="/Presentation.pdf"
          className={styles.whitePaperBtn}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("header.whitePaper")}
        </Link>
        {/* <LanguageSwitcher /> */}
      </div>

      {/* Burger (mobile menu) */}
      {!menuOpen && (
        <div className={styles.mobileRight}>
          <div className={styles.burger} onClick={toggleMenu}>
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
          </div>
          <LanguageSwitcher />
        </div>

      )}

      {/* Overlay */}
      {menuOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}

      {/* Mobile menu */}
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
          href={createUrlWithLang("/tokenomics")}
          className={styles.mobileWhitePaperBtn}
          onClick={() => setMenuOpen(false)}
        >
          {t("header.tokenomics")}
        </Link>
        <a
          href="/Presentation.pdf"
          className={styles.mobileWhitePaperBtn}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
        >
          {t("header.whitePaper")}
        </a>
      </div>
    </header>
  );
}
export default function Header() {
  return (
    <Suspense fallback={null}>
      <HeaderComponent />
    </Suspense>
  );
}