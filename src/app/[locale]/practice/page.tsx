import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dictionary, t } from "@/content/dictionary";
import { focusAreas, principles } from "@/content/profile";
import { isLocale, type Locale } from "@/lib/i18n";
import { FocusGrid } from "@/components/focus-grid";
import { PageHeader } from "@/components/page-header";
import { Principles } from "@/components/principles";
import { Section } from "@/components/section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return {
    title: t(dictionary.practice.title, locale),
    description: t(dictionary.practice.lede, locale),
    alternates: { canonical: `/${locale}/practice` },
  };
}

export default async function PracticePage({
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
        eyebrow={t(dictionary.nav.practice, locale)}
        title={t(dictionary.practice.title, locale)}
        lede={t(dictionary.practice.lede, locale)}
      />

      <section className="pb-20 sm:pb-28">
        <div className="container-page">
          <FocusGrid items={focusAreas} locale={locale} />
        </div>
      </section>

      <Section
        eyebrow={t(dictionary.home.principlesHeading, locale)}
        heading={t(dictionary.home.principlesLede, locale)}
        divider
      >
        <Principles items={principles} locale={locale} />
      </Section>
    </>
  );
}
