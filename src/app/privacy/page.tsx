import type { Metadata } from "next";
import React from "react";

// /privacy — Datenschutzerklärung per DSGVO (Art. 13/14) + DSG (AT).
// The umbrella site is a marketing surface with no contact form, no
// analytics, no cookies. Only processor is Vercel (hosting, access logs).
// Verified against package.json and src/ — no Supabase, Stripe, Plausible,
// Resend, PostHog, Sentry, GA, formspree etc. Contact uses mailto: only.

export const metadata: Metadata = {
  title: "Datenschutz · Privacy",
  description:
    "Datenschutzerklärung gem. DSGVO. Privacy notice under GDPR for lechner-studios.at.",
  alternates: { canonical: "/privacy" },
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

const h3Style: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "1.4rem",
  fontWeight: 400,
  lineHeight: 1.2,
  letterSpacing: "-0.01em",
  color: "#1A1812",
  marginTop: "40px",
  marginBottom: "12px",
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "1rem",
  color: "#1A1812",
  lineHeight: 1.8,
  marginBottom: "16px",
};

const mutedStyle: React.CSSProperties = {
  ...bodyStyle,
  color: "#5C594F",
};

const listStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "1rem",
  color: "#1A1812",
  lineHeight: 1.8,
  paddingLeft: "1.25rem",
  marginBottom: "16px",
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

