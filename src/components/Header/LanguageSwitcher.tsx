"use client";

import { Suspense, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import styles from "./LanguageSwitcher.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const languages = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "pt", label: "PT" },
];

 function LanguageSwitcherComponent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = searchParams.get("lang") || "en";

  const changeLanguage = (lang: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", lang);
    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className={styles.languageSwitcher}>
      {/* Кнопка для открытия списка языков */}
      <div className={styles.selector} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.currentLang}>{currentLang.toUpperCase()}</span>
        <motion.div
          className={`${styles.arrow} ${isOpen ? styles.arrowUp : ""}`}
        >
          <ChevronDown
            size={16}
            className={`${styles.arrow} ${isOpen ? styles.arrowUp : ""}`}
          />
        </motion.div>
      </div>

      {/* Выпадающий список языков */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.dropdown}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {languages.map(({ code, label }) => (
              <div
                key={code}
                onClick={() => changeLanguage(code)}
                className={`${styles.langOption} ${
                  currentLang === code ? styles.activeLang : ""
                }`}
              >
                {label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default function LanguageSwitcher() {
  return (
    <Suspense fallback={null}>
      <LanguageSwitcherComponent />
    </Suspense>
  );
}