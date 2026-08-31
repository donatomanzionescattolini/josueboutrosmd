"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { dictionary, t } from "@/content/dictionary";
import { manifestoChapters } from "@/content/profile";
import type { Locale } from "@/lib/i18n";
import { PlusIcon } from "./icons";
import { Reveal } from "./reveal";

/**
 * Three expandable numbered chapters — the homepage manifesto. Only one
 * chapter is open at a time; the first is open by default so the section
 * never looks empty on load.
 */
export function Manifesto({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(0);
  const reduceMotion = useReducedMotion();
  const d = dictionary.manifesto;

  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow mb-4">{t(d.eyebrow, locale)}</p>
          <h2 className="type-heading max-w-2xl text-ink">{t(d.title, locale)}</h2>
          <p className="type-lede mt-4 max-w-xl">{t(d.sub, locale)}</p>
        </Reveal>

        <div className="mt-12 border-t border-line">
          {manifestoChapters.map((chapter, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={chapter.id} delay={i * 0.08} as="div">
                <div className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-baseline gap-5 py-7 text-left sm:gap-8 sm:py-9"
                  >
                    <span className="w-10 shrink-0 font-display text-2xl italic text-clay/80 sm:w-12 sm:text-3xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 font-display text-2xl font-medium tracking-tight transition-colors duration-300 sm:text-3xl lg:text-4xl ${
                        isOpen ? "text-clay" : "text-ink group-hover:text-clay"
                      }`}
                    >
                      {t(chapter.title, locale)}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35 }}
                      className="shrink-0 rounded-full border border-line p-2 text-muted transition-colors duration-300 group-hover:border-clay/50 group-hover:text-clay"
                    >
                      <PlusIcon width={15} height={15} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                        animate={reduceMotion ? undefined : { height: "auto", opacity: 1 }}
                        exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-3xl pb-9 pr-4 pl-[3.75rem] text-base leading-relaxed text-muted sm:pl-20 sm:text-lg">
                          {t(chapter.body, locale)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