export default function PrivacyPage() {
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <p style={overlineStyle}>Legal · Datenschutz</p>
        <h1 style={headlineStyle}>Datenschutz · Privacy</h1>
        <p style={subStyle}>
          Diese Website ist eine reine Marketingseite. Es gibt kein
          Kontaktformular, kein Tracking, keine Analytics, keine Cookies. /
          This site is a pure marketing surface — no contact form, no
          tracking, no analytics, no cookies.
        </p>

        {/* DE */}
        <section aria-labelledby="privacy-de">
          <h2 id="privacy-de" style={langTitleStyle}>
            Deutsch
          </h2>

          <h3 style={h3Style}>1. Verantwortliche Stelle</h3>
          <p style={bodyStyle}>
            Verantwortliche im Sinne der DSGVO ist:
          </p>
          <p style={bodyStyle}>
            Sonja Lechner, Einzelunternehmerin
            <br />
            Wattenbachgasse 29, 6112 Wattens, Österreich
            <br />
            E-Mail:{" "}
            <a href="mailto:hallo@lechner-studios.at" style={linkStyle}>
              hallo@lechner-studios.at
            </a>
          </p>

          <h3 style={h3Style}>2. Welche Daten verarbeitet werden</h3>
          <p style={bodyStyle}>
            Beim Aufruf dieser Website werden technisch notwendige Zugriffsdaten
            durch unseren Hosting-Provider verarbeitet (siehe
            Auftragsverarbeiter). Dazu zählen typischerweise:
          </p>
          <ul style={listStyle}>
            <li>IP-Adresse (gekürzt bzw. zur Sicherstellung des Betriebs)</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>aufgerufene URL / referenzierende URL</li>
            <li>User-Agent (Browser, Betriebssystem)</li>
          </ul>
          <p style={bodyStyle}>
            Diese Website setzt <strong>keine Cookies</strong>, betreibt
            <strong> kein Tracking</strong> und nutzt{" "}
            <strong>keine Analytics-Dienste</strong>. Es existiert{" "}
            <strong>kein Kontaktformular</strong>; der Kontakt-Link öffnet
            ausschließlich das E-Mail-Programm der Nutzerin/des Nutzers
            (<code>mailto:</code>).
          </p>

          <h3 style={h3Style}>3. E-Mail-Kontakt</h3>
          <p style={bodyStyle}>
            Bei einer Kontaktaufnahme per E-Mail werden die übermittelten
            Angaben (Name, E-Mail-Adresse, Inhalt der Nachricht) verarbeitet,
            um die Anfrage zu beantworten. Die E-Mail wird über den vom
            Betreiber genutzten E-Mail-Provider verarbeitet und gespeichert.
          </p>

          <h3 style={h3Style}>4. Rechtsgrundlagen (Art. 6 DSGVO)</h3>
          <ul style={listStyle}>
            <li>
              <strong>Art. 6 Abs. 1 lit. f</strong> (berechtigtes Interesse) —
              technische Bereitstellung der Website inkl. Server-Logs zur
              Sicherstellung von Betrieb und IT-Sicherheit.
            </li>
            <li>
              <strong>Art. 6 Abs. 1 lit. b</strong> (Vertrag /
              vorvertragliche Maßnahmen) — Beantwortung von Anfragen, die per
              E-Mail eingehen.
            </li>
          </ul>

          <h3 style={h3Style}>5. Auftragsverarbeiter</h3>
          <p style={bodyStyle}>
            Die Website wird gehostet bei{" "}
            <strong>Vercel Inc.</strong> (
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              Privacy Policy
            </a>
            ,{" "}
            <a
              href="https://vercel.com/legal/dpa"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              DPA
            </a>
            ). Die Auslieferung erfolgt über das EU-Edge-Netz von Vercel;
            Server-Logs zur Betriebssicherheit werden bei Vercel verarbeitet.
            Es bestehen Standardvertragsklauseln und ein
            Auftragsverarbeitungsvertrag mit Vercel.
          </p>
          <p style={mutedStyle}>
            Weitere Auftragsverarbeiter werden auf dieser Website nicht
            eingesetzt — insbesondere keine Analytics-, Tracking-, Werbe-
            oder Embed-Dienste Dritter.
          </p>

          <h3 style={h3Style}>6. Speicherdauer</h3>
          <ul style={listStyle}>
            <li>
              <strong>Server-Logs (Vercel):</strong> gemäß Default-Retention
              des Hosting-Providers; in der Regel kurzfristig zur
              Betriebssicherheit.
            </li>
            <li>
              <strong>E-Mail-Korrespondenz:</strong> bis der Zweck der Anfrage
              erledigt ist, längstens jedoch im Rahmen gesetzlicher
              Aufbewahrungsfristen (z. B. § 132 BAO bei geschäftlichem
              Schriftverkehr — bis zu 7 Jahre).
            </li>
          </ul>

          <h3 style={h3Style}>
            7. Ihre Rechte (Art. 15–21 DSGVO)
          </h3>
          <p style={bodyStyle}>
            Sie haben jederzeit das Recht auf:
          </p>
          <ul style={listStyle}>
            <li>Auskunft (Art. 15)</li>
            <li>Berichtigung (Art. 16)</li>
            <li>Löschung (Art. 17)</li>
            <li>Einschränkung der Verarbeitung (Art. 18)</li>
            <li>Datenübertragbarkeit (Art. 20)</li>
            <li>
              Widerspruch gegen Verarbeitungen auf Basis berechtigter
              Interessen (Art. 21)
            </li>
          </ul>
          <p style={bodyStyle}>
            Anfragen richten Sie bitte an{" "}
            <a href="mailto:hallo@lechner-studios.at" style={linkStyle}>
              hallo@lechner-studios.at
            </a>
            .
          </p>

          <h3 style={h3Style}>8. Beschwerderecht</h3>
          <p style={bodyStyle}>
            Sie haben das Recht, sich bei der österreichischen
            Aufsichtsbehörde zu beschweren:
          </p>
          <p style={bodyStyle}>
            Österreichische Datenschutzbehörde
            <br />
            Barichgasse 40–42, 1030 Wien
            <br />
            <a
              href="https://www.dsb.gv.at"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              www.dsb.gv.at
            </a>
          </p>

          <h3 style={h3Style}>9. Drittlandtransfer</h3>
          <p style={bodyStyle}>
            Vercel ist ein US-Anbieter mit EU-Edge-Auslieferung. Soweit ein
            Transfer in die USA stattfindet, erfolgt dieser auf Basis der
            EU-Standardvertragsklauseln gem. Art. 46 DSGVO. Für den Empfang
            von E-Mails kann zudem der vom Betreiber genutzte
            E-Mail-Provider Daten verarbeiten.
          </p>

          <h3 style={h3Style}>10. Aktualität</h3>
          <p style={bodyStyle}>
            Stand: April 2026. Diese Erklärung wird angepasst, sobald sich
            Verarbeitungen ändern (z. B. wenn ein Kontaktformular oder
            Analytics ergänzt wird).
          </p>
        </section>

        <hr style={dividerStyle} />

        {/* EN */}
        <section aria-labelledby="privacy-en">
          <h2 id="privacy-en" style={langTitleStyle}>
            English
          </h2>

          <h3 style={h3Style}>1. Controller</h3>
          <p style={bodyStyle}>
            Controller within the meaning of the GDPR is:
          </p>
          <p style={bodyStyle}>
            Sonja Lechner, sole proprietor (Einzelunternehmerin)
            <br />
            Wattenbachgasse 29, 6112 Wattens, Austria
            <br />
            Email:{" "}
            <a href="mailto:hallo@lechner-studios.at" style={linkStyle}>
              hallo@lechner-studios.at
            </a>
          </p>

          <h3 style={h3Style}>2. What data is processed</h3>
          <p style={bodyStyle}>
            When you visit this site, technically necessary access data is
            processed by our hosting provider (see processors). This typically
            includes:
          </p>
          <ul style={listStyle}>
            <li>IP address (truncated / for operational security)</li>
            <li>date and time of the request</li>
            <li>requested URL / referring URL</li>
            <li>user agent (browser, operating system)</li>
          </ul>
          <p style={bodyStyle}>
            This site sets <strong>no cookies</strong>, performs{" "}
            <strong>no tracking</strong> and uses{" "}
            <strong>no analytics services</strong>. There is{" "}
            <strong>no contact form</strong>; the contact link only opens the
            visitor&apos;s mail client (<code>mailto:</code>).
          </p>

          <h3 style={h3Style}>3. Email contact</h3>
          <p style={bodyStyle}>
            If you contact us by email, the information you transmit (name,
            email address, content of your message) is processed in order to
            answer your request. The message is processed and stored by the
            email provider used by the operator.
          </p>

          <h3 style={h3Style}>4. Legal bases (Art. 6 GDPR)</h3>
          <ul style={listStyle}>
            <li>
              <strong>Art. 6(1)(f)</strong> (legitimate interest) — technical
              provision of the website incl. server logs to ensure operation
              and IT security.
            </li>
            <li>
              <strong>Art. 6(1)(b)</strong> (contract / pre-contractual
              measures) — answering inbound requests sent by email.
            </li>
          </ul>

          <h3 style={h3Style}>5. Processors</h3>
          <p style={bodyStyle}>
            The site is hosted by <strong>Vercel Inc.</strong> (
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              Privacy Policy
            </a>
            ,{" "}
            <a
              href="https://vercel.com/legal/dpa"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              DPA
            </a>
            ). Delivery is performed via Vercel&apos;s EU edge network;
            server logs for operational security are processed at Vercel.
            Standard Contractual Clauses and a Data Processing Agreement are
            in place with Vercel.
          </p>
          <p style={mutedStyle}>
            No further processors are used on this site — in particular, no
            third-party analytics, tracking, advertising or embedded
            services.
          </p>

          <h3 style={h3Style}>6. Retention</h3>
          <ul style={listStyle}>
            <li>
              <strong>Server logs (Vercel):</strong> per the hosting
              provider&apos;s default retention; generally short-term for
              operational security.
            </li>
            <li>
              <strong>Email correspondence:</strong> until the purpose of the
              request is fulfilled, at most within statutory retention periods
              (e.g. § 132 BAO for business correspondence — up to 7 years).
            </li>
          </ul>

          <h3 style={h3Style}>
            7. Your rights (Art. 15–21 GDPR)
          </h3>
          <p style={bodyStyle}>
            You have the right at any time to:
          </p>
          <ul style={listStyle}>
            <li>access (Art. 15)</li>
            <li>rectification (Art. 16)</li>
            <li>erasure (Art. 17)</li>
            <li>restriction of processing (Art. 18)</li>
            <li>data portability (Art. 20)</li>
            <li>
              object to processing based on legitimate interests (Art. 21)
            </li>
          </ul>
          <p style={bodyStyle}>
            Requests can be sent to{" "}
            <a href="mailto:hallo@lechner-studios.at" style={linkStyle}>
              hallo@lechner-studios.at
            </a>
            .
          </p>

          <h3 style={h3Style}>8. Right to lodge a complaint</h3>
          <p style={bodyStyle}>
            You have the right to lodge a complaint with the Austrian
            supervisory authority:
          </p>
          <p style={bodyStyle}>
            Österreichische Datenschutzbehörde
            <br />
            Barichgasse 40–42, 1030 Vienna
            <br />
            <a
              href="https://www.dsb.gv.at"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              www.dsb.gv.at
            </a>
          </p>

          <h3 style={h3Style}>9. Third-country transfer</h3>
          <p style={bodyStyle}>
            Vercel is a US provider with EU edge delivery. Where a transfer
            to the US occurs, it is based on the EU Standard Contractual
            Clauses pursuant to Art. 46 GDPR. The email provider used by the
            operator may also process data when receiving inbound mail.
          </p>

          <h3 style={h3Style}>10. Last updated</h3>
          <p style={bodyStyle}>
            April 2026. Updated whenever processing changes (e.g. if a
            contact form or analytics is added).
          </p>
        </section>

        <a href="/" style={backLinkStyle}>
          ← Back / Zurück
        </a>
      </div>
    </main>
  );
}
