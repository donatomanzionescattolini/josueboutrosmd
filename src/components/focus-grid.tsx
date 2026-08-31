import { t } from "@/content/dictionary";
import type { FocusArea } from "@/content/profile";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "./reveal";

export function FocusGrid({
  items,
  locale,
}: {
  items: FocusArea[];
  locale: Locale;
}) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <Reveal
          as="li"
          key={item.id}
          delay={(i % 3) * 0.08}
          className="card card-interactive group flex flex-col rounded-card p-8"
        >
          <span
            aria-hidden
            className="font-display text-xl italic text-clay/80 transition-colors duration-500 group-hover:text-clay"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-5 font-display text-xl leading-snug text-ink">
            {t(item.title, locale)}
          </h3>
          <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-muted">
            {t(item.body, locale)}
          </p>
        </Reveal>
      ))}
    </ul>
  );
}
