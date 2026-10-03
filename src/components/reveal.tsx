"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds of delay — used to stagger siblings. */
  delay?: number;
  /** Travel distance in pixels. */
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
};

/**
 * Unfolds content as it scrolls into view: it starts small and tilted back like a
 * folded panel, then opens and grows to full size by the time it reaches the
 * middle of the viewport.
 * Honours `prefers-reduced-motion` by rendering the final state immediately.
 */
export function Reveal({
  children,
  delay: _delay,
  y = 18,
  className,
  as = "div",
}: RevealProps) {
  void _delay;
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center 65%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  const opacity = useTransform(progress, [0, 0.6], [0, 1]);
  const scale = useTransform(progress, [0, 1], [0.82, 1]);
  const rotateX = useTransform(progress, [0, 1], [38, 0]);
  const lift = useTransform(progress, [0, 1], [y * 2, 0]);

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      style={{ opacity, scale, rotateX, y: lift, transformPerspective: 1200, transformOrigin: "50% 0%" }}
    >
      {children}
    </MotionTag>
  );
}
