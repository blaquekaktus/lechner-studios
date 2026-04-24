"use client";
import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Founder() {
  const { dict } = useLanguage();
  const d = dict.founder;

  return (
    <section
      id="founder"
      aria-labelledby="founder-heading"
      style={{
        background: "#FDFBF8",
        padding: "120px 48px",
        borderTop: "1px solid rgba(26,24,18,0.08)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          fontWeight: 600,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#B8944D",
          marginBottom: "2.5rem",
        }}>
          {d.overline}
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "start",
        }}>
          <h2
            id="founder-heading"
            style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 3.5vw, 3rem)",
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "#1A1812",
          }}>
            {d.headline}
          </h2>

          <div>
            <div style={{
              fontSize: "1rem",
              lineHeight: 1.9,
              color: "#1A1812",
              fontWeight: 400,
              marginBottom: "32px",
              whiteSpace: "pre-line",
            }}>
              {d.body}
            </div>
            <p style={{
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: "#8B8578",
              fontWeight: 400,
              fontStyle: "italic",
              borderLeft: "2px solid #B8944D",
              paddingLeft: "20px",
            }}>
              {d.twinLine}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
