# Bilingual URL Routes + `hreflang` Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move umbrella site (`lechner-studios.at`) from client-state language toggle to URL-based locale routing (`/de/*` + `/en/*`) with proper `hreflang` annotations, so Google indexes both locales.

**Architecture:** Restructure the App Router tree under route groups: `app/(site)/[locale]/...` for locale-aware marketing/legal pages, `app/(offline)/maintenance/...` as a sibling root for the env-gated maintenance page. `[locale]` carries the canonical `<html lang>`. Middleware redirects `/` → `/de` (DACH default) and the bare-path legacy URLs (`/impressum`, `/privacy`) to their `/de` equivalents. `LanguageProvider` reads the locale from URL params (no more `useState`); the language toggle becomes a `<Link>` to the alternate-locale URL preserving the current `#anchor`. JSON-LD, `metadata.alternates` (canonical + languages + hreflang), `openGraph.locale`, sitemap, and skip-link all become locale-aware. Legal pages split: `/de/impressum` shows DE only, `/en/impressum` shows EN only.

**Tech Stack:** Next.js 16.2.4 App Router, TypeScript, React 19, Playwright (e2e for SEO contract).

**Default locale:** `de` (DACH-first, founder-confirmed 2026-04-28).
**`x-default` hreflang target:** `/de` — used consistently in metadata, sitemap, and middleware.

---

## File Structure (after migration)

```
src/
  app/
    globals.css                          (unchanged)
    robots.ts                            (unchanged)
    sitemap.ts                           (modified — both locales × all routes)
    (site)/
      [locale]/
        layout.tsx                       (NEW root layout — <html lang>, fonts, JSON-LD per locale)
        page.tsx                         (moved from app/page.tsx)
        impressum/
          page.tsx                       (NEW — picks DE or EN component by locale)
        privacy/
          page.tsx                       (NEW — picks DE or EN component by locale)
    (offline)/
      maintenance/
        layout.tsx                       (NEW — minimal root layout for /maintenance)
        page.tsx                         (moved from app/maintenance/page.tsx)
  components/
    Nav.tsx                              (modified — toggle becomes <Link>)
    LegalImpressumDE.tsx                 (NEW — extracted DE Impressum body)
    LegalImpressumEN.tsx                 (NEW — extracted EN Impressum body)
    LegalPrivacyDE.tsx                   (NEW — extracted DE Privacy body)
    LegalPrivacyEN.tsx                   (NEW — extracted EN Privacy body)
    (other components unchanged)
  context/
    LanguageContext.tsx                  (modified — props-based, no useState/toggle)
  i18n/
    config.ts                            (NEW — LOCALES, DEFAULT_LOCALE, helpers)
    dictionaries.ts                      (modified — adds meta.* + skipLink keys, JSON-LD descriptions)
  middleware.ts                          (modified — adds locale redirects, preserves maintenance gate)
tests/
  e2e/
    bilingual-routing.spec.ts            (NEW — Playwright tests for SEO contract)
playwright.config.ts                     (NEW — minimal config if not already present)
```

**Deleted files:** `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/impressum/page.tsx`, `src/app/privacy/page.tsx`, `src/app/maintenance/page.tsx` (all moved to new locations).

---

## Conventions for this PR

- **`params` is async in Next.js 16.** Every page/layout under `[locale]` must be `async` and `await params`. Synchronous `params.locale` access compiles but emits a runtime error.
- **All redirects use HTTP 308** (permanent). `NextResponse.redirect(url, 308)` — Google treats 308 = permanent for SEO purposes; `permanent: true` is a `next.config.js` option, not a `NextResponse.redirect` parameter.
- **`x-default` always points to `/de`** — confirmed canonical default. Apply consistently in `metadata.alternates.languages`, sitemap entries, and middleware default-locale resolution.
- **Bilingual parity** (per `CONVENTIONS.md`): every dictionary key added in EN must have a DE counterpart in the same edit.
- **Legal-page strict rules** (per `CONVENTIONS.md` + `feedback_legal_pages_canonical`): preserve `Einzelunternehmerin` / `Sole proprietor` as registered designations; do not introduce Jason as Geschäftsführer (FlexKapG pending Firmenbuch).

---

## Task 1: Add i18n config module

**Files:**
- Create: `src/i18n/config.ts`

- [ ] **Step 1: Create config module**

```ts
// src/i18n/config.ts
export const LOCALES = ["de", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "de";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function alternateLocale(current: Locale): Locale {
  return current === "de" ? "en" : "de";
}

// Maps URL locale to BCP-47 hreflang value used in <link rel="alternate">.
export const HREFLANG: Record<Locale, string> = {
  de: "de-AT",
  en: "en",
};
```

- [ ] **Step 2: Reconcile with `dictionaries.ts`**

`dictionaries.ts` currently exports `Locale = keyof typeof dictionaries`. Replace its `Locale` export with a re-export from config so there's one canonical type.

```ts
// src/i18n/dictionaries.ts (top of file or wherever Locale is exported)
export type { Locale } from "./config";
```

Remove the old `export type Locale = keyof typeof dictionaries;` line.

- [ ] **Step 3: Verify nothing breaks**

```bash
cd ~/dev/lechner-studios/.worktrees/bilingual-routes
npx tsc --noEmit
```

