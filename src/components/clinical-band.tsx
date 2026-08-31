import Link from "next/link";
import { dictionary, t } from "@/content/dictionary";
import { focusAreas, researchArticleCount, residency } from "@/content/profile";
import { localeHref, type Locale } from "@/lib/i18n";
import { currentPgy } from "@/lib/utils";
import { ArrowRightIcon } from "./icons";
import { Reveal } from "./reveal";

export function ClinicalBand({ locale }: { locale: Locale }) {
  const d = dictionary.home;
  const pgy = currentPgy(residency.startYear, residency.endYear);

  const stats: Array<{ value: string; label: string }> = [
    { value: String(researchArticleCount), label: t(d.statArticles, locale) },
    { value: "CR", label: t(d.statRole, locale) },
    ...(pgy !== null ? [{ value: `PGY-${pgy}`, label: t(d.statPgy, locale) }] : []),
    { value: "EN·ES", label: t(d.statLanguages, locale) },
  ];

  return (
    <section className="mt-16 bg-ink py-24 text-paper sm:py-32">
      <div className="container-page">
        <Reveal>
          <p className="font-medium text-[0.75rem] uppercase tracking-[0.16em] text-clay">
            {t(d.clinicalEyebrow, locale)}
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
            {t(d.clinicalTitle, locale)}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px bg-paper/15 sm:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06} className="bg-ink p-7 sm:p-8">
              <span className="font-display text-xl italic text-clay">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl font-medium sm:text-2xl">
                {t(item.title, locale)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/60">
                {t(item.body, locale)}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <Link
            href={localeHref(locale, "/clinical")}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-paper transition-colors hover:text-clay"
          >
            {t(d.clinicalLink, locale)}
            <ArrowRightIcon
              width={15}
              height={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>

        <div className="mt-20 grid grid-cols-2 gap-10 border-t border-paper/15 pt-12 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <p className="font-display text-4xl font-medium text-clay sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-paper/60">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

