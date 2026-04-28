import type { Metadata } from "next";
import React from "react";

// /impressum — legally required under § 5 ECG (Austria) and § 25 MedienG.
// Owner identity is intentionally present per Layer 0 scope clarification
// ("owner attribution on the public About page, owner name in an Impressum
// that is legally required").
//
// Operator entity mirrors the deployed CodeFlash Impressum
// (flashcards-programming-app/src/pages/Impressum.jsx). The Lechner-Studios
// FlexKapG is in formation per ai-brain/business-planning/lechner-studios
// — not yet operative; founder + counsel will update both Impressums in
// lockstep once the Firmenbuch entry exists.

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Legal disclosure (Impressum) for Lechner Studios per § 5 ECG and § 25 MedienG.",
  alternates: { canonical: "/impressum" },
  robots: { index: true, follow: true },
};

const pageStyle: React.CSSProperties = {
  background: "#F6F1EB",
  minHeight: "100vh",
  padding: "120px 48px",
  color: "#1A1812",
};

const containerStyle: React.CSSProperties = {
  maxWidth: "780px",
  margin: "0 auto",
};

const overlineStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.62rem",
  fontWeight: 600,
  letterSpacing: "0.28em",
  textTransform: "uppercase",
  color: "#B8944D",
  marginBottom: "2rem",
};

const headlineStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
  fontWeight: 300,
  lineHeight: 0.98,
  letterSpacing: "-0.03em",
  color: "#1A1812",
  marginBottom: "16px",
  fontStyle: "italic",
};

const subStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.95rem",
  color: "#8B8578",
  lineHeight: 1.7,
  marginBottom: "64px",
  maxWidth: "620px",
};

const langTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.62rem",
  fontWeight: 600,
  letterSpacing: "0.28em",
  textTransform: "uppercase",
  color: "#B8944D",
  marginBottom: "1.25rem",
};

const sectionLabelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.6rem",
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#8B8578",
  marginBottom: "8px",
};

const sectionValueStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "1rem",
  color: "#1A1812",
  lineHeight: 1.8,
  marginBottom: "32px",
};

const noteStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.85rem",
  color: "#8B8578",
  lineHeight: 1.7,
  marginTop: "-24px",
  marginBottom: "32px",
};

const linkStyle: React.CSSProperties = {
  color: "#1A1812",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
  textDecorationColor: "rgba(26,24,18,0.25)",
};

const dividerStyle: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid rgba(26,24,18,0.12)",
  margin: "72px 0",
};

