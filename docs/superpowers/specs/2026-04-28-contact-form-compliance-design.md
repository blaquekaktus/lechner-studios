# Contact form architecture + AT public-site compliance pass v1

**Status:** Founder-approved, ready for implementation
**Date:** 2026-04-28
**Repo:** lechner-studios
**Branch:** `claude/contact-form-compliance`

## Scope

One PR, three connected work items:

1. **Contact form** — replace the current `mailto:` link in `<Contact>` with a real form posting to a Vercel route handler that relays to Zoho Mail via SMTP. Email-only persistence. DSGVO Einwilligung checkbox.
2. **Datenschutz delta** — new unified Kontaktaufnahme section; Zoho Corporation B.V. added to `§Auftragsverarbeiter`; `§9 Drittlandtransfer` confirmed unchanged (Zoho EU data center, founder-confirmed).
3. **Site hygiene** — `public/.well-known/security.txt` (RFC 9116) and security headers via `next.config.ts` `headers()`.

Out of scope: portfolio-wide rollout of these compliance items to CodeFlash / Vistera / Werk / virtual-office-tirol — driven by a separate ai-brain pattern doc spec.

## Decisions (locked, founder-confirmed 2026-04-28)

### D1. Backend — Vercel Function (App Router `route.ts`) + SMTP to Zoho Mail EU

| Choice | Reason |
|---|---|
| App Router `route.ts` POST handler at `/api/contact` | Native to the Next.js 16 / Vercel deploy. Zero new processors. |
| Nodemailer over SMTP to `smtp.zoho.eu:465` (SSL) | Standard, well-understood. Zoho EU data center (founder-confirmed). |
| Auth via env vars: `ZOHO_SMTP_USER`, `ZOHO_SMTP_PASSWORD` (app-specific password generated under Zoho TFA-enabled account) | App-specific password generated in Zoho Mail settings; never use the account password. Never commit. |
| Outbound: Vercel Function → `smtp.zoho.eu` over TLS → mailbox `hallo@lechner-studios.at` | Single hop. No relay services. |

**Rejected:**
- **Vercel Function + Resend** — adds Resend (US, EU residency optional) as a new sub-processor for no operational gain over direct SMTP.
- **Formspree / Web3Forms** — externalizes form-data handling to a US sub-processor; conflicts with the no-third-parties posture.

### D2. Data residency — EU. No `§9 Drittlandtransfer` rewrite needed.

- Vercel Function executes on Vercel's runtime (EU edge); already covered by current `§9` (Vercel US-with-SCCs).
- Zoho Corporation B.V. EU data center (Amsterdam, `zoho.eu` — founder-confirmed) keeps mail data in EU. Zoho's parent in California may have access; standard treatment is to declare US-with-SCCs as a fallback per Zoho's published DPA.
- Net: no rewrite of `§9`. Adding Zoho to `§Auftragsverarbeiter` is sufficient.

### D3. Persistence — email only, no DB / CRM / Postgres

- Each submission is sent as an email to `hallo@lechner-studios.at`. No DB row, no CRM entry, no log retention beyond default Vercel function logs.
- DSGVO Art. 5(1)(e) (storage limitation): retention is governed by mailbox archival policy — founder controls.
- Future need (search, CRM, analytics) is a separate decision; defer.

### D4. Einwilligung text — double-basis (Art. 6(1)(b) primary, Art. 6(1)(a) secondary) + Art. 7(3) lawfulness clause

DE (`dict.contact.form.consent`):

> Mit dem Absenden Ihrer Anfrage stimmen Sie zu, dass Ihre Angaben (Name, E-Mail-Adresse, Nachricht) zur Bearbeitung Ihrer Kontaktaufnahme verarbeitet werden. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Diese Einwilligung können Sie jederzeit für die Zukunft widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt vom Widerruf unberührt. Ein Widerruf ist formlos per E-Mail an hallo@lechner-studios.at möglich. Details siehe Datenschutz.

EN (`dict.contact.form.consent`):

> By submitting this enquiry you consent to the processing of the data you provide (name, email address, message) for the purpose of handling your contact request. Legal basis: Art. 6(1)(b) GDPR (pre-contractual steps) and/or Art. 6(1)(a) GDPR (consent). You can withdraw this consent at any time for future processing. The lawfulness of processing carried out before withdrawal remains unaffected. Withdrawal is informal — an email to hallo@lechner-studios.at is sufficient. See Privacy for details.

Rendering: checkbox `<input type="checkbox" required />` + label containing the consent text. Submit button disabled until checkbox is checked. The route handler also validates the consent value to defend against client-script bypass.

## Form spec

### Fields

| Name (EN label) | DE label | HTML | Required | Validation |
|---|---|---|---|---|
| Name | Name | `<input type="text">` | yes | `2 ≤ length ≤ 200` |
| Email | E-Mail | `<input type="email">` | yes | RFC 5322 (basic regex) |
| Message | Nachricht | `<textarea>` | yes | `20 ≤ length ≤ 5000` |
| Consent | Einwilligung | `<input type="checkbox">` | yes | label = D4 text; `required` |
| `_hp` | (hidden) | `<input type="text" tabindex="-1">` visually hidden | — | honeypot; non-empty value → silently 200 and drop |

