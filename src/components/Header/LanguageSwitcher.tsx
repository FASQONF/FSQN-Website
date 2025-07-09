// LanguageSwitcher.tsx
"use client";

import { Suspense, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useLocalization } from "@/context/LocalizationContext";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/utils/fetchTranslations";
import styles from "./LanguageSwitcher.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function LanguageSwitcher() {
  return (
    <Suspense fallback={null}>
      <LanguageSwitcherComponent />
    </Suspense>
  );
}

function LanguageSwitcherComponent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { changeLanguage } = useLocalization();
  const [isOpen, setIsOpen] = useState(false);

  const langParam = searchParams.get("lang") ?? "en";
  const currentLang: SupportedLanguage = SUPPORTED_LANGUAGES.includes(langParam as SupportedLanguage)
    ? (langParam as SupportedLanguage)
    : "en";

  const languages = SUPPORTED_LANGUAGES.map((code) => ({
    code,
    label: code.toUpperCase(),
  }));

  const onSelect = (lang: SupportedLanguage) => {
    changeLanguage(lang);
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", lang);
    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className={styles.languageSwitcher}>
      <div className={styles.selector} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.currentLang}>{currentLang.toUpperCase()}</span>
        <motion.div className={`${styles.arrow} ${isOpen ? styles.arrowUp : ""}`}>
          <ChevronDown size={16} />
        </motion.div>
      </div>

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
                onClick={() => onSelect(code)}
                className={`${styles.langOption} ${currentLang === code ? styles.activeLang : ""
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
