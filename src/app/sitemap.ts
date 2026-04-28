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
