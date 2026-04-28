// src/components/LegalImpressumDE.tsx
//
// DE-only Impressum body. Rendered at /de/impressum.
// Legal copy is preserved verbatim from the prior bilingual Impressum.
// Sonja Lechner, Einzelunternehmerin remains the registered legal entity.
// The Lechner-Studios FlexKapG is in formation but not yet operative;
// legal pages update in lockstep when the Firmenbuch entry lands.

import {
  pageStyle,
  containerStyle,
  overlineStyle,
  headlineStyle,
  subStyle,
  sectionLabelStyle,
  sectionValueStyle,
  linkStyle,
  backLinkStyle,
} from "./LegalStyles";

export default function LegalImpressumDE() {
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <p style={overlineStyle}>Rechtliche Information</p>
        <h1 style={headlineStyle}>Impressum</h1>
        <p style={subStyle}>
          Offenlegung gem. § 5 ECG und § 25 MedienG.
        </p>

        <section aria-labelledby="impressum-de">
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
            Design-orientiertes, familiengeführtes Digitalstudio. Web &
            Design, Apps & Automation, SEO & Growth, sowie Marke &
            Identität.
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

        <a href="/de" style={backLinkStyle}>
          ← Zurück
        </a>
      </div>
    </main>
  );
}
