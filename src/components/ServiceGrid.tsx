"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function ServiceGrid() {
  const { dict } = useLanguage();

  const services = [
    {
      id: "vistera",
      title: dict.services.vistera.title,
      subtitle: dict.services.vistera.subtitle,
      desc: dict.services.vistera.desc,
      color: "bg-alpine-navy text-alpine-light",
      link: "https://vistera.io"
    },
    {
      id: "codeflash",
      title: dict.services.codeflash.title,
      subtitle: dict.services.codeflash.subtitle,
      desc: dict.services.codeflash.desc,
      color: "bg-alpine-blue text-alpine-navy",
      link: "https://codeflash.lechner-studios.at"
    },
    {
      id: "aiShortcut",
      title: dict.services.aiShortcut.title,
      subtitle: dict.services.aiShortcut.subtitle,
      desc: dict.services.aiShortcut.desc,
      color: "bg-alpine-sage text-alpine-light",
      link: "#"
    },
    {
      id: "websites",
      title: dict.services.websites.title,
      subtitle: dict.services.websites.subtitle,
      desc: dict.services.websites.desc,
      color: "bg-alpine-sand text-alpine-navy",
      link: "https://websites.lechner-studios.at"
    },
    {
      id: "virtualOffice",
      title: dict.services.virtualOffice.title,
      subtitle: dict.services.virtualOffice.subtitle,
      desc: dict.services.virtualOffice.desc,
      color: "bg-alpine-dark text-alpine-light",
      link: "https://virtual-office.lechner-studios.at"
    },
    {
      id: "brightBean",
      title: dict.services.brightBean.title,
      subtitle: dict.services.brightBean.subtitle,
      desc: dict.services.brightBean.desc,
      color: "bg-white text-alpine-dark border border-alpine-navy/10",
      link: "https://brightbean.lechner-studios.at"
    }
  ];

  return (
    <section id="services" className="px-6 md:px-12 py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <a 
            key={service.id} 
            href={service.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${service.color} p-10 min-h-[300px] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2 group`}
          >
            <div>
              <p className="text-xs tracking-widest uppercase mb-4 opacity-70">
                {service.subtitle}
              </p>
              <h3 className="font-serif text-2xl mb-4 group-hover:opacity-80 transition-opacity">
                {service.title}
              </h3>
            </div>
            <p className="text-sm font-light leading-relaxed opacity-80">
              {service.desc}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
