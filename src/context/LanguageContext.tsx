"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { dictionaries, type Dictionary } from "../i18n/dictionaries";
import { type Locale } from "../i18n/config";

interface LanguageContextType {
  locale: Locale;
  dict: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) => {
  return (
    <LanguageContext.Provider value={{ locale, dict: dictionaries[locale] }}>
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
