export const dictionaries = {
  en: {
    nav: {
      services: "Services",
      work: "Our Work",
      contact: "Contact",
      toggle: "DE"
    },
    hero: {
      tagline: "WEB, IDENTITY & GROWTH",
      location: "TIROL • ÖSTERREICH",
      description: "Premium digital experiences for Tyrolean businesses. From tailored web design to powerful SaaS platforms."
    },
    services: {
      vistera: {
        title: "Vistera",
        subtitle: "PropTech VR Platform",
        desc: "A global, VR-first real-estate platform where buyers tour properties via photorealistic 360° walkthroughs before ever stepping inside."
      },
      codeflash: {
        title: "CodeFlash",
        subtitle: "Spaced-Repetition Flashcards",
        desc: "Interactive flashcards for developers & security pros. No account, no tracking, works offline."
      },
      aiShortcut: {
        title: "The AI Shortcut",
        subtitle: "Content Engine",
        desc: "An end-to-end AI content production system turning ideas into research, scripts, and video renders."
      },
      websites: {
        title: "Websites for KMUs",
        subtitle: "Tailored Web Design",
        desc: "Inbound-only, custom web design practice for small and medium enterprises in Tyrol."
      },
      virtualOffice: {
        title: "Virtual Office Tirol",
        subtitle: "Virtual Services",
        desc: "Premium virtual office service for Innsbruck. Legally usable business address and mail handling."
      },
      brightBean: {
        title: "BrightBean Studio",
        subtitle: "Open-Source Social",
        desc: "Open-source, self-hostable social media management platform. Multi-workspace, visual calendar, and publishing engine."
      }
    },
    footer: {
      rights: "All rights reserved."
    }
  },
  de: {
    nav: {
      services: "Leistungen",
      work: "Unsere Arbeit",
      contact: "Kontakt",
      toggle: "EN"
    },
    hero: {
      tagline: "WEB, IDENTITÄT & WACHSTUM",
      location: "TIROL • ÖSTERREICH",
      description: "Premium Digitalerlebnisse für Tiroler Unternehmen. Von maßgeschneidertem Webdesign bis zu leistungsstarken SaaS-Plattformen."
    },
    services: {
      vistera: {
        title: "Vistera",
        subtitle: "PropTech VR Plattform",
        desc: "Eine globale, VR-First Immobilienplattform. Käufer besichtigen Immobilien via fotorealistischen 360°-Rundgängen."
      },
      codeflash: {
        title: "CodeFlash",
        subtitle: "Spaced-Repetition Lernkarten",
        desc: "Interaktive Lernkarten für Entwickler & Security-Profis. Ohne Account, ohne Tracking, offline verfügbar."
      },
      aiShortcut: {
        title: "Die KI-Shortcuts",
        subtitle: "Content Engine",
        desc: "Ein durchgängiges KI-System für die Content-Produktion. Von der Idee über Skripte bis zum fertigen Video."
      },
      websites: {
        title: "Websites für KMUs",
        subtitle: "Maßgeschneidertes Webdesign",
        desc: "Inbound-Only Webdesign-Agentur für kleine und mittlere Unternehmen in Tirol."
      },
      virtualOffice: {
        title: "Virtual Office Tirol",
        subtitle: "Virtuelle Dienstleistungen",
        desc: "Premium Virtual Office Service für Innsbruck. Ladungsfähige Geschäftsadresse und Postbearbeitung."
      },
      brightBean: {
        title: "BrightBean Studio",
        subtitle: "Open-Source Social",
        desc: "Open-Source Social-Media-Management. Multi-Workspace, visueller Kalender und Publishing-Engine."
      }
    },
    footer: {
      rights: "Alle Rechte vorbehalten."
    }
  }
};

export type Dictionary = typeof dictionaries.en;
export type Locale = keyof typeof dictionaries;
