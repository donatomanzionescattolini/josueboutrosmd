import Link from "next/link";
import { notFound } from "next/navigation";
import { dictionary, t } from "@/content/dictionary";
import {
  bio,
  focusAreas,
  person,
  principles,
  residency,
  training,
} from "@/content/profile";
import { isLocale, localeHref, type Locale } from "@/lib/i18n";
import { FocusGrid } from "@/components/focus-grid";
import { Hero } from "@/components/hero";
import { ArrowRightIcon } from "@/components/icons";
import { Principles } from "@/components/principles";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { Timeline } from "@/components/timeline";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const d = dictionary.home;
  const opening = bio[0];

  return (
    <>
      <Hero locale={locale} />

      {/* ── About ─────────────────────────────────────────────────────────── */}
      <Section
        id="about"
        eyebrow={t(d.aboutHeading, locale)}
        heading={t(d.aboutLede, locale)}
        divider
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
          <Reveal>
            {opening && <p className="type-body max-w-2xl">{t(opening, locale)}</p>}
            <Link
              href={localeHref(locale, "/about")}
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent"
            >
              <span className="link-draw">{t(dictionary.actions.readMore, locale)}</span>
              <ArrowRightIcon
                width={16}
                height={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>

          <Reveal delay={0.12}>
            <dl className="grid gap-6 rounded-card border border-line bg-surface p-8 text-sm lg:w-72">
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                  {t(dictionary.about.programHeading, locale)}
                </dt>
                <dd className="mt-2 font-display text-lg leading-snug text-ink">
                  {t(residency.program, locale)}
                </dd>
                <dd className="mt-1 text-muted">{residency.hospital}</dd>
              </div>
              <div className="border-t border-line pt-6">
                <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                  {t(dictionary.about.locationHeading, locale)}
                </dt>
                <dd className="mt-2 text-ink">{t(person.location, locale)}</dd>
              </div>
              <div className="border-t border-line pt-6">
                <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                  {t(dictionary.about.languagesHeading, locale)}
                </dt>
                <dd className="mt-2 text-ink">
                  {person.languages.map((l) => t(l, locale)).join(" · ")}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* ── Clinical focus ────────────────────────────────────────────────── */}
      <Section
        id="focus"
        eyebrow={t(d.focusHeading, locale)}
        heading={t(d.focusLede, locale)}
        lede={t(dictionary.practice.lede, locale)}
        divider
      >
        <FocusGrid items={focusAreas} locale={locale} />
      </Section>

      {/* ── Principles ────────────────────────────────────────────────────── */}
      <Section
        id="principles"
        eyebrow={t(d.principlesHeading, locale)}
        heading={t(d.principlesLede, locale)}
        divider
      >
        <Principles items={principles} locale={locale} />
      </Section>

      {/* ── Training ──────────────────────────────────────────────────────── */}
      <Section
        id="training"
        eyebrow={t(d.trainingHeading, locale)}
        heading={t(dictionary.cv.training, locale)}
        divider
      >
        <Timeline entries={training} locale={locale} />
        <Reveal delay={0.1}>
          <Link
            href={localeHref(locale, "/cv")}
            className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-accent"
          >
            <span className="link-draw">
              {t(dictionary.actions.viewCv, locale)}
            </span>
            <ArrowRightIcon
              width={16}
              height={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </Section>

      {/* ── Contact CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-card border border-line bg-surface px-8 py-16 text-center sm:px-16">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -top-24 h-56 opacity-70 blur-3xl"
                style={{
                  background:
                    "radial-gradient(closest-side, var(--accent-soft), transparent)",
                }}
              />
              <div className="relative">
                <p className="eyebrow">{t(d.contactHeading, locale)}</p>
                <h2 className="type-heading mx-auto mt-5 max-w-2xl text-ink">
                  {t(d.contactLede, locale)}
                </h2>
                <Link
                  href={localeHref(locale, "/contact")}
                  className="group mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
                >
                  {t(dictionary.actions.getInTouch, locale)}
                  <ArrowRightIcon
                    width={16}
                    height={16}
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
