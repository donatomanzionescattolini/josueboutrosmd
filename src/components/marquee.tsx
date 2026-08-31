import { t } from "@/content/dictionary";
import { dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";

/**
 * A slow, drifting ribbon of clinical themes. Purely decorative and duplicated
 * once so the CSS animation can loop seamlessly; hidden from assistive tech.
 */
export function Marquee({ locale }: { locale: Locale }) {
  const items = dictionary.home.marqueeItems.map((item) => t(item, locale));
  const loop = [...items, ...items];

  return (
    <div
      className="group overflow-hidden border-y border-line py-5 select-none"
      aria-hidden
    >
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap group-hover:[animation-play-state:paused]">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-xl italic text-muted/90 sm:text-2xl">
              {item}
            </span>
            <span className="size-1.5 rounded-full bg-clay/70" />
          </span>
        ))}
      </div>
    </div>
  );
}

