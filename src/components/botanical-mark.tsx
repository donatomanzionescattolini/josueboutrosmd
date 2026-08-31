import type { SVGProps } from "react";

/**
 * A quiet, hand-drawn botanical line mark — the one piece of purely
 * decorative "abstract art" carried over from the earlier single-page
 * design (the two-sidebar Vercel layout the user asked to revive).
 * Used sparingly as a corner accent in the side navigation and CV rail
 * rather than as a full illustrated scene, so it reads as a considered detail
 * rather than clip-art.
 */
export function BotanicalMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 140 180"
      fill="none"
      {...props}
    >
      <path
        d="M72 174C67 128 72 76 96 15"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M75 132C48 121 30 104 24 81C48 84 67 96 76 116"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M72 111C90 92 109 75 122 52C96 58 78 73 70 94"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M70 91C48 78 37 60 36 39C58 47 71 61 72 79"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M83 63C91 46 101 35 113 28C111 47 102 59 86 70"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
