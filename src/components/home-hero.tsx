import Link from "next/link";
import { dictionary, t } from "@/content/dictionary";
import { person, residency } from "@/content/profile";
import { localeHref, type Locale } from "@/lib/i18n";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  GlobeIcon,
  MapPinIcon,
  StethoscopeIcon,
} from "./icons";
import { HeroHeadline } from "./hero-headline";
import { Portrait } from "./portrait";
import { Reveal } from "./reveal";

/**
 * The homepage hero: a status badge, a masked line-by-line headline reveal,
 * and the arched, parallax portrait with its tagline card. The single most
 * important visual moment on the site.
 *
 * A server component — `Portrait` reads the filesystem at build time to find
 * the photo, so it (and this section) must stay on the server. The pieces
 * that need client-side motion (`HeroHeadline`, `Reveal`) are composed in as
 * children, which is the supported direction for mixing the two.
 */
export function HomeHero({ locale }: { locale: Locale }) {
  const d = dictionary.home;
  const languages = person.languages.map((l) => t(l, locale)).join(" · ");
  const lines = [t(d.heroLine1, locale), t(d.heroLine2, locale), t(d.heroLine3, locale)];

  const meta = [
    { icon: MapPinIcon, value: t(person.location, locale) },
    { icon: StethoscopeIcon, value: residency.hospital },
    { icon: GlobeIcon, value: languages },
  ];

  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[38rem] w-[68rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background: "radial-gradient(closest-side, var(--accent-soft), transparent)",
        }}
      />

      <div className="container-page relative">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal y={10}>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-4 py-1.5">
                <span
                  aria-hidden
                  className="size-1.5 animate-pulse rounded-full bg-accent"
                />
                <span className="font-medium text-[0.625rem] uppercase tracking-[0.2em] text-accent-ink sm:text-[0.6875rem]">
                  {t(d.heroBadge, locale)}
                </span>
              </div>
            </Reveal>

            <HeroHeadline lines={lines} emphasisIndex={1} />

            <Reveal delay={0.85} y={16}>
              <p className="type-lede mt-7 max-w-xl">{t(d.heroSub, locale)}</p>
            </Reveal>

            <Reveal delay={1} y={16}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href={localeHref(locale, "/insights")}
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-accent"
                >
                  {t(d.heroCtaPrimary, locale)}
                  <ArrowRightIcon
                    width={15}
                    height={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href={localeHref(locale, "/contact")}
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-clay hover:text-clay"
                >
                  {t(d.heroCtaSecondary, locale)}
                </Link>
              </div>
            </Reveal>

            <Reveal delay={1.1} y={16}>
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

          <div className="lg:col-span-5">
            <Reveal delay={0.35} y={26}>
              <Portrait
                alt={`${person.displayName}, ${t(person.role, locale)}`}
                locale={locale}
                tagline={t(d.heroTagline, locale)}
              />
            </Reveal>
          </div>
        </div>

        <Reveal delay={1.5}>
          <div className="mt-20 hidden items-center gap-3 text-muted sm:flex">
            <span className="animate-bounce">
              <ArrowDownIcon width={14} height={14} />
            </span>
            <span className="text-[0.625rem] uppercase tracking-[0.3em]">
              {t(d.heroScroll, locale)}
            </span>
            <span aria-hidden className="h-px flex-1 bg-line" />
            <span className="text-[0.625rem] uppercase tracking-[0.3em]">
              25.86° N, 80.28° W
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

