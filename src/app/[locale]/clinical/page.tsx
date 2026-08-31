import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dictionary, t } from "@/content/dictionary";
import { focusAreas, person, tagline } from "@/content/profile";
import { isLocale, localeHref, type Locale } from "@/lib/i18n";
import { ArrowRightIcon, InfoIcon } from "@/components/icons";
import { FocusGrid } from "@/components/focus-grid";
import { PageHeader } from "@/components/page-header";
import { Portrait } from "@/components/portrait";
import { Reveal } from "@/components/reveal";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return {
    title: t(dictionary.clinical.title, locale),
    description: t(dictionary.clinical.lede, locale),
    alternates: { canonical: `/${locale}/clinical` },
  };
}

export default async function ClinicalPage({
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
        eyebrow={t(dictionary.nav.clinical, locale)}
        title={t(dictionary.clinical.title, locale)}
        lede={t(dictionary.clinical.lede, locale)}
      />

      <section className="pt-14 sm:pt-16">
        <div className="container-page">
          <Reveal>
            <div className="flex max-w-xl items-center gap-5 rounded-card border border-line bg-surface p-5 shadow-soft sm:p-6">
              <Portrait
                alt={person.displayName}
                locale={locale}
                variant="badge"
              />
              <div>
                <p className="font-display text-xl text-ink sm:text-2xl">
                  {person.displayName}
                </p>
                <p className="mt-1 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-accent">
                  {t(dictionary.home.heroBadge, locale)}
                </p>
                <p className="mt-1.5 font-display text-sm italic text-muted">
                  {t(tagline, locale)}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <FocusGrid items={focusAreas} locale={locale} />
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col gap-6 rounded-card border border-accent/25 bg-accent-soft p-8 sm:flex-row sm:p-10">
              <InfoIcon width={22} height={22} className="mt-1 shrink-0 text-accent" />
              <div>
                <h2 className="font-display text-xl text-ink sm:text-2xl">
                  {t(dictionary.clinical.noteTitle, locale)}
                </h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                  {t(dictionary.clinical.note, locale)}
                </p>
                <Link
                  href={localeHref(locale, "/contact")}
                  className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-ink transition-colors hover:text-clay"
                >
                  {t(dictionary.nav.contact, locale)}
                  <ArrowRightIcon
                    width={14}
                    height={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

