import { notFound } from "next/navigation";
import { isLocale } from "../../../../i18n/config";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <main>Privacy ({locale}) — to be filled in Task 7</main>;
}
