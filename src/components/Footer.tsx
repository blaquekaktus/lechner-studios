"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { dict } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12 px-6 md:px-12 border-t border-alpine-navy/10 flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-alpine-navy/60">
      <div className="mb-4 md:mb-0">
        <span className="font-bold text-alpine-dark">lechner</span>.studios &copy; {currentYear}. {dict.footer.rights}
      </div>
      <div className="flex gap-6">
        <a href="#" className="hover:text-alpine-dark transition-colors">Imprint</a>
        <a href="#" className="hover:text-alpine-dark transition-colors">Privacy</a>
      </div>
    </footer>
  );
}
