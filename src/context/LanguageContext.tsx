"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { dictionaries, Dictionary, Locale } from "../i18n/dictionaries";

interface LanguageContextType {
  locale: Locale;
  dict: Dictionary;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>("en");

  // Sync <html lang> to the active locale so screen readers pronounce
  // text correctly and search engines see consistent locale signals.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const toggleLanguage = () => {
    setLocale((prev) => (prev === "en" ? "de" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ locale, dict: dictionaries[locale], toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
