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
  title: "Lechner Studios — Independent Digital Studio, Tirol",
  description:
    "Independent digital studio based in Wattens, Tirol. We build products, design websites, and deploy AI systems for businesses that want to stand out.",
  openGraph: {
    title: "Lechner Studios",
    description: "Independent digital studio. Wattens, Tirol, Österreich.",
    url: "https://lechner-studios.at",
    siteName: "Lechner Studios",
    locale: "de_AT",
    type: "website",
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
