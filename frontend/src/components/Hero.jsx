import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useLang } from "../context/LangContext";
import { IMAGES } from "../data/content";

const lineAnim = (i) => ({
  initial: { y: "115%" },
  animate: { y: "0%" },
  transition: { duration: 1.1, delay: 0.25 + i * 0.14, ease: [0.16, 1, 0.3, 1] },
});

export function Hero() {
  const { t } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-36 sm:pt-44 pb-16 sm:pb-24" data-testid="hero-section">
      <div className="spotlight absolute inset-0 pointer-events-none" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 relative">
        <motion.div style={{ opacity: fade }} className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-sage/40 bg-sage/10 px-4 py-1.5 mb-8"
              data-testid="hero-status-badge"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-sage">{t.hero.badge}</span>
            </motion.div>
            <h1
              data-testid="hero-headline-text"
              className="font-serif font-medium tracking-tight text-ink text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl"
            >
              {t.hero.lines.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-1">
                  <motion.span className="block" {...lineAnim(i)}>
                    {i === 1 ? <em className="text-terra not-italic font-serif italic">{line}</em> : line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85 }}
              className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-mutedw"
            >
              {t.hero.sub}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.0 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/insights"
                data-testid="hero-cta-explore-button"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-cream hover:bg-terra transition-colors duration-300"
              >
                {t.hero.ctaPrimary}
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                data-testid="hero-cta-contact-button"
                className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-3.5 text-sm font-semibold text-ink hover:border-terra hover:text-terra transition-colors duration-300"
              >
                {t.hero.ctaSecondary}
              </Link>
            </motion.div>
          </div>
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="absolute -inset-3 rounded-t-[10rem] rounded-b-3xl border border-terra/25 translate-x-4 translate-y-4 pointer-events-none" />
              <div className="relative overflow-hidden rounded-t-[10rem] rounded-b-3xl aspect-[4/5] bg-cardw">
                <motion.img
                  style={{ y: imgY, scale: 1.15 }}
                  src={IMAGES.hero}
                  alt="Josué Boutros, MD — family physician"
                  data-testid="hero-portrait"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute -bottom-5 -left-4 sm:-left-8 rounded-2xl border border-linew bg-surface/90 backdrop-blur-md px-5 py-4 shadow-[0_16px_40px_rgb(0,0,0,0.10)]"
                data-testid="hero-tagline-card"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtlew mb-1">Josué Boutros, MD</p>
                <p className="font-serif italic text-base sm:text-lg text-ink">{t.hero.tagline}</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-20 hidden sm:flex items-center gap-3 text-subtlew"
        >
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}>
            <ArrowDown size={14} />
          </motion.span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">{t.hero.scroll}</span>
          <span className="h-px flex-1 bg-linew" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">25.86° N, 80.28° W</span>
        </motion.div>
      </div>
    </section>
  );
}
