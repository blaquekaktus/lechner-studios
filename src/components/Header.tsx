"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Header() {
  const { dict, toggleLanguage } = useLanguage();

  return (
    <header className="w-full py-8 px-6 md:px-12 flex justify-between items-center z-50">
      <div className="flex items-center gap-2">
        {/* Minimalist Logo */}
        <div className="flex items-baseline relative">
          <span className="font-sans font-bold text-3xl tracking-tighter">ls</span>
          <span className="absolute top-1 -right-2 w-1.5 h-1.5 bg-[#E8C27B] rounded-full"></span>
        </div>
      </div>
      
      <nav className="hidden md:flex gap-8 items-center text-sm font-medium tracking-wide uppercase text-alpine-navy/70">
        <a href="#services" className="hover:text-alpine-navy transition-colors">{dict.nav.services}</a>
        <a href="#work" className="hover:text-alpine-navy transition-colors">{dict.nav.work}</a>
      </nav>

      <button 
        onClick={toggleLanguage}
        className="text-xs font-bold tracking-widest uppercase border border-alpine-navy/20 px-3 py-1.5 rounded-full hover:bg-alpine-navy hover:text-white transition-colors"
      >
        {dict.nav.toggle}
      </button>
    </header>
  );
}
