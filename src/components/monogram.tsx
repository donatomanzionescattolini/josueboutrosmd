import type { SVGProps } from "react";

/**
 * The site mark: an interlocked J and B set inside a soft ring. Deliberately
 * not a caduceus or a cross — those read as clip-art on a physician's site.
 */
export function Monogram({
  size = 36,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      focusable="false"
      {...props}
    >
      <circle
        cx="24"
        cy="24"
        r="22.25"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.28"
      />
      <path
        d="M20.4 14.5v13.9c0 3.2-1.9 5.1-4.9 5.1-1.8 0-3.2-.7-4.1-1.9"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M26.9 33.5V14.5h6.2c2.8 0 4.6 1.6 4.6 4.2 0 2-1.1 3.5-2.9 4.05 2.2.45 3.6 2.1 3.6 4.5 0 3.1-2.1 5.05-5.4 5.05h-6.1Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
