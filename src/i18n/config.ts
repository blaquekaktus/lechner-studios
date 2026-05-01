// src/i18n/config.ts
export const LOCALES = ["de", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "de";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function alternateLocale(current: Locale): Locale {
  return current === "de" ? "en" : "de";
}

// Maps URL locale to BCP-47 hreflang value used in <link rel="alternate">.
export const HREFLANG: Record<Locale, string> = {
  de: "de-AT",
  en: "en",
};
