"use client";

import { PrinterIcon } from "./icons";

/** Opens the browser print dialog; the CV page has dedicated print styles. */
export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      data-print="hide"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface-2"
    >
      <PrinterIcon width={16} height={16} />
      {label}
    </button>
  );
}
