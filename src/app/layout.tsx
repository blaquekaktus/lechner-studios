import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cormorant, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// v4.1 display canonical: Cormorant 700 + Italiana 400, self-hosted
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

// Body copy — Cormorant (lighter weights), Manrope, JetBrains Mono
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

export const metadata: Metadata = {
  metadataBase: new URL("https://lechner-studios.at"),
  title: {
    default: "Lechner Studios — Design-Led Digital Studio, Tirol",
    template: "%s · Lechner Studios",
  },
  description:
    "Family-run, AI-native digital studio in Wattens, Tirol. Web & Design, Apps & Automation, SEO & Growth, Brand & Identity for SMB clients across DACH.",
  alternates: { canonical: "/" },
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
    title: "Lechner Studios — Design-Led Digital Studio, Tirol",
    description:
      "Family-run, AI-native digital studio in Wattens, Tirol. Four pillars: Web & Design, Apps & Automation, SEO & Growth, Brand & Identity.",
    url: "https://lechner-studios.at",
    siteName: "Lechner Studios",
    locale: "de_AT",
    alternateLocale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lechner Studios — Design-Led Digital Studio, Tirol",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lechner Studios — Design-Led Digital Studio, Tirol",
    description:
      "Family-run, AI-native digital studio. Wattens, Tirol, Österreich.",
    images: ["/og-image.png"],
  },
};

// Schema.org structured data — Organization + LocalBusiness + Person × 2.
// Uses @graph so multiple entities ship as one JSON-LD block.
// Geo coords are central Wattens (47.293°N, 11.601°E).
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://lechner-studios.at#organization",
      name: "Lechner Studios",
      url: "https://lechner-studios.at",
      logo: "https://lechner-studios.at/og-image.png",
      email: "hallo@lechner-studios.at",
      description:
        "Family-run, AI-native digital studio. Web & Design, Apps & Automation, SEO & Growth, Brand & Identity for SMB clients across DACH.",
      founder: { "@id": "https://lechner-studios.at#sonja" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Wattenbachgasse 29",
        addressLocality: "Wattens",
        postalCode: "6112",
        addressCountry: "AT",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://lechner-studios.at#localbusiness",
      name: "Lechner Studios",
      url: "https://lechner-studios.at",
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
      jobTitle: "Founder",
      worksFor: { "@id": "https://lechner-studios.at#organization" },
    },
    {
      "@type": "Person",
      "@id": "https://lechner-studios.at#jason",
      name: "Jason Lechner",
      jobTitle: "Managing Director",
      worksFor: { "@id": "https://lechner-studios.at#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
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
