"use client";
import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { dict } = useLanguage();
  const d = dict.contact;

  return (
    <section
      id="contact"
      style={{
        background: "#F6F1EB",
        padding: "120px 48px",
        borderTop: "1px solid rgba(26,24,18,0.08)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "end",
        }}>
          {/* Left */}
          <div>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              fontWeight: 600,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#B8944D",
              marginBottom: "2rem",
            }}>
              {d.overline}
            </p>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "#1A1812",
              marginBottom: "32px",
              fontStyle: "italic",
            }}>
              {d.headline}
            </h2>
            <p style={{
              fontSize: "0.95rem",
              color: "#8B8578",
              lineHeight: 1.8,
              maxWidth: "420px",
            }}>
              {d.body}
            </p>
          </div>

          {/* Right */}
          <div style={{ paddingBottom: "8px" }}>
            <a
              href={`mailto:${d.email}`}
              style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)",
                fontWeight: 400,
                color: "#1A1812",
                textDecoration: "none",
                borderBottom: "1px solid rgba(26,24,18,0.15)",
                paddingBottom: "24px",
                marginBottom: "24px",
                transition: "color 0.2s",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = "#B8944D")}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = "#1A1812")}
            >
              {d.email}
            </a>

            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "#8B8578",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "40px",
            }}>
              {d.location}
            </p>

            <div style={{ display: "flex", gap: "24px" }}>
              <a href="/impressum" style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "#B0A898",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = "#1A1812")}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = "#B0A898")}
              >
                {d.impressum}
              </a>
              <a href="/privacy" style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "#B0A898",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = "#1A1812")}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = "#B0A898")}
              >
                {d.privacy}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