No phone, no company, no project-budget — minimal-data principle. Founder can ask follow-ups by reply.

### Behavior

- Client-side: HTML5 validation + per-field required attributes. No JS validation library.
- Submit: `fetch('/api/contact', { method: 'POST', body: JSON.stringify(payload) })`.
- States: idle → submitting → success / error. Three messages in dict (EN+DE).
- Rate limit: 5 submissions per IP per hour, in-memory map on the function with TTL. (Best-effort; resets on cold start; acceptable for v1 traffic — escalate to KV store if abuse appears.)
- Honeypot: hidden field `_hp`. Server treats non-empty `_hp` as bot, returns 200, drops.
- No CAPTCHA. No Turnstile / hCaptcha (would add a US sub-processor).

### Server-side route handler — `src/app/api/contact/route.ts`

```ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Rate limit is best-effort; resets on cold start.
// Acceptable for v1 traffic; escalate to KV store if abuse appears.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const ipBucket = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipBucket.get(ip);
  if (!entry || entry.reset < now) {
    ipBucket.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let payload: { name?: string; email?: string; message?: string; consent?: boolean; _hp?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot — silently succeed and drop
  if (payload._hp && payload._hp.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim();
  const message = (payload.message ?? "").trim();

  if (
    !payload.consent ||
    name.length < 2 || name.length > 200 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    message.length < 20 || message.length > 5000
  ) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const transport = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_SMTP_USER!,
      pass: process.env.ZOHO_SMTP_PASSWORD!,
    },
  });

  await transport.sendMail({
    from: `Lechner Studios Contact <${process.env.ZOHO_SMTP_USER}>`,
    to: "hallo@lechner-studios.at",
    replyTo: `${name} <${email}>`,
    subject: `Kontaktanfrage: ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  return NextResponse.json({ ok: true });
}
```

Notes:
- `runtime = "nodejs"` — Edge runtime can't run Nodemailer (no Node TLS).
- Env vars set in Vercel project settings; founder generates app-specific password under TFA-enabled Zoho account before merge.

### Client form — replaces right column of `<Contact>`

The current `mailto:` link stays as a secondary fallback below the form. The form occupies the right column; the mailto drops below the form as a small `<p>` styled "Or email directly: hallo@lechner-studios.at" / "Oder direkt per E-Mail: hallo@lechner-studios.at".

UI states: idle / submitting / success / error. State stored in `useState`. On success, form is replaced by a confirmation message; on error, an error message renders above the submit button and the form stays interactive for retry.

Visual treatment matches the current `Contact` section's typography (Manrope mono labels, Cormorant headlines, gold separator on the submit button border-bottom).

## Datenschutz delta

### Both `LegalPrivacyDE.tsx` and `LegalPrivacyEN.tsx`

**1. Top comment update.**
Currently: *"This site is a pure marketing surface — no contact form, no analytics, no cookies."*
After: *"This site has a contact form (Vercel Function → Zoho EU SMTP, email only), no analytics, no cookies."*

**2. Rename §3 from "E-Mail-Kontakt" / "Email contact" → "Kontaktaufnahme" / "Contact requests".** Body unified for both `mailto:` and form submissions:

DE excerpt:

> Wenn Sie über das Kontaktformular oder per E-Mail Kontakt aufnehmen, verarbeiten wir die von Ihnen übermittelten Angaben (Name, E-Mail-Adresse, Nachrichteninhalt) zum Zweck der Bearbeitung Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Übermittelte Formulardaten werden über eine Vercel-Funktion an unseren E-Mail-Provider Zoho weitergeleitet und dort als E-Mail in unserem Postfach gespeichert; eine Persistierung in einer Datenbank, einem CRM oder einem anderen System erfolgt nicht. Speicherdauer: gemäß Postfach-Archivierung; spätestens nach Abschluss der Korrespondenz und Ablauf gesetzlicher Aufbewahrungsfristen. Eine Einwilligung können Sie jederzeit widerrufen — die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.

EN excerpt:

> If you contact us via the contact form or by email, we process the data you provide (name, email address, message body) for the purpose of handling your request. Legal basis is Art. 6(1)(b) GDPR (pre-contractual steps) and/or Art. 6(1)(a) GDPR (consent). Form submissions are forwarded by a Vercel Function to our email provider Zoho and stored as an email in our mailbox; no persistence in a database, CRM, or other system occurs. Retention: per mailbox archival; at latest after correspondence completion and applicable statutory retention periods. Consent may be withdrawn at any time — the lawfulness of processing carried out prior to withdrawal remains unaffected.

**3. Update §5 Auftragsverarbeiter — add Zoho row.**

DE addition:

> **Zoho Corporation B.V.** (Hoogoorddreef 15, 1101 BA Amsterdam, Niederlande) — E-Mail-Provider (Zoho Mail). EU-Rechenzentrum. AVV vorhanden. Datenschutzerklärung: https://www.zoho.com/privacy.html

EN: parallel English wording, same address.

**4. §9 Drittlandtransfer — no change.** Founder confirmed Zoho EU data center; existing Vercel SCC framing covers any residual transfer surface.

**5. §10 Aktualität — bump month** to whatever month the PR merges (likely `April 2026`).

## security.txt

Path: `public/.well-known/security.txt`

```
Contact: mailto:hallo@lechner-studios.at
Expires: 2027-04-28T00:00:00Z
Preferred-Languages: de, en
Canonical: https://lechner-studios.at/.well-known/security.txt
```

Notes:
- `Contact` uses `hallo@` until a dedicated `security@` alias is configured at Zoho (5-min task; not part of this PR).
- `Expires` is exactly 12 months from the spec date. Refresh annually.
- `Canonical` matches the deployed URL — verify scheme/host before merge.
- No PGP key (out of scope for v1).

## Security headers — `next.config.ts`

Replace empty config with `headers()`:

```ts
import type { NextConfig } from "next";

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
```

CSP rationale:
- `script-src 'unsafe-inline'` is a Next.js dev-mode requirement; tightening this requires nonce/hash strategy that's a separate effort.
- `connect-src 'self'` covers the form POST to `/api/contact`. If Vercel Analytics is later enabled, add `https://vitals.vercel-insights.com`.
- `img-src https:` permits the founder portrait `next/image` optimization endpoint and any future external image references.
- `frame-ancestors 'none'` defense-in-depth alongside `X-Frame-Options DENY`.
- No `report-uri` / `report-to` — out of scope for v1.

