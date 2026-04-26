import type { Metadata } from "next";
import { Cormorant, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lechner-studios.at"),
  title: "Lechner Studios — Independent Digital Studio, Tirol",
  description:
    "Independent digital studio based in Wattens, Tirol. We build products, design websites, and deploy AI systems for businesses that want to stand out.",
  alternates: {
    canonical: "/",
  },
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
  robots: {
    index: true,
    follow: true,
  },
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
    title: "Lechner Studios — Independent Digital Studio, Tirol",
    description:
      "Independent digital studio based in Wattens, Tirol. We build products, design websites, and deploy AI systems for businesses that want to stand out.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body
        className={`${cormorant.variable} ${manrope.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