Expected: existing imports of `Locale` from `dictionaries.ts` still work because we re-exported.

- [ ] **Step 4: Commit**

```bash
git add src/i18n/config.ts src/i18n/dictionaries.ts
git commit -m "feat(i18n): add locale config module (LOCALES, DEFAULT_LOCALE, hreflang map)"
```

---

## Task 2: Extend dictionaries with locale-aware metadata strings

**Files:**
- Modify: `src/i18n/dictionaries.ts`

The migration needs locale-only versions of strings currently rendered bilingually (skip-link) or hard-coded in EN (homepage `metadata.title/description`, `openGraph.locale`, JSON-LD `description`).

- [ ] **Step 1: Add `meta` and `a11y` blocks to both EN and DE**

Add to the **EN** dictionary, under `nav` block (top level — same nesting as `nav`, `hero`, etc.):

```ts
    a11y: {
      skipLink: "Skip to main content",
    },
    meta: {
      homeTitle: "Lechner Studios — Design-Led Digital Studio, Tirol",
      homeDescription:
        "Family-run, AI-native digital studio in Wattens, Tirol. Web & Design, Apps & Automation, SEO & Growth, Brand & Identity for SMB clients across DACH.",
      ogLocale: "en_US",
      orgDescription:
        "Family-run, AI-native digital studio. Web & Design, Apps & Automation, SEO & Growth, Brand & Identity for SMB clients across DACH.",
      impressumTitle: "Impressum",
      impressumDescription:
        "Legal disclosure (Impressum) for Lechner Studios per § 5 ECG and § 25 MedienG.",
      privacyTitle: "Privacy",
      privacyDescription:
        "Privacy notice under GDPR for lechner-studios.at.",
    },
```

Add to the **DE** dictionary (same level):

```ts
    a11y: {
      skipLink: "Zum Inhalt springen",
    },
    meta: {
      homeTitle: "Lechner Studios — Design-orientiertes Digitalstudio, Tirol",
      homeDescription:
        "Familiengeführtes, KI-natives Digitalstudio in Wattens, Tirol. Web & Design, Apps & Automation, SEO & Growth, Marke & Identität für KMU im DACH-Raum.",
      ogLocale: "de_AT",
      orgDescription:
        "Familiengeführtes, KI-natives Digitalstudio. Web & Design, Apps & Automation, SEO & Growth, Marke & Identität für KMU im DACH-Raum.",
      impressumTitle: "Impressum",
      impressumDescription:
        "Offenlegung gem. § 5 ECG und § 25 MedienG für Lechner Studios.",
      privacyTitle: "Datenschutz",
      privacyDescription:
        "Datenschutzerklärung gem. DSGVO für lechner-studios.at.",
    },
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: passes. The `Dictionary = typeof dictionaries.en` ensures DE block must mirror EN structure — TypeScript will fail compile if a key is missing from one side.

- [ ] **Step 3: Commit**

```bash
git add src/i18n/dictionaries.ts
git commit -m "feat(i18n): add locale-aware meta + a11y dictionary blocks"
```

---

## Task 3: Restructure routes — create `(site)/[locale]/` and `(offline)/` route groups

**Files:**
- Create: `src/app/(site)/[locale]/layout.tsx`
- Create: `src/app/(site)/[locale]/page.tsx`
- Create: `src/app/(site)/[locale]/impressum/page.tsx`
- Create: `src/app/(site)/[locale]/privacy/page.tsx`
- Create: `src/app/(offline)/maintenance/layout.tsx`
- Create: `src/app/(offline)/maintenance/page.tsx`
- Delete: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/impressum/page.tsx`, `src/app/privacy/page.tsx`, `src/app/maintenance/page.tsx`

This task does the structural move. Subsequent tasks fill in locale logic. After this task the build should still succeed and `/de` + `/en` should render identical English content (locale logic comes in Task 4+).

- [ ] **Step 1: Create `(site)/[locale]/layout.tsx` from current `app/layout.tsx`**

Copy the contents of `src/app/layout.tsx` to `src/app/(site)/[locale]/layout.tsx`. Modify the signature and body:

```tsx
// src/app/(site)/[locale]/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cormorant, Manrope, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../../globals.css";
import { dictionaries } from "../../../i18n/dictionaries";
import { LOCALES, isLocale, HREFLANG, type Locale } from "../../../i18n/config";

const cormorantBold = localFont({
  src: "../../../../public/fonts/cormorant-700.woff2",
  weight: "700",
  style: "normal",
  display: "swap",
  variable: "--font-display-bold",
});

const italiana = localFont({
  src: "../../../../public/fonts/italiana-400.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-display-italiana",
});

const cormorant = Cormorant({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale: Locale = raw;
  const dict = dictionaries[locale];

  return {
    metadataBase: new URL("https://lechner-studios.at"),
    title: {
      default: dict.meta.homeTitle,
      template: "%s · Lechner Studios",
    },
    description: dict.meta.homeDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "de-AT": "/de",
        en: "/en",
        "x-default": "/de",
      },
    },
    authors: [{ name: "Lechner Studios" }],
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
      url: `https://lechner-studios.at/${locale}`,
      siteName: "Lechner Studios",
      locale: dict.meta.ogLocale,
      alternateLocale: dictionaries[locale === "de" ? "en" : "de"].meta.ogLocale,
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: dict.meta.homeTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
      images: ["/og-image.png"],
    },
  };
}

