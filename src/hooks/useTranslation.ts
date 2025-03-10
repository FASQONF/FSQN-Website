"use client";

import { usePathname, useSearchParams } from "next/navigation";
import en from "../../locales/en";
import es from "../../locales/es";
import pt from "../../locales/pt";

const translations: Record<string, any> = { en, es, pt };

export function useTranslation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Получаем язык из URL (например, ?lang=es)
  const lang = searchParams.get("lang") || "en";

  return translations[lang] || translations["en"];
}
