"use client";
import React from "react";
import { LanguageProvider } from "../context/LanguageContext";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import About from "../components/About";
import Work from "../components/Work";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <main style={{ minHeight: "100vh" }}>
        <Nav />
        <Hero />
        <About />
        <Work />
        <Services />
        <Contact />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
