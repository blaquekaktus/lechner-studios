"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { dict } = useLanguage();

  return (
    <section className="min-h-[70vh] flex flex-col justify-center px-6 md:px-12 pb-20 pt-10">
      <div className="max-w-4xl">
        <h1 className="flex flex-col mb-4">
          <span className="font-sans font-bold text-6xl md:text-8xl tracking-tight text-alpine-dark">
            lechner
          </span>
          <span className="font-serif italic text-5xl md:text-7xl text-alpine-navy/80 -mt-2 md:-mt-4">
            .studios
          </span>
        </h1>
        
        <div className="w-16 h-px bg-alpine-navy/30 my-8"></div>
        
        <p className="font-sans text-sm md:text-base font-medium tracking-widest text-alpine-navy uppercase mb-12">
          {dict.hero.tagline}
        </p>

        <p className="text-xs tracking-[0.2em] text-alpine-sage uppercase mt-24">
          {dict.hero.location}
        </p>
      </div>
    </section>
  );
}
