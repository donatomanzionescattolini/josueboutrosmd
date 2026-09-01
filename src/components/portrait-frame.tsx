"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { person, residency } from "@/content/profile";
import type { Locale } from "@/lib/i18n";
import { cn, currentPgy } from "@/lib/utils";
import { Monogram } from "./monogram";
import { t } from "@/content/dictionary";

type Variant = "hero" | "badge";

/**
 * The signature image treatment of the site: an arched "window" frame with a
 * gentle parallax drift on the photograph as the page scrolls, plus an offset
 * hairline echo behind it. Used at full size in the home hero and on /about,
 * and as a small circular badge on the clinical page.
 *
 * Falls back to a designed plate (no photo) so the site never ships a broken
 * image — drop a file at `public/portrait.*` and this component picks it up
 * automatically via the server-side lookup in `portrait.tsx`.
 */
export function PortraitFrame({
  src,
  alt,
  locale,
  variant = "hero",
  tagline,
  className,
  frameClassName,
}: {
  src: string | null;
  alt: string;
  locale: Locale;
  variant?: Variant;
  /** Small caption card overlapping the bottom-left corner (hero only). */
  tagline?: string;
  className?: string;
  frameClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallax = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const imgY = reduceMotion ? "0%" : parallax;

  if (variant === "badge") {
    return (
      <div className="relative size-20 shrink-0 overflow-hidden rounded-t-full rounded-b-2xl border border-accent/25 sm:size-24">
        {src ? (
          <Image src={src} alt={alt} fill sizes="96px" className="object-cover object-top" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-accent-soft">
            <Monogram size={28} className="text-accent" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Offset arch echo — gives the plate depth without a drop shadow. */}
      <div
        aria-hidden
        className="absolute -inset-3 hidden rounded-t-[9rem] rounded-b-2xl border border-accent/25 translate-x-3 translate-y-3 pointer-events-none sm:block"
      />

      <div className={cn("relative aspect-[3/4] overflow-hidden rounded-t-[9rem] rounded-b-2xl border border-line bg-surface-2", frameClassName)}>
        {src ? (
          <>
            <motion.div style={{ y: imgY }} className="absolute inset-0 scale-[1.04]">
              <Image
                src={src}
                alt={alt}
                fill
                priority
                sizes="(max-width: 1024px) 88vw, 34vw"
                className="object-cover object-top"
              />
            </motion.div>
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-ink/35 via-transparent to-transparent"
            />
          </>
        ) : (
          <PortraitPlate locale={locale} />
        )}
      </div>

      {src && tagline && (
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -bottom-5 -left-3 max-w-[12.5rem] rounded-2xl border border-line bg-surface/90 px-5 py-4 shadow-lift backdrop-blur-md sm:-left-6"
        >
          <p className="font-display text-[0.625rem] uppercase tracking-[0.18em] text-muted">
            {person.displayName}
          </p>
          <p className="mt-1 font-display text-base italic leading-snug text-ink">
            {tagline}
          </p>
        </motion.div>
      )}
    </div>
  );
}

/**
 * The designed stand-in shown until a photograph is added. A finished piece
 * of art direction rather than a grey box, so the site launches complete.
 */
function PortraitPlate({ locale }: { locale: Locale }) {
  const pgy = currentPgy(residency.startYear, residency.endYear);

  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-linear-to-br from-accent-soft via-surface-2 to-clay-soft p-8">
      <svg
        aria-hidden
        viewBox="0 0 400 500"
        className="pointer-events-none absolute inset-0 h-full w-full text-accent"
        preserveAspectRatio="xMidYMid slice"
      >
        {[70, 120, 170, 220, 270].map((r, i) => (
          <circle
            key={r}
            cx="320"
            cy="410"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity={0.38 - i * 0.055}
          />
        ))}
      </svg>

      <div className="relative">
        <Monogram size={56} className="text-accent" />
      </div>

      <div className="relative">
        <p className="font-display text-4xl leading-[1.08] tracking-tight text-ink sm:text-[2.75rem]">
          {t(person.specialty, locale)}
        </p>
        <p className="mt-4 max-w-[24ch] text-sm leading-relaxed text-muted">
          {t(residency.program, locale)}
          {pgy !== null && (
            <span className="whitespace-nowrap text-accent"> · PGY-{pgy}</span>
          )}
          <br />
          {residency.hospital}
          <br />
          {residency.location}
        </p>
      </div>
    </div>
  );
}

