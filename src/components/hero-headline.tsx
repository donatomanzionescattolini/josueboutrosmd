
"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The masked, line-by-line headline reveal. Isolated in its own client
 * component (it needs `useReducedMotion` and per-line motion transforms) so
 * the hero section around it — which renders the server-only `Portrait` —
 * can stay a server component.
 */
export function HeroHeadline({
  lines,
  emphasisIndex = 1,
}: {
  lines: string[];
  /** Index of the line rendered in the accent italic treatment. */
  emphasisIndex?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <h1 className="type-display mt-7 text-ink">
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-1">
          <motion.span
            className="block"
            initial={reduceMotion ? undefined : { y: "115%" }}
            animate={reduceMotion ? undefined : { y: "0%" }}
            transition={{
              duration: 1,
              delay: 0.2 + i * 0.14,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {i === emphasisIndex ? (
              <em className="font-display text-clay italic">{line}</em>
            ) : (
              line
            )}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

