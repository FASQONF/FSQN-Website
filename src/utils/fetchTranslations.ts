// src/utils/fetchTranslations.ts

export type TranslationValue = string | number | TranslationObject | TranslationArray | undefined;
export interface TranslationObject {
    [key: string]: TranslationValue;
}
export type TranslationArray = TranslationValue[];
export type Translations = TranslationObject;

export const SUPPORTED_LANGUAGES = ['en', 'es', 'pt'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

function isValidLanguage(lang: string): lang is SupportedLanguage {
    return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

export async function fetchTranslations(lang: string): Promise<Translations> {
    if (!isValidLanguage(lang)) {
        console.warn(`Unsupported language: ${lang}. Falling back to English.`);
        lang = 'en';
    }

    try {
        const localTranslations = await import(`../locales/${lang}.json`);
        //console.log("Using local translations for", lang);
        return localTranslations.default;
    } catch (error) {
        console.error('Error fetching translations:', error);
        try {
            const fallbackTranslations = await import('../locales/en.json');
            return fallbackTranslations.default;
        } catch (fallbackError) {
            console.error('Error loading fallback translations:', fallbackError);
            return {};
        }
    }
}

export function getTranslation(key: string, translations: Translations | null, lang: string = 'en'): string {
    if (!translations) return key;
    if (!isValidLanguage(lang)) {
        console.warn(`Unsupported language: ${lang}. Using English.`);
        lang = 'en';
    }
    
    if (key in translations) {
        const value = translations[key];
        return typeof value === 'string' ? value : key;
    }
    
    const keys = key.split('.');
    let value: TranslationValue = translations;
    
    for (const k of keys) {
        if (value && typeof value === 'object') {
            if (Array.isArray(value)) {
                const index = parseInt(k, 10);
                if (!isNaN(index) && index >= 0 && index < value.length) {
                    value = value[index];
                } else {
                    return key;
                }
            } else if (k in value) {
                value = (value as TranslationObject)[k];
            } else {
                return key;
            }
        } else {
            return key;
        }
    }
    
    return typeof value === 'string' ? value : key;
}
