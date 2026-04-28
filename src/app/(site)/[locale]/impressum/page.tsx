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
