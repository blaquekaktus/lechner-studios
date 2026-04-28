// src/components/LegalStyles.ts
//
// Shared CSSProperties consts for the four per-locale legal components
// (LegalImpressumDE/EN, LegalPrivacyDE/EN). Extracted from the prior
// dual-language Impressum + Privacy pages so both halves of each page
// stay visually identical without copy-pasted style blocks.
//
// Privacy-specific consts (h3Style, bodyStyle, mutedStyle, listStyle) are
// kept inside the LegalPrivacy* components — they're only used there and
// inlining them keeps the privacy copy + its formatting near each other
// for legal-edit clarity.

import type { CSSProperties } from "react";

export const pageStyle: CSSProperties = {
  background: "#F6F1EB",
  minHeight: "100vh",
  padding: "120px 48px",
  color: "#1A1812",
};

export const containerStyle: CSSProperties = {
  maxWidth: "780px",
  margin: "0 auto",
};

export const overlineStyle: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.62rem",
  fontWeight: 600,
  letterSpacing: "0.28em",
  textTransform: "uppercase",
  color: "#B8944D",
  marginBottom: "2rem",
};

export const headlineStyle: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
  fontWeight: 300,
  lineHeight: 0.98,
  letterSpacing: "-0.03em",
  color: "#1A1812",
  marginBottom: "16px",
  fontStyle: "italic",
};

export const subStyle: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.95rem",
  color: "#8B8578",
  lineHeight: 1.7,
  marginBottom: "64px",
  maxWidth: "620px",
};

export const sectionLabelStyle: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.6rem",
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#8B8578",
  marginBottom: "8px",
};

export const sectionValueStyle: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "1rem",
  color: "#1A1812",
  lineHeight: 1.8,
  marginBottom: "32px",
};

export const linkStyle: CSSProperties = {
  color: "#1A1812",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
  textDecorationColor: "rgba(26,24,18,0.25)",
};

export const backLinkStyle: CSSProperties = {
  display: "inline-block",
  marginTop: "48px",
  fontFamily: "var(--font-mono)",
  fontSize: "0.62rem",
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#8B8578",
  textDecoration: "none",
};