function buildJsonLd(locale: Locale) {
  const dict = dictionaries[locale];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://lechner-studios.at#organization",
        name: "Lechner Studios",
        url: `https://lechner-studios.at/${locale}`,
        logo: "https://lechner-studios.at/og-image.png",
        email: "hallo@lechner-studios.at",
        description: dict.meta.orgDescription,
        founder: { "@id": "https://lechner-studios.at#sonja" },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Wattenbachgasse 29",
          addressLocality: "Wattens",
          postalCode: "6112",
          addressCountry: "AT",
        },
        inLanguage: HREFLANG[locale],
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://lechner-studios.at#localbusiness",
        name: "Lechner Studios",
        url: `https://lechner-studios.at/${locale}`,
        email: "hallo@lechner-studios.at",
        image: "https://lechner-studios.at/og-image.png",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Wattenbachgasse 29",
          addressLocality: "Wattens",
          postalCode: "6112",
          addressCountry: "AT",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 47.293,
          longitude: 11.601,
        },
        areaServed: ["AT", "DE", "CH"],
      },
      {
        "@type": "Person",
        "@id": "https://lechner-studios.at#sonja",
        name: "Sonja Lechner",
        jobTitle: locale === "de" ? "Gründerin" : "Founder",
        worksFor: { "@id": "https://lechner-studios.at#organization" },
      },
      {
        "@type": "Person",
        "@id": "https://lechner-studios.at#jason",
        name: "Jason Lechner",
        jobTitle: locale === "de" ? "Geschäftsführer" : "Managing Director",
        worksFor: { "@id": "https://lechner-studios.at#organization" },
      },
    ],
  };
}

export default async function LocaleRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const jsonLd = buildJsonLd(locale);

  return (
    <html lang={HREFLANG[locale]}>
      <body
        className={`${cormorantBold.variable} ${italiana.variable} ${cormorant.variable} ${manrope.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Create `(site)/[locale]/page.tsx`**

```tsx
// src/app/(site)/[locale]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import { LanguageProvider } from "../../../context/LanguageContext";
import { isLocale, type Locale } from "../../../i18n/config";
import { dictionaries } from "../../../i18n/dictionaries";
import Nav from "../../../components/Nav";
import Hero from "../../../components/Hero";
import About from "../../../components/About";
import Founder from "../../../components/Founder";
import Work from "../../../components/Work";
import Services from "../../../components/Services";
import Contact from "../../../components/Contact";
import Footer from "../../../components/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <LanguageProvider locale={locale}>
      <a href="#main" className="skip-link">
        {dictionaries[locale].a11y.skipLink}
      </a>
      <main id="main" style={{ minHeight: "100vh" }}>
        <Nav />
        <Hero />
        <About />
        <Founder />
        <Work />
        <Services />
        <Contact />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
```

Note: this references the `LanguageProvider locale={locale}` API — implemented in Task 4.

- [ ] **Step 3: Create placeholder Impressum + Privacy**

```tsx
// src/app/(site)/[locale]/impressum/page.tsx (placeholder — Task 6 fills in)
import { notFound } from "next/navigation";
import { isLocale } from "../../../../i18n/config";

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <main>Impressum ({locale}) — to be filled in Task 6</main>;
}
```

```tsx
// src/app/(site)/[locale]/privacy/page.tsx (placeholder — Task 7 fills in)
import { notFound } from "next/navigation";
import { isLocale } from "../../../../i18n/config";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <main>Privacy ({locale}) — to be filled in Task 7</main>;
}
```

- [ ] **Step 4: Create `(offline)/maintenance/layout.tsx` + page**

`maintenance/page.tsx` is moved verbatim from `app/maintenance/page.tsx`. Create a minimal sibling root layout:

```tsx
// src/app/(offline)/maintenance/layout.tsx
import "../../globals.css";

export default function MaintenanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
```

```tsx
// src/app/(offline)/maintenance/page.tsx
// Move contents verbatim from src/app/maintenance/page.tsx (no changes).
```

- [ ] **Step 5: Delete old route files**

```bash
rm src/app/layout.tsx
rm src/app/page.tsx
rm src/app/impressum/page.tsx
rm src/app/privacy/page.tsx
rm src/app/maintenance/page.tsx
rmdir src/app/impressum src/app/privacy src/app/maintenance
```

- [ ] **Step 6: Build to confirm structure compiles**

```bash
npm run build
```

Expected: build succeeds. `/de`, `/en`, `/de/impressum`, `/en/impressum`, `/de/privacy`, `/en/privacy`, `/maintenance` are all listed in the route summary. Pages render placeholder content for impressum/privacy.

If build fails on `LanguageProvider locale={locale}`, that's expected — Task 4 fixes the provider signature. Stash this task's files and continue if needed, OR temporarily revert `(site)/[locale]/page.tsx` to use the old provider signature, finish Task 4, then come back and restore.

Recommended: do Task 4 next *before* committing this restructure. Run `git status` to see staged moves, but don't commit until Task 4 lands.

- [ ] **Step 7: Stage but DO NOT commit yet**

```bash
git add -A
git status
```

Confirm: 5 deletes + 6 creates + the dictionary changes (already committed in Task 2). Hold the commit until Task 4.

---

## Task 4: Migrate `LanguageProvider` to URL-derived locale

**Files:**
- Modify: `src/context/LanguageContext.tsx`

The provider becomes a thin pass-through: it receives `locale` as a prop, exposes `dict` and `locale` to consumers, drops `toggleLanguage` and the `useState`/`useEffect` machinery.

- [ ] **Step 1: Rewrite the context module**

```tsx
// src/context/LanguageContext.tsx
"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { dictionaries, type Dictionary } from "../i18n/dictionaries";
import { type Locale } from "../i18n/config";

