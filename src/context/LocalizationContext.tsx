// src/context/LocalizationContext.tsx

"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchTranslations, getTranslation, Translations, SupportedLanguage } from '../utils/fetchTranslations';
import defaultTranslations from '../locales/en.json';

interface LocalizationContextProps {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  translations: Translations;
  t: (key: string) => string;
  changeLanguage: (lang: SupportedLanguage) => void;
}

const LocalizationContext = createContext<LocalizationContextProps>({
  language: 'en',
  setLanguage: () => { },
  translations: {},
  t: (key: string) => key,
  changeLanguage: () => { },
});

export const useLocalization = () => useContext(LocalizationContext);

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language');
      const browserLang = navigator.language.split('-')[0];
      return (savedLang || browserLang || 'en') as SupportedLanguage;
    }
    return 'en';
  });

  const [translations, setTranslations] = useState<Translations>(defaultTranslations);

  useEffect(() => {
    const loadTranslations = async () => {
      const loadedTranslations = await fetchTranslations(language);
      //console.log("Loaded translations in context:", loadedTranslations);
      setTranslations(loadedTranslations);
    };

    loadTranslations();
  }, [language]);

  const handleSetLanguage = (lang: SupportedLanguage) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    if (!translations) {
      return 'FSQN';
    }

    const result = getTranslation(key, translations, language);
    return result;
  };

  return (
    <LocalizationContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        translations: translations || {},
        t,
        changeLanguage: handleSetLanguage,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};
