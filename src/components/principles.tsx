import { t } from "@/content/dictionary";
import type { Principle } from "@/content/profile";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "./reveal";

export function Principles({
  items,
  locale,
}: {
  items: Principle[];
  locale: Locale;
}) {
  return (
    <ol className="grid gap-x-14 gap-y-12 sm:grid-cols-2">
      {items.map((item, i) => (
        <Reveal as="li" key={item.id} delay={(i % 2) * 0.08}>
          <div className="flex items-baseline gap-4">
            <span
              aria-hidden
              className="font-display text-2xl text-accent/70"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-2xl text-ink">
              {t(item.title, locale)}
            </h3>
          </div>
          <p className="type-body mt-4 pl-[3.25rem]">{t(item.body, locale)}</p>
        </Reveal>
      ))}
    </ol>
  );
}