Test plan: post-merge, hit `https://lechner-studios.at` and verify response headers via `curl -I`. If anything breaks (e.g., a Next.js feature uses an external endpoint not allow-listed), loosen CSP minimally rather than removing.

## Files touched

| File | Action |
|---|---|
| `src/app/api/contact/route.ts` | New — Vercel Function POST handler |
| `src/components/Contact.tsx` | Modified — add form alongside `mailto:` |
| `src/i18n/dictionaries.ts` | Modified — add `dict.contact.form.{nameLabel, emailLabel, messageLabel, submit, submitting, success, errorValidation, errorRateLimit, errorGeneric, consent, mailtoFallback}` (EN + DE) |
| `src/components/LegalPrivacyDE.tsx` | Modified — top comment, §3 rename + body, §5 add Zoho, §10 date |
| `src/components/LegalPrivacyEN.tsx` | Modified — parallel changes |
| `next.config.ts` | Modified — add `headers()` + securityHeaders array |
| `public/.well-known/security.txt` | New |
| `package.json` + `package-lock.json` | Modified — add `nodemailer` + `@types/nodemailer` |

Env vars (Vercel project settings, not committed):

- `ZOHO_SMTP_USER` — typically `hallo@lechner-studios.at` or a dedicated SMTP user
- `ZOHO_SMTP_PASSWORD` — Zoho app-specific password (TFA-protected account)

## Acceptance criteria

1. POST to `/api/contact` with valid payload → 200, email arrives at `hallo@lechner-studios.at` within 60s.
2. POST with `_hp` non-empty → 200, no email sent.
3. POST without `consent: true` → 400.
4. POST with malformed email → 400.
5. POST with `name.length` > 200 → 400.
6. POST 6 times from same IP within 60 min → 6th returns 429.
7. Form HTML renders submit button disabled until consent checkbox checked.
8. Datenschutz EN + DE both reflect the new §3 unified Kontaktaufnahme section, Zoho added to §5 Auftragsverarbeiter, top comment updated, §10 month bumped.
9. `curl -I https://localhost:3000/` (after `npm run build && npm start`) returns the six security headers.
10. `https://localhost:3000/.well-known/security.txt` returns the RFC 9116 file with the four canonical fields.
11. `npx tsc --noEmit` clean. `npm run build` clean. Mobile (375px) form renders without horizontal overflow.

## Out of scope for this PR

- Pattern doc extraction to ai-brain (`patterns/at-public-site-compliance.md`) — separate spec/PR.
- Portfolio rollout of compliance hygiene to CodeFlash, Vistera, Werk, virtual-office-tirol — driven by the pattern doc.
- `security@lechner-studios.at` alias setup — 5-min Zoho task, can land any time.
- PGP key for security.txt — defer until a real report ever arrives.
- CSP nonce/hash strategy to drop `'unsafe-inline'` — defer.

## References

- ai-brain ADR-0017 (twin doctrine — N/A here, doctrine surface unchanged)
- lechner-studios `CONVENTIONS.md` (token names, mobile breakpoint, bilingual update parity)
- `~/dev/websites/docs/superpowers/specs/2026-04-27-brand-v4.1-design.md` (typography, color)
- RFC 9116 (security.txt)
- DSGVO Art. 5(1)(c), 5(1)(e), 6(1)(a), 6(1)(b), 7(3), 13, 28, 32
- TKG (AT) § 107 (electronic communication consent)
