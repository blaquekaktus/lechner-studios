import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cormorant } from "next/font/google";
import "./globals.css";

// Brand v4.2 typography — display unchanged from v4.1
// Cormorant 700 + Italiana 400 self-hosted; Cormorant 500/600 for H1–H3
// Body sans: General Sans (replaces Manrope), Mono: IBM Plex Mono (replaces JetBrains Mono)
// Per design spec: websites/docs/superpowers/specs/2026-05-01-brand-v4.2-typography-design.md
// Companion ADR: ai-brain/decisions/0020-lechner-brand-guidelines-v4.2-typography.md

const cormorantBold = localFont({
  src: "../../public/fonts/cormorant-700.woff2",
  weight: "700",
  style: "normal",
  display: "swap",
  variable: "--font-display-bold",
});

const italiana = localFont({
  src: "../../public/fonts/italiana-400.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-display-italiana",
});

// Cormorant 500/600 — H1–H3 display midweights (body serif retired in v4.2)
const cormorant = Cormorant({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// General Sans — body / UI / nav / buttons (v4.2 body sans)
const generalSans = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/general-sans-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/general-sans-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/general-sans-600.woff2",
      weight: "600",
      style: "normal",
    },
  ],
});

// IBM Plex Mono — eyebrows, captions, stat values (v4.2 umbrella mono)
const ibmPlexMono = localFont({
  variable: "--font-mono",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/ibm-plex-mono-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ibm-plex-mono-500.woff2",
      weight: "500",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lechner-studios.at"),
  title: {
    default: "Lechner Studios — Independent Digital Studio, Tirol",
    template: "%s · Lechner Studios",
  },
  description:
    "Independent digital studio based in Wattens, Tirol. We build products, design websites, and deploy AI systems for businesses that want to stand out.",
  alternates: { canonical: "/" },
  keywords: [
    "digital studio",
    "web design",
    "web development",
    "AI systems",
    "Tirol",
    "Wattens",
    "Österreich",
    "Austria",
  ],
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
    title: "Lechner Studios",
    description: "Independent digital studio. Wattens, Tirol, Österreich.",
    url: "https://lechner-studios.at",
    siteName: "Lechner Studios",
    locale: "de_AT",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lechner Studios — Independent Digital Studio, Tirol",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lechner Studios",
    description: "Independent digital studio. Wattens, Tirol, Österreich.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body
        className={`${cormorantBold.variable} ${italiana.variable} ${cormorant.variable} ${generalSans.variable} ${ibmPlexMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
