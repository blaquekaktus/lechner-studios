"use client";
import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Services() {
  const { dict } = useLanguage();
  const d = dict.services;

  return (
    <section
      className="grain"
      style={{
        position: "relative",
        background: "#1A1812",
        padding: "120px 48px",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 60% at 80% 50%, rgba(201,169,97,0.04) 0%, transparent 70%)",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Overline */}
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          fontWeight: 600,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#C9A961",
          marginBottom: "2rem",
        }}>
          {d.overline}
        </p>

        {/* Headline */}
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
          fontWeight: 300,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "#F6F1EB",
          marginBottom: "80px",
          whiteSpace: "pre-line",
        }}>
          {d.headline}
        </h2>

        {/* 3-column grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "rgba(246,241,235,0.07)",
        }}>
          {d.items.map((item, i) => (
            <div
              key={i}
              style={{
                padding: "48px 40px",
                background: "#1A1812",
                transition: "background 0.3s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#252219")}
              onMouseLeave={e => (e.currentTarget.style.background = "#1A1812")}
            >
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "#C9A961",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "20px",
              }}>
                0{i + 1}
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.6rem",
                fontWeight: 400,
                color: "#F6F1EB",
                marginBottom: "16px",
                lineHeight: 1.2,
              }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: "0.88rem",
                color: "rgba(246,241,235,0.45)",
                lineHeight: 1.8,
                fontWeight: 400,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
