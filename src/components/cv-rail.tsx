import Link from "next/link";
import { dictionary, t } from "@/content/dictionary";
import { credentials, person, residency } from "@/content/profile";
import { localeHref, type Locale } from "@/lib/i18n";
import { currentPgy } from "@/lib/utils";
import { BotanicalMark } from "./botanical-mark";
import { CheckIcon, GlobeIcon, StethoscopeIcon } from "./icons";

/**
 * A persistent "at a glance" credentials panel pinned to the right edge of
 * the viewport on wide screens — a compact companion to the left-hand
 * `SideNav`, echoing the two-rail shell (side navigation + CV rail) from the
 * earlier single-page design. Hidden below `xl` since a fixed second rail
 * has no room on narrower viewports; the full story still lives on `/cv`.
 */
export function CvRail({ locale }: { locale: Locale }) {
  const pgy = currentPgy(residency.startYear, residency.endYear);

  return (
    <aside
      data-print="hide"
      aria-label="Curriculum vitae summary"
      className="fixed inset-y-0 right-0 z-30 hidden w-72 flex-col overflow-y-auto border-l border-line bg-surface-2/60 px-7 py-10 xl:flex"
    >
      <p className="eyebrow text-accent">{t(dictionary.sideNav.atAGlance, locale)}</p>

      <div className="mt-6 flex items-start gap-3">
        <StethoscopeIcon width={18} height={18} className="mt-0.5 shrink-0 text-accent" />
        <div className="text-sm leading-relaxed text-ink-soft">
          {t(person.role, locale)}
          {pgy !== null && <span className="text-accent"> · PGY-{pgy}</span>}
          <br />
          <span className="text-muted">{residency.hospital}</span>
        </div>
      </div>

      <div className="mt-5 flex items-start gap-3">
        <GlobeIcon width={18} height={18} className="mt-0.5 shrink-0 text-accent" />
        <p className="text-sm leading-relaxed text-ink-soft">
          {t(dictionary.sideNav.bilingualCare, locale)}
          <br />
          <span className="text-muted">
            {person.languages.map((l) => t(l, locale)).join(" · ")}
          </span>
        </p>
      </div>

      {credentials.length > 0 && (
        <div className="mt-8 border-t border-line pt-6">
          <p className="text-[0.625rem] font-medium uppercase tracking-[0.16em] text-muted">
            {t(dictionary.sideNav.credentialed, locale)}
          </p>
          <ul className="mt-4 space-y-3">
            {credentials.map((item) => (
              <li key={item.id} className="flex items-start gap-2.5 text-sm text-ink-soft">
                <CheckIcon width={14} height={14} className="mt-1 shrink-0 text-accent" />
                <span>{t(item.label, locale)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        href={localeHref(locale, "/cv")}
        className="link-draw mt-8 inline-flex w-max items-center gap-2 border-t border-line pt-6 text-sm font-semibold text-ink hover:text-accent"
      >
        {t(dictionary.sideNav.viewFullCv, locale)}
      </Link>

      <BotanicalMark className="mt-auto h-24 w-auto self-end pt-10 text-accent/25" />
    </aside>
  );
}
