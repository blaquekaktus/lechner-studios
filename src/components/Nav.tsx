"use client";
import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Wordmark from "./Wordmark";

export default function Nav() {
  const { dict, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: scrolled ? "16px 48px" : "24px 48px",
    background: scrolled ? "rgba(246,241,235,0.96)" : "transparent",
    backdropFilter: scrolled ? "blur(20px)" : "none",
    boxShadow: scrolled ? "0 1px 0 rgba(26,24,18,0.08)" : "none",
    mixBlendMode: scrolled ? "normal" : "difference",
    transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
  };

  const logoLinkStyle: React.CSSProperties = {
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    transition: "opacity 0.4s",
  };

  const linkStyle: React.CSSProperties = {
    fontSize: "0.68rem",
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: scrolled ? "#8B8578" : "#F6F1EB",
    textDecoration: "none",
    transition: "color 0.3s",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    fontFamily: "var(--font-sans)",
  };

  const toggleStyle: React.CSSProperties = {
    ...linkStyle,
    paddingLeft: "16px",
    borderLeft: `1px solid ${scrolled ? "rgba(26,24,18,0.2)" : "rgba(246,241,235,0.3)"}`,
    marginLeft: "8px",
    color: scrolled ? "#1A1812" : "#F6F1EB",
    fontWeight: 700,
  };

  return (
    <nav style={navStyle}>
      <a href="#" style={logoLinkStyle} aria-label="Lechner Studios">
        <Wordmark variant="inline" size={22} onDark={!scrolled} />
      </a>
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        <a href="#work"    style={linkStyle}>{dict.nav.work}</a>
        <a href="#about"   style={linkStyle}>{dict.nav.about}</a>
        <a href="#contact" style={linkStyle}>{dict.nav.contact}</a>
        <button onClick={toggleLanguage} style={toggleStyle}>{dict.nav.toggle}</button>
      </div>
    </nav>
  );
}
