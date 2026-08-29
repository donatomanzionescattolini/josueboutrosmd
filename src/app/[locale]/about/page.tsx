import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dictionary, t } from "@/content/dictionary";
import {
  bio,
  education,
  person,
  principles,
  residency,
  shortBio,
  training,
} from "@/content/profile";
import { isLocale, type Locale } from "@/lib/i18n";
import { currentPgy } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { Portrait } from "@/components/portrait";
import { Principles } from "@/components/principles";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { Timeline } from "@/components/timeline";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return {
    title: t(dictionary.about.title, locale),
    description: t(shortBio, locale),
    alternates: { canonical: `/${locale}/about` },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const pgy = currentPgy(residency.startYear, residency.endYear);

  const facts = [
    {
      label: t(dictionary.about.programHeading, locale),
      value: `${t(residency.program, locale)}${pgy !== null ? ` · PGY-${pgy}` : ""}`,
      detail: `${residency.hospital} · ${residency.affiliation}`,
    },
    {
      label: t(dictionary.about.locationHeading, locale),
      value: t(person.location, locale),
    },
    {
      label: t(dictionary.about.languagesHeading, locale),
      value: person.languages.map((l) => t(l, locale)).join(" · "),
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={t(person.specialty, locale)}
        title={t(dictionary.about.title, locale)}
        lede={t(dictionary.about.lede, locale)}
      />

      <section className="pb-20 sm:pb-28">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[1fr_22rem] lg:gap-20">
            <div className="order-2 lg:order-1">
              <Reveal>
                <div className="space-y-6">
                  {bio.map((paragraph, i) => (
                    <p key={i} className="type-body max-w-2xl">
                      {t(paragraph, locale)}
                    </p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <dl className="mt-14 grid gap-8 border-t border-line pt-10 sm:grid-cols-3">
                  {facts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                        {fact.label}
                      </dt>
                      <dd className="mt-2.5 text-[0.9375rem] leading-snug text-ink">
                        {fact.value}
                      </dd>
                      {fact.detail && (
                        <dd className="mt-1 text-sm text-muted">{fact.detail}</dd>
                      )}
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <div className="order-1 lg:order-2">
              <Reveal y={20}>
                <Portrait
                  alt={`${person.displayName}, ${t(person.role, locale)}`}
                  locale={locale}
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow={t(dictionary.home.principlesHeading, locale)}
        heading={t(dictionary.home.principlesLede, locale)}
        divider
      >
        <Principles items={principles} locale={locale} />
      </Section>

      <Section
        eyebrow={t(dictionary.home.trainingHeading, locale)}
        heading={t(dictionary.cv.training, locale)}
        divider
      >
        <Timeline entries={[...training, ...education]} locale={locale} />
      </Section>
    </>
  );
}
