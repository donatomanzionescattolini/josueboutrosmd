import { Check } from "lucide-react";
import { useLang } from "../context/LangContext";
import { Reveal, Eyebrow } from "../components/Reveal";
import { useSEO } from "../hooks/useSEO";
import { IMAGES } from "../data/content";

export default function About() {
  const { t } = useLang();
  useSEO(t.seo.about.title, t.seo.about.desc);

  return (
    <div className="pt-36 sm:pt-44" data-testid="about-page">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>{t.about.eyebrow}</Eyebrow>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-ink leading-[1.08] max-w-3xl">
            {t.about.title}
          </h1>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-12 gap-14">
          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl border border-sage/30 -translate-x-3 translate-y-3 pointer-events-none" />
              <div className="relative overflow-hidden rounded-3xl aspect-[4/5]">
                <img src={IMAGES.about} alt="Josué Boutros, MD" data-testid="about-portrait" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent" />
              </div>
              <div className="mt-6 rounded-2xl border border-linew bg-surface p-6" data-testid="about-credentials-card">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtlew mb-4">{t.about.credTitle}</p>
                <ul className="space-y-3">
                  {t.about.creds.map((c) => (
                    <li key={c} className="flex gap-2.5 text-sm text-mutedw">
                      <Check size={14} className="text-sage mt-0.5 shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <p className="text-lg sm:text-xl leading-relaxed text-ink drop-cap">{t.about.bio1}</p>
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-mutedw">{t.about.bio2}</p>
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-mutedw">{t.about.bio3}</p>
            </Reveal>
            <blockquote className="mt-12 border-l-2 border-terra pl-6" data-testid="about-pull-quote">
              <p className="font-serif italic text-2xl sm:text-3xl text-ink leading-snug">"{t.hero.tagline}"</p>
            </blockquote>
          </div>
        </div>

        <div className="mt-28">
          <Reveal>
            <Eyebrow>{t.about.timelineTitle}</Eyebrow>
          </Reveal>
          <div className="mt-8 border-t border-linew">
            {t.about.timeline.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="grid sm:grid-cols-12 gap-3 sm:gap-8 py-8 border-b border-linew" data-testid={`timeline-item-${i}`}>
                  <p className="sm:col-span-3 font-mono text-[11px] uppercase tracking-[0.2em] text-terra pt-1.5">{item.year}</p>
                  <h3 className="sm:col-span-3 font-serif text-xl sm:text-2xl font-medium text-ink">{item.title}</h3>
                  <p className="sm:col-span-6 text-sm sm:text-base leading-relaxed text-mutedw">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
