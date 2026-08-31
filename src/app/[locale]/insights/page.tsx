import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dictionary, t } from "@/content/dictionary";
import { isLocale, type Locale } from "@/lib/i18n";
import { InsightsArchive } from "@/components/insights-archive";
import { PageHeader } from "@/components/page-header";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return {
    title: t(dictionary.insights.title, locale),
    description: t(dictionary.insights.lede, locale),
    alternates: { canonical: `/${locale}/insights` },
  };
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <>
      <PageHeader
        eyebrow={t(dictionary.nav.insights, locale)}
        title={t(dictionary.insights.title, locale)}
        lede={t(dictionary.insights.lede, locale)}
      />
      <InsightsArchive locale={locale} />
    </>
  );
}

