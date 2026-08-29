import Link from "next/link";
import { dictionary, t } from "@/content/dictionary";
import { person, residency, tagline } from "@/content/profile";
import { localeHref, type Locale } from "@/lib/i18n";
import { currentPgy } from "@/lib/utils";
import { AnimatedName } from "./animated-name";
import { ArrowRightIcon, GlobeIcon, MapPinIcon, StethoscopeIcon } from "./icons";
import { Portrait } from "./portrait";
import { Reveal } from "./reveal";

export function Hero({ locale }: { locale: Locale }) {
  const pgy = currentPgy(residency.startYear, residency.endYear);
  const languages = person.languages.map((l) => t(l, locale)).join(" · ");

  const meta = [
    { icon: MapPinIcon, value: t(person.location, locale) },
    { icon: StethoscopeIcon, value: residency.hospital },
    { icon: GlobeIcon, value: languages },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Soft radial wash behind the hero. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[38rem] w-[68rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--accent-soft), transparent)",
        }}
      />

      <div className="container-page relative pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <Reveal y={10}>
              <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2">
                <span>{t(dictionary.home.eyebrow, locale)}</span>
                {pgy !== null && (
                  <>
                    <span aria-hidden className="text-line-strong">
                      ·
                    </span>
                    <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[0.6875rem] tracking-[0.12em] text-accent-ink">
                      PGY-{pgy}
                    </span>
                  </>
                )}
              </p>
            </Reveal>

            <h1 className="type-display mt-6 text-ink">
              <span className="sr-only">{person.displayName}</span>
              <AnimatedName
                text={person.fullName}
                suffix={
                  <span className="text-accent">, {person.credential}</span>
                }
              />
            </h1>

            <Reveal delay={0.35} y={14}>
              <p className="type-lede mt-7 max-w-xl">{t(tagline, locale)}</p>
            </Reveal>

            <Reveal delay={0.45} y={14}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href={localeHref(locale, "/contact")}
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
                >
                  {t(dictionary.actions.getInTouch, locale)}
                  <ArrowRightIcon
                    width={16}
                    height={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href={localeHref(locale, "/cv")}
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface-2"
                >
                  {t(dictionary.actions.viewCv, locale)}
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.55} y={14}>
              <ul className="mt-12 flex flex-col gap-3 border-t border-line pt-8 text-sm text-muted sm:flex-row sm:flex-wrap sm:gap-x-8">
                {meta.map(({ icon: Icon, value }) => (
                  <li key={value} className="flex items-center gap-2.5">
                    <Icon width={17} height={17} className="text-accent" />
                    {value}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.25} y={24}>
            <Portrait
              alt={`${person.displayName}, ${t(person.role, locale)}`}
              locale={locale}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