const backLinkStyle: React.CSSProperties = {
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

export default function ImpressumPage() {
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <p style={overlineStyle}>Legal · Rechtliche Information</p>
        <h1 style={headlineStyle}>Impressum</h1>
        <p style={subStyle}>
          Offenlegung gem. § 5 ECG und § 25 MedienG. Disclosure pursuant to
          Austrian E-Commerce Act (§ 5 ECG) and Media Act (§ 25 MedienG).
        </p>

        {/* DE */}
        <section aria-labelledby="impressum-de">
          <h2 id="impressum-de" style={langTitleStyle}>
            Deutsch
          </h2>

          <div style={sectionLabelStyle}>Medieninhaber & Diensteanbieter</div>
          <div style={sectionValueStyle}>
            Sonja Lechner
            <br />
            Einzelunternehmerin
            <br />
            Wattenbachgasse 29
            <br />
            6112 Wattens
            <br />
            Österreich
          </div>

          <div style={sectionLabelStyle}>Kontakt</div>
          <div style={sectionValueStyle}>
            E-Mail:{" "}
            <a href="mailto:hallo@lechner-studios.at" style={linkStyle}>
              hallo@lechner-studios.at
            </a>
          </div>

          <div style={sectionLabelStyle}>Unternehmensgegenstand</div>
          <div style={sectionValueStyle}>
            Unabhängiges Digitalstudio. Entwicklung digitaler Produkte,
            Webdesign und KI-Systeme.
          </div>

          <div style={sectionLabelStyle}>Umsatzsteuer</div>
          <div style={sectionValueStyle}>
            Kleinunternehmerin gem. § 6 Abs. 1 Z 27 UStG. Aus diesem Grund wird
            keine UID-Nummer geführt; ausgewiesene Beträge enthalten keine
            Umsatzsteuer.
          </div>

          <div style={sectionLabelStyle}>Firmenbuch</div>
          <div style={sectionValueStyle}>
            Keine Eintragung im Firmenbuch (Einzelunternehmen, nicht
            eintragungspflichtig).
          </div>

          <div style={sectionLabelStyle}>Aufsichtsbehörde / Gewerbebehörde</div>
          <div style={sectionValueStyle}>
            Bezirkshauptmannschaft Innsbruck
          </div>

          <div style={sectionLabelStyle}>Berufsrechtliche Vorschriften</div>
          <div style={sectionValueStyle}>
            Gewerbeordnung (GewO), abrufbar unter{" "}
            <a
              href="https://www.ris.bka.gv.at"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              www.ris.bka.gv.at
            </a>
            .
          </div>

          <div style={sectionLabelStyle}>
            EU-Streitbeilegung (ODR-Plattform)
          </div>
          <div style={sectionValueStyle}>
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit (VO 524/2013, Art. 14 Abs. 1):{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              https://ec.europa.eu/consumers/odr
            </a>
            . Wir sind weder verpflichtet noch bereit, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </div>

          <div style={sectionLabelStyle}>Haftung für Inhalte & Links</div>
          <div style={sectionValueStyle}>
            Die Inhalte dieser Website wurden mit Sorgfalt erstellt. Für die
            Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird
            keine Gewähr übernommen. Für externe verlinkte Inhalte ist
            ausschließlich der jeweilige Anbieter verantwortlich.
          </div>

          <div style={sectionLabelStyle}>Urheberrecht</div>
          <div style={sectionValueStyle}>
            Sämtliche Inhalte (Texte, Bilder, Code, Gestaltung) sind
            urheberrechtlich geschützt. Verwendung nur mit ausdrücklicher
            schriftlicher Zustimmung.
          </div>
        </section>

        <hr style={dividerStyle} />

        {/* EN */}
        <section aria-labelledby="impressum-en">
          <h2 id="impressum-en" style={langTitleStyle}>
            English
          </h2>

          <div style={sectionLabelStyle}>Operator & Service Provider</div>
          <div style={sectionValueStyle}>
            Sonja Lechner
            <br />
            Sole proprietor (Einzelunternehmerin)
            <br />
            Wattenbachgasse 29
            <br />
            6112 Wattens
            <br />
            Austria
          </div>

          <div style={sectionLabelStyle}>Contact</div>
          <div style={sectionValueStyle}>
            Email:{" "}
            <a href="mailto:hallo@lechner-studios.at" style={linkStyle}>
              hallo@lechner-studios.at
            </a>
          </div>

          <div style={sectionLabelStyle}>Object of business</div>
          <div style={sectionValueStyle}>
            Independent digital studio. Development of digital products, web
            design and AI systems.
          </div>

          <div style={sectionLabelStyle}>VAT</div>
          <div style={sectionValueStyle}>
            Small-business operator (Kleinunternehmerin) pursuant to § 6 (1)
            no. 27 UStG. Therefore no VAT identification number is held;
            amounts shown do not include VAT.
          </div>

          <div style={sectionLabelStyle}>Commercial register</div>
          <div style={sectionValueStyle}>
            No commercial-register entry (sole proprietorship, not subject to
            registration).
          </div>

          <div style={sectionLabelStyle}>Supervisory authority</div>
          <div style={sectionValueStyle}>
            Bezirkshauptmannschaft Innsbruck (district administrative
            authority).
          </div>

          <div style={sectionLabelStyle}>Applicable trade regulation</div>
          <div style={sectionValueStyle}>
            Austrian Trade Act (Gewerbeordnung — GewO), available at{" "}
            <a
              href="https://www.ris.bka.gv.at"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              www.ris.bka.gv.at
            </a>
            .
          </div>

          <div style={sectionLabelStyle}>EU online dispute resolution</div>
          <div style={sectionValueStyle}>
            The European Commission provides a platform for online dispute
            resolution (ODR) under Reg. (EU) 524/2013 Art. 14(1):{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              https://ec.europa.eu/consumers/odr
            </a>
            . We are neither obliged nor willing to participate in dispute
            resolution proceedings before a consumer arbitration board.
          </div>

          <div style={sectionLabelStyle}>Liability for content & links</div>
          <div style={sectionValueStyle}>
            The content of this website has been compiled with care. No
            liability is assumed for the accuracy, completeness or timeliness
            of the content. The respective provider is solely responsible for
            the content of externally linked pages.
          </div>

          <div style={sectionLabelStyle}>Copyright</div>
          <div style={sectionValueStyle}>
            All content (text, images, code, design) is protected by
            copyright. Use only with prior written consent.
          </div>
        </section>

        <a href="/" style={backLinkStyle}>
          ← Back / Zurück
        </a>
      </div>
    </main>
  );
}
