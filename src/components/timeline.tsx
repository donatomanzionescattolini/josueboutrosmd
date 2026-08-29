import { t } from "@/content/dictionary";
import type { TimelineEntry } from "@/content/profile";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "./reveal";

export function Timeline({
  entries,
  locale,
}: {
  entries: TimelineEntry[];
  locale: Locale;
}) {
  if (entries.length === 0) return null;

  return (
    <ol className="relative">
      {entries.map((entry, i) => (
        <Reveal
          as="li"
          key={entry.id}
          delay={i * 0.06}
          className="relative grid gap-2 border-l border-line pb-12 pl-8 last:pb-0 sm:grid-cols-[10rem_1fr] sm:gap-8 sm:pl-10"
        >
          {/* Node on the rail. */}
          <span
            aria-hidden
            className="absolute -left-[5px] top-1.5 size-[9px] rounded-full border-2 border-paper bg-accent"
          />
          <p className="font-display text-sm tracking-wide text-accent sm:pt-0.5">
            {entry.period}
          </p>
          <div>
            <h3 className="font-display text-xl leading-snug text-ink">
              {t(entry.title, locale)}
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              {entry.organization}
              {entry.location && (
                <span className="text-muted"> · {entry.location}</span>
              )}
            </p>
            {entry.detail && (
              <p className="mt-3.5 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
                {t(entry.detail, locale)}
              </p>
            )}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
