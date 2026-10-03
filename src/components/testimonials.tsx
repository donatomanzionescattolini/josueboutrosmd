import { t } from "@/content/dictionary";
import type { Locale, Testimonial } from "@/content/profile";
import { Reveal } from "./reveal";

export function Testimonials({
  items,
  locale,
}: {
  items: Testimonial[];
  locale: Locale;
}) {
  if (items.length === 0) return null;
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {items.map((item, i) => (
        <Reveal key={item.id} delay={i * 0.1}>
          <figure className="h-full rounded-card border border-line bg-surface p-8">
            <blockquote className="text-base leading-relaxed text-ink-soft sm:text-lg">
              “{t(item.quote, locale)}”
            </blockquote>
            <figcaption className="mt-6 text-xs uppercase tracking-[0.14em] text-muted">
              {t(item.author, locale)}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
