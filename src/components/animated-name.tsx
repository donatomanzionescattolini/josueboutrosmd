"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * The signature moment of the home page: the name settles in word by word.
 * The visible text is split into spans, so the accessible name is supplied
 * once on the wrapper and the pieces are hidden from assistive technology.
 */
export function AnimatedName({
  text,
  suffix,
}: {
  text: string;
  /** Rendered inside the final word so it can never wrap onto its own line. */
  suffix?: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (reduceMotion) {
    return (
      <span>
        {text}
        {suffix}
      </span>
    );
  }

  return (
    <span aria-hidden className="inline-block">
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em]">
          <motion.span
            className="inline-block"
            initial={{ y: "108%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.08 + i * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i === words.length - 1 ? suffix : " "}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
