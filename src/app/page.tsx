"use client";

import React from "react";
import { LanguageProvider } from "../context/LanguageContext";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ServiceGrid from "../components/ServiceGrid";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen flex flex-col selection:bg-alpine-sand/50">
        <Header />
        <div className="flex-1">
          <Hero />
          <ServiceGrid />
        </div>
        <Footer />
      </main>
    </LanguageProvider>
  );
}
