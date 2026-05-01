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
