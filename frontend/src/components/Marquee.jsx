import { useLang } from "../context/LangContext";

export function Marquee() {
  const { t } = useLang();
  const items = [...t.marquee, ...t.marquee];
  return (
    <div className="marquee-paused overflow-hidden border-y border-linew/70 py-5 select-none" data-testid="editorial-marquee" aria-hidden="true">
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-serif italic text-xl sm:text-2xl text-mutedw/90">{item}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-terra/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
