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
        className={`${cormorantBold.variable} ${italiana.variable} ${cormorant.variable} ${manrope.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
