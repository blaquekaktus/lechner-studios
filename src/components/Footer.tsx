"use client";
import React from "react";
import { useLanguage } from "../context/LanguageContext";
import Wordmark from "./Wordmark";

export default function Footer() {
  const { dict } = useLanguage();
  const d = dict.footer;
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: "#1A1812",
      padding: "40px 48px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "20px",
      flexWrap: "wrap",
      borderTop: "1px solid rgba(246,241,235,0.06)",
    }}>
      <span aria-label="Lechner Studios" style={{ display: "inline-flex" }}>
        <Wordmark variant="inline" size={20} onDark />
      </span>

      <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.6rem",
        color: "rgba(246,241,235,0.2)",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        textAlign: "center",
      }}>
        {d.tagline}
      </span>

      <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.6rem",
        color: "rgba(246,241,235,0.25)",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}>
        © {year} · {d.rights}
      </span>
    </footer>
  );
}