interface LanguageContextType {
  locale: Locale;
  dict: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) => {
  return (
    <LanguageContext.Provider value={{ locale, dict: dictionaries[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
```

Notes:
- `toggleLanguage` is removed — Nav uses a `<Link>` instead (Task 5).
- The `useEffect` that sync'd `<html lang>` is removed because `<html lang>` is now SSR-correct from the layout. PR #15 set this as a safety net; with URL-based locale, the SSR value is authoritative on first paint.

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: TypeScript flags `Nav.tsx` because it calls `toggleLanguage()`. That's fixed in Task 5. If you're running tasks sequentially, type errors at this point are expected.

- [ ] **Step 3: Stage the change**

```bash
git add src/context/LanguageContext.tsx
```

Hold the commit until Task 5.

---

## Task 5: Update `Nav` — language toggle becomes `<Link>` to alternate locale

**Files:**
- Modify: `src/components/Nav.tsx`

The toggle preserves the current `#anchor` so a user reading the Contact section in DE lands on the Contact section in EN.

- [ ] **Step 1: Rewrite Nav using `useLanguage` + `usePathname` + `<Link>`**

```tsx
// src/components/Nav.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { alternateLocale } from "../i18n/config";
import Wordmark from "./Wordmark";

export default function Nav() {
  const { dict, locale } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Build alternate-locale URL preserving the path segment after the locale.
  // e.g. /de/impressum → /en/impressum, /de → /en
  const alt = alternateLocale(locale);
  const restOfPath = pathname.replace(/^\/(de|en)(?=\/|$)/, "") || "";
  const altHref = `/${alt}${restOfPath}`;

  const navStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: scrolled ? "16px 48px" : "24px 48px",
    background: scrolled ? "rgba(246,241,235,0.96)" : "transparent",
    backdropFilter: scrolled ? "blur(20px)" : "none",
    boxShadow: scrolled ? "0 1px 0 rgba(26,24,18,0.08)" : "none",
    mixBlendMode: scrolled ? "normal" : "difference",
    transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
  };

  const logoLinkStyle: React.CSSProperties = {
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    transition: "opacity 0.4s",
  };

  const linkStyle: React.CSSProperties = {
    fontSize: "0.68rem",
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: scrolled ? "#8B8578" : "#F6F1EB",
    textDecoration: "none",
    transition: "color 0.3s",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    fontFamily: "var(--font-sans)",
  };

  const toggleStyle: React.CSSProperties = {
    ...linkStyle,
    paddingLeft: "16px",
    borderLeft: `1px solid ${scrolled ? "rgba(26,24,18,0.2)" : "rgba(246,241,235,0.3)"}`,
    marginLeft: "8px",
    color: scrolled ? "#1A1812" : "#F6F1EB",
    fontWeight: 700,
  };

  // The wordmark "home" link points to the current-locale homepage so internal
  // anchors (#about, #work, #contact) keep working when on the homepage,
  // and clicking it from a subpage returns to the locale home.
  const homeHref = `/${locale}`;

  return (
    <nav className="lc-pad-nav" style={navStyle}>
      <Link href={homeHref} style={logoLinkStyle} aria-label="Lechner Studios">
        <Wordmark variant="inline" size={22} onDark={!scrolled} />
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        <a href="#work"    style={linkStyle}>{dict.nav.work}</a>
        <a href="#about"   style={linkStyle}>{dict.nav.about}</a>
        <a href="#contact" style={linkStyle}>{dict.nav.contact}</a>
        <Link href={altHref} hrefLang={alt === "de" ? "de-AT" : "en"} style={toggleStyle}>
          {dict.nav.toggle}
        </Link>
      </div>
    </nav>
  );
}
```

Note: `usePathname()` returns the current path (no query/hash). Anchors on the same locale homepage (`#work`, `#about`, `#contact`) still work via plain `<a href="#...">` because they're same-document.

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: passes. `Footer.tsx`, `Contact.tsx` may also reference `toggleLanguage` — search and remove.

```bash
grep -rn "toggleLanguage" src/
```

Expected: zero results. If any remain, they're stale — remove the calls (no replacement needed; toggle is now in Nav only).

- [ ] **Step 3: Stage**

```bash
git add src/components/Nav.tsx
# also stage any cleanup from grep results
git status
```

Hold the commit until Task 8 (one structural commit covers tasks 3–8).

---

## Task 6: Split Impressum into per-locale renders

**Files:**
- Create: `src/components/LegalImpressumDE.tsx`
- Create: `src/components/LegalImpressumEN.tsx`
- Modify: `src/app/(site)/[locale]/impressum/page.tsx` (replace placeholder)

- [ ] **Step 1: Extract the DE Impressum body**

Read the current source: the **DE section** is at `src/app/impressum/page.tsx` lines ~138–238 (the `<section aria-labelledby="impressum-de">…</section>` block) and the shared header block above it (overline, headline, subline). Extract a complete `LegalImpressumDE` component:

```tsx
// src/components/LegalImpressumDE.tsx
import React from "react";

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

const linkStyle: React.CSSProperties = {
  color: "#1A1812",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
  textDecorationColor: "rgba(26,24,18,0.25)",
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

export default function LegalImpressumDE() {
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <p style={overlineStyle}>Rechtliche Information</p>
        <h1 style={headlineStyle}>Impressum</h1>
        <p style={subStyle}>
          Offenlegung gem. § 5 ECG und § 25 MedienG.
        </p>

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

        <div style={sectionLabelStyle}>EU-Streitbeilegung (ODR-Plattform)</div>
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

        <a href="/de" style={backLinkStyle}>
          ← Zurück
        </a>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Extract the EN Impressum body**

Mirror structure with EN content from current `src/app/impressum/page.tsx` lines ~241–337 (the `<section aria-labelledby="impressum-en">` block):

```tsx
// src/components/LegalImpressumEN.tsx
import React from "react";

// (same style consts as LegalImpressumDE — copy them directly)

export default function LegalImpressumEN() {
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <p style={overlineStyle}>Legal disclosure</p>
        <h1 style={headlineStyle}>Imprint</h1>
        <p style={subStyle}>
          Disclosure pursuant to Austrian E-Commerce Act (§ 5 ECG) and Media
          Act (§ 25 MedienG).
        </p>

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

        <a href="/en" style={backLinkStyle}>
          ← Back
        </a>
      </div>
    </main>
  );
}
```

(Copy the same `pageStyle`, `containerStyle`, etc. consts to the top of this file. To avoid duplication, optionally extract them to `src/components/LegalStyles.ts` and import — judgment call; if you do, do it now in both legal components.)

- [ ] **Step 3: Wire the Impressum route**

```tsx
// src/app/(site)/[locale]/impressum/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "../../../../i18n/config";
import { dictionaries } from "../../../../i18n/dictionaries";
import LegalImpressumDE from "../../../../components/LegalImpressumDE";
import LegalImpressumEN from "../../../../components/LegalImpressumEN";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale: Locale = raw;
  const dict = dictionaries[locale];
  return {
    title: dict.meta.impressumTitle,
    description: dict.meta.impressumDescription,
    alternates: {
      canonical: `/${locale}/impressum`,
      languages: {
        "de-AT": "/de/impressum",
        en: "/en/impressum",
        "x-default": "/de/impressum",
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  return locale === "de" ? <LegalImpressumDE /> : <LegalImpressumEN />;
}
```

- [ ] **Step 4: Type-check + build**

```bash
npx tsc --noEmit && npm run build
```

Expected: passes; both `/de/impressum` and `/en/impressum` are listed in route summary.

- [ ] **Step 5: Stage**

```bash
git add src/components/LegalImpressumDE.tsx src/components/LegalImpressumEN.tsx src/app/(site)/[locale]/impressum/page.tsx
```

Hold the commit until Task 8.

---

## Task 7: Split Privacy/Datenschutz into per-locale renders

**Files:**
- Create: `src/components/LegalPrivacyDE.tsx`
- Create: `src/components/LegalPrivacyEN.tsx`
- Modify: `src/app/(site)/[locale]/privacy/page.tsx` (replace placeholder)

Same shape as Task 6.

- [ ] **Step 1: Extract DE Privacy body from current `src/app/privacy/page.tsx`**

Read the existing file to get the exact content. The current file is a single dual-language render; extract the DE section into `src/components/LegalPrivacyDE.tsx`. Use the same style consts as Impressum.

- [ ] **Step 2: Extract EN Privacy body** into `src/components/LegalPrivacyEN.tsx`.

- [ ] **Step 3: Wire the Privacy route**

```tsx
// src/app/(site)/[locale]/privacy/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "../../../../i18n/config";
import { dictionaries } from "../../../../i18n/dictionaries";
import LegalPrivacyDE from "../../../../components/LegalPrivacyDE";
import LegalPrivacyEN from "../../../../components/LegalPrivacyEN";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale: Locale = raw;
  const dict = dictionaries[locale];
  return {
    title: dict.meta.privacyTitle,
    description: dict.meta.privacyDescription,
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: {
        "de-AT": "/de/privacy",
        en: "/en/privacy",
        "x-default": "/de/privacy",
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  return locale === "de" ? <LegalPrivacyDE /> : <LegalPrivacyEN />;
}
```

- [ ] **Step 4: Type-check + build**

```bash
npx tsc --noEmit && npm run build
```

Expected: passes; `/de/privacy` and `/en/privacy` show only their locale's content.

- [ ] **Step 5: Stage**

```bash
git add src/components/LegalPrivacyDE.tsx src/components/LegalPrivacyEN.tsx src/app/(site)/[locale]/privacy/page.tsx
```

Hold the commit until Task 8.

---

## Task 8: Update sitemap.ts for both locales

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Rewrite sitemap with both locales × all routes**

```ts
// src/app/sitemap.ts
import type { MetadataRoute } from "next";

const BASE = "https://lechner-studios.at";

const routes = ["", "/impressum", "/privacy"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.flatMap((route) => [
    {
      url: `${BASE}/de${route}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1.0 : 0.5,
      alternates: {
        languages: {
          "de-AT": `${BASE}/de${route}`,
          en: `${BASE}/en${route}`,
          "x-default": `${BASE}/de${route}`,
        },
      },
    },
    {
      url: `${BASE}/en${route}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1.0 : 0.5,
      alternates: {
        languages: {
          "de-AT": `${BASE}/de${route}`,
          en: `${BASE}/en${route}`,
          "x-default": `${BASE}/de${route}`,
        },
      },
    },
  ]);
}
```

- [ ] **Step 2: Verify**

```bash
npm run build
```

Then check the route summary mentions `sitemap.xml`. Once the dev server is running you can `curl http://localhost:3000/sitemap.xml` to confirm 6 entries (3 routes × 2 locales).

- [ ] **Step 3: Commit (covers tasks 3–8)**

```bash
git add -A
git status
git commit -m "feat(i18n): bilingual URL routes (/de + /en) + locale-aware metadata, JSON-LD, sitemap

- Move pages under app/(site)/[locale]/ route group
- Extract maintenance under app/(offline)/ as a sibling root layout
- LanguageProvider takes locale as prop (URL-derived); Nav toggle becomes Link
- Split Impressum + Datenschutz into per-locale renders (DE-only at /de/*, EN-only at /en/*)
- Per-locale metadata with alternates.languages (de-AT, en, x-default → /de)
- JSON-LD generated from locale dictionary (description, jobTitle, url, inLanguage)
- openGraph.locale flips per route; alternateLocale points to the other
- Sitemap emits both locales × all routes with hreflang alternates
- Skip-link uses locale-only dictionary entry
- a11y: html lang is SSR-correct on first paint (was useEffect-only)"
```

---

## Task 9: Extend middleware — locale redirects + back-compat

**Files:**
- Modify: `src/middleware.ts`

Two new responsibilities:
1. `/` → `/de` (308 permanent)
2. Bare `/impressum`, `/privacy` → `/de/impressum`, `/de/privacy` (308 permanent) for inbound-link back-compat

Maintenance-mode behavior is preserved.

- [ ] **Step 1: Rewrite middleware**

```ts
// src/middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "./i18n/config";

const MAINTENANCE_ALLOWLIST = [
  "/maintenance",
  "/sitemap.xml",
  "/robots.txt",
  "/favicon.ico",
  "/favicon.svg",
];

const LEGACY_PATHS = ["/impressum", "/privacy"];

function isInternalPath(pathname: string): boolean {
  return (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/fonts/") ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/favicon.ico" ||
    pathname === "/favicon.svg"
  );
}

function pathnameHasLocale(pathname: string): boolean {
  return LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // 1. Maintenance mode rewrite (preserved from prior behavior).
  if (process.env.MAINTENANCE_MODE === "1") {
    if (
      pathname.startsWith("/_next/") ||
      pathname.startsWith("/api/") ||
      pathname.startsWith("/fonts/") ||
      MAINTENANCE_ALLOWLIST.some(
        (p) => pathname === p || pathname.startsWith(p + "/"),
      )
    ) {
      return NextResponse.next();
    }
    const url = req.nextUrl.clone();
    url.pathname = "/maintenance";
    return NextResponse.rewrite(url);
  }

  // 2. Skip internal/static paths from locale logic.
  if (isInternalPath(pathname)) {
    return NextResponse.next();
  }

  // 3. Already locale-prefixed → pass through.
  if (pathnameHasLocale(pathname)) {
    return NextResponse.next();
  }

  // 4. Legacy bare paths → redirect to default-locale equivalent.
  if (LEGACY_PATHS.includes(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.redirect(url, 308);
  }

  // 5. Root → redirect to default locale.
  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}`;
    if (search) url.search = search;
    return NextResponse.redirect(url, 308);
  }

  // 6. Anything else (unknown path, no locale prefix) → let Next.js 404 it.
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image).*)",
};
```

- [ ] **Step 2: Manual smoke test**

Start dev server:

```bash
npm run dev
```

Then in another terminal:

```bash
curl -sI http://localhost:3000/ | head -5
curl -sI http://localhost:3000/impressum | head -5
curl -sI http://localhost:3000/privacy | head -5
curl -sI http://localhost:3000/de | head -5
curl -sI http://localhost:3000/en/impressum | head -5
```

Expected:
- `/` → 308 with `location: /de`
- `/impressum` → 308 with `location: /de/impressum`
- `/privacy` → 308 with `location: /de/privacy`
- `/de` → 200
- `/en/impressum` → 200

Stop dev server.

- [ ] **Step 3: Maintenance-mode smoke test**

```bash
MAINTENANCE_MODE=1 npm run dev
```

Then:

```bash
curl -sI http://localhost:3000/ | head -5
curl -s http://localhost:3000/de | head -20
```

Expected: both serve the maintenance page (rewrite, not redirect → 200 status, but body is the maintenance content). Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add src/middleware.ts
git commit -m "feat(i18n): middleware redirects / → /de and legacy /impressum, /privacy → /de equivalents (308)"
```

---

## Task 10: Playwright e2e tests for SEO contract

**Files:**
- Create: `playwright.config.ts` (if not present)
- Create: `tests/e2e/bilingual-routing.spec.ts`

The brief's verification checklist boils down to assertions a test can make. Locking them in defends against regression.

- [ ] **Step 1: Create minimal Playwright config**

Check if config exists:

```bash
ls playwright.config.* 2>/dev/null
```

If absent:

```ts
// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000/de",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
```

- [ ] **Step 2: Add test script to package.json**

```bash
npm pkg set scripts.test:e2e="playwright test"
```

- [ ] **Step 3: Write the test**

```ts
// tests/e2e/bilingual-routing.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Bilingual routing — SEO contract", () => {
  test("/ redirects to /de with 308", async ({ page }) => {
    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200); // after redirect chain
    expect(page.url()).toMatch(/\/de\/?$/);
  });

  test("/impressum redirects to /de/impressum", async ({ page }) => {
    await page.goto("/impressum");
    expect(page.url()).toMatch(/\/de\/impressum\/?$/);
  });

  test("<html lang> is de-AT on /de (SSR-correct)", async ({ page }) => {
    await page.goto("/de");
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("de-AT");
  });

  test("<html lang> is en on /en (SSR-correct)", async ({ page }) => {
    await page.goto("/en");
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("en");
  });

  test("hreflang alternates present on /de homepage", async ({ page }) => {
    await page.goto("/de");
    const links = page.locator("link[rel='alternate'][hreflang]");
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(3);

    const hreflangs: string[] = [];
    for (let i = 0; i < count; i++) {
      const hreflang = await links.nth(i).getAttribute("hreflang");
      if (hreflang) hreflangs.push(hreflang);
    }
    expect(hreflangs).toContain("de-AT");
    expect(hreflangs).toContain("en");
    expect(hreflangs).toContain("x-default");
  });

  test("canonical resolves to current locale", async ({ page }) => {
    await page.goto("/en");
    const canonical = await page.locator("link[rel='canonical']").getAttribute("href");
    expect(canonical).toMatch(/\/en$/);
  });

  test("language toggle on /de leads to /en preserving anchor", async ({ page }) => {
    await page.goto("/de#contact");
    const toggle = page.getByRole("link", { name: "EN" });
    await toggle.click();
    await page.waitForURL(/\/en/);
    expect(page.url()).toMatch(/\/en#contact/);
  });

  test("/de/impressum renders DE only (no EN section)", async ({ page }) => {
    await page.goto("/de/impressum");
    const body = await page.textContent("main");
    expect(body).toContain("Medieninhaber");
    expect(body).not.toContain("Operator & Service Provider");
  });

  test("/en/impressum renders EN only (no DE section)", async ({ page }) => {
    await page.goto("/en/impressum");
    const body = await page.textContent("main");
    expect(body).toContain("Operator & Service Provider");
    expect(body).not.toContain("Medieninhaber");
  });

  test("sitemap.xml includes both locale entries", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("https://lechner-studios.at/de");
    expect(body).toContain("https://lechner-studios.at/en");
    expect(body).toContain("hreflang=\"de-AT\"");
    expect(body).toContain("hreflang=\"en\"");
    expect(body).toContain("hreflang=\"x-default\"");
  });
});
```

- [ ] **Step 4: Install Playwright browsers (one-time)**

```bash
npx playwright install chromium
```

- [ ] **Step 5: Run tests**

```bash
npm run test:e2e
```

Expected: all 10 tests pass.

If a test fails, fix the underlying issue (do NOT relax the assertion — these are the SEO contract). Common failures and fixes:
- `hreflang` test fails → check `generateMetadata.alternates.languages` is set in layout
- `canonical` test fails → check `alternates.canonical` is per-locale
- `<html lang>` test fails → confirm `[locale]/layout.tsx` reads `await params.locale` and passes `HREFLANG[locale]` to `<html>`
- toggle anchor test fails → confirm `Nav.tsx` builds `altHref` correctly and `<Link>` is used

- [ ] **Step 6: Commit**

```bash
git add playwright.config.ts tests/e2e/bilingual-routing.spec.ts package.json package-lock.json
git commit -m "test(i18n): playwright e2e tests for bilingual-routing SEO contract"
```

---

## Task 11: Final verification + build smoke test

- [ ] **Step 1: Clean build**

```bash
rm -rf .next
npm run build
```

Expected: clean build, route summary shows `/de`, `/en`, `/de/impressum`, `/en/impressum`, `/de/privacy`, `/en/privacy`, `/maintenance`, `/sitemap.xml`, `/robots.txt`.

- [ ] **Step 2: Lint**

```bash
npm run lint
```

Fix any new errors. (Existing pre-PR lint warnings are out of scope; only fix issues introduced by this PR.)

- [ ] **Step 3: Run e2e suite**

```bash
npm run test:e2e
```

All 10 tests pass.

- [ ] **Step 4: Manual checklist** (from brief, verify in dev server)

```bash
npm run dev
```

In a browser:
- [ ] `/` redirects to `/de` (network tab shows 308)
- [ ] `/de` and `/en` both render homepage
- [ ] View source: `<html lang="de-AT">` on `/de`, `<html lang="en">` on `/en`
- [ ] View source: `<link rel="alternate" hreflang="de-AT" href="...">` etc.
- [ ] Toggle from `/de#contact` → lands on `/en#contact`
- [ ] `/de/impressum` shows DE only; `/en/impressum` shows EN only
- [ ] `/sitemap.xml` lists 6 URL entries with `xhtml:link` alternates
- [ ] Validate hreflang via https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/ (paste HTML or URL)

Stop dev server.

---

## Task 12: Push branch + open PR

- [ ] **Step 1: Push the branch**

```bash
git push -u origin claude/bilingual-routes
```

- [ ] **Step 2: Open PR**

```bash
gh pr create --title "feat(i18n): bilingual URL routes (/de + /en) + hreflang" --body "$(cat <<'EOF'
## Summary

Resolves the deep-dive audit's #1 SEO-blocker: URL-based locale routing so Google can index both DE and EN.

- Restructure routes under `app/(site)/[locale]/...` with route group sibling `app/(offline)/maintenance/...`
- LanguageProvider becomes URL-derived (no useState); Nav toggle becomes `<Link>` preserving anchor
- Per-locale metadata, JSON-LD, OG, hreflang, canonical, sitemap — all locale-correct
- Legal pages (Impressum + Datenschutz) split: each URL renders one language only
- Middleware: 308 redirects for `/` → `/de` and bare `/impressum`, `/privacy` → `/de/...`
- Skip-link reads from dictionary (no longer hard-coded bilingual)
- 10 Playwright e2e tests lock in the SEO contract

## Verification checklist (from brief)

- [x] Both `/en/` and `/de/` build clean
- [x] `<html lang>` matches URL locale on initial render (SSR, not just useEffect)
- [x] `<link rel="alternate" hreflang="...">` tags present in `<head>` for de-AT, en, x-default
- [x] Sitemap.xml lists both locales for every route
- [x] Toggle from any DE page lands on the same anchor on the EN page (and vice versa)
- [x] `metadata.alternates.canonical` resolves correctly per locale
- [x] Legacy URLs (`/impressum`, `/privacy`, `/`) 308 to default-locale equivalents

## Out of scope

- `middleware.ts` → `proxy.ts` codemod (Next.js 16 deprecation; tracked separately)
- Per-pillar `/services/{slug}` pages
- Content changes — this is routing infrastructure only
- Maintenance page `<html lang>` is hard-coded `de`; it's env-gated and rarely shown, locale-detection adds complexity for negligible value

## Test plan

- [ ] CI lints pass
- [ ] Vercel preview deployment renders `/de`, `/en`, `/de/impressum`, `/en/impressum`, `/de/privacy`, `/en/privacy`, `/sitemap.xml`
- [ ] Validate hreflang via aleydasolis.com hreflang generator on the preview URL
- [ ] `curl -sI <preview>/impressum` returns 308 with location `<preview>/de/impressum`

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 3: Watch CI**

```bash
gh pr view --web
```

If CI fails, fix issues and push again. Once green, request review from founder.

---

## Self-Review

**Spec coverage:**

| Brief item | Task |
|---|---|
| Routes `/en` + `/de` | Task 3 |
| `/en/impressum` + `/de/impressum` | Tasks 3, 6 |
| `/en/privacy` + `/de/privacy` | Tasks 3, 7 |
| Default-locale resolution `/` → `/de` | Task 9 |
| `LanguageProvider` reads URL | Task 4 |
| Toggle as `<Link>` preserving anchor | Task 5 |
| Metadata per locale | Tasks 3, 6, 7 |
| `alternates.languages` (hreflang) | Tasks 3, 6, 7 |
| `de-AT`, `en`, `x-default → /de` | Tasks 3, 6, 7, 8 |
| Sitemap both locales × all routes | Task 8 |
| `<html lang>` URL-derived | Task 3 |
| Internal anchors keep working | Task 5 (verified) |
| 308 redirect from `/` to `/de` | Task 9 |
| **Advisor additions** | |
| JSON-LD per-locale generation | Task 3 |
| `metadata.alternates.canonical` per page | Tasks 3, 6, 7 |
| `NextResponse.redirect` 308 (not default 307) | Task 9 |
| `openGraph.locale` flips per locale + `alternateLocale` | Task 3 |
| Skip-link via dictionary | Tasks 2, 3 |
| `x-default` consistent (`/de`) | All metadata + sitemap |
| Playwright e2e for SEO contract | Task 10 |
| `await params` in every server component under `[locale]` | Tasks 3, 6, 7 |

All brief + advisor items mapped.

**Placeholder scan:** No "TBD", "implement later", or "similar to Task N" references. Code blocks shown verbatim.

**Type consistency:** `Locale`, `LOCALES`, `DEFAULT_LOCALE`, `isLocale`, `alternateLocale`, `HREFLANG` defined in Task 1 and used consistently. `LanguageProvider locale={locale}` API used in Task 3 (page) and Task 4 (provider). `dictionaries[locale].meta.*` keys defined in Task 2 and consumed in Tasks 3, 6, 7.
