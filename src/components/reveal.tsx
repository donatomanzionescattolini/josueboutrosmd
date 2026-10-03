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
  /** Which edge the panel is creased on. */
  hinge?: "left" | "right";
};

/**
 * Pamphlet effect: each panel is hinged on a vertical crease. It starts folded
 * away (rotated about its crease and shaded), opens flat as it nears the centre
 * of the viewport, gently zooms in while it is the focused panel, then folds
 * back as it leaves. Layout size is untouched — only the transform changes.
 * Honours `prefers-reduced-motion` by rendering the final state immediately.
 */
export function Reveal({
  children,
  delay: _delay,
  y = 18,
  className,
  as = "div",
  hinge = "left",
}: RevealProps) {
  void _delay;
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 });
  const dir = hinge === "left" ? 1 : -1;
  const rotateY = useTransform(progress, [0, 0.3, 0.7, 1], [dir * -62, 0, 0, dir * 28]);
  const scale = useTransform(progress, [0, 0.3, 0.5, 0.7, 1], [1, 1.02, 1.05, 1.02, 1]);
  const opacity = useTransform(progress, [0, 0.18, 0.82, 1], [0, 1, 1, 0.35]);
  const brightness = useTransform(progress, [0, 0.3, 0.7, 1], [0.72, 1, 1, 0.88]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);
  const lift = useTransform(progress, [0, 0.3], [y * 2, 0]);

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      style={{
        opacity,
        scale,
        rotateY,
        y: lift,
        filter,
        transformPerspective: 1400,
        transformOrigin: hinge === "left" ? "0% 50%" : "100% 50%",
      }}
    >
      {children}
    </MotionTag>
  );
}
