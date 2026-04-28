// src/components/LegalImpressumEN.tsx
//
// EN-only Impressum body. Rendered at /en/impressum.
// Legal copy is preserved verbatim from the prior bilingual Impressum.
// Sonja Lechner, Einzelunternehmerin remains the registered legal entity.
// The Lechner-Studios FlexKapG is in formation but not yet operative;
// legal pages update in lockstep when the Firmenbuch entry lands.

import Link from "next/link";
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

export default function LegalImpressumEN() {
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <p style={overlineStyle}>Legal disclosure</p>
        {/* "Impressum" is preserved as the EN headline per CONVENTIONS.md legal-page
            exception — it's the registered legal designation in AT. */}
        <h1 style={headlineStyle}>Impressum</h1>
        <p style={subStyle}>
          Disclosure pursuant to Austrian E-Commerce Act (§ 5 ECG) and Media
          Act (§ 25 MedienG).
        </p>

        <section>
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
            Design-led, family-run digital studio. Web & Design, Apps &
            Automation, SEO & Growth, and Brand & Identity.
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

        <Link href="/en" style={backLinkStyle}>
          ← Back
        </Link>
      </div>
    </main>
  );
}
