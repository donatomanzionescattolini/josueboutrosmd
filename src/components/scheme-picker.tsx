"use client";

import { useEffect, useRef, useState } from "react";
import { dictionary, t } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { PaletteIcon } from "./icons";

export const SCHEME_IDS = [
  "warm",
  "monochromatic",
  "analogous",
  "complementary",
  "split",
  "triadic",
  "tetradic",
] as const;

export type SchemeId = (typeof SCHEME_IDS)[number];

const SWATCHES: Record<SchemeId, [string, string, string]> = {
  warm: ["#14201d", "#0f5f55", "#a85a34"],
  monochromatic: ["#16302c", "#146b61", "#4fa99d"],
  analogous: ["#14201d", "#185d6b", "#5b7893"],
  complementary: ["#14201d", "#0f5f55", "#b54b63"],
  split: ["#14201d", "#a85a34", "#844b6f"],
  triadic: ["#14201d", "#b7a13b", "#8a5ca2"],
  tetradic: ["#14201d", "#6551a8", "#c04c5f"],
};

function isSchemeId(value: string | undefined): value is SchemeId {
  return Boolean(value && SCHEME_IDS.includes(value as SchemeId));
}

/** A small, persistent color-theory picker built from the supplied catalogue. */
export function SchemePicker({ locale, placement = "top" }: { locale: Locale; placement?: "top" | "bottom" }) {
  const d = dictionary.schemes;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SchemeId>("analogous");
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = document.documentElement.dataset.scheme;
    if (isSchemeId(current)) queueMicrotask(() => setActive(current));
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  function chooseScheme(scheme: SchemeId) {
    const root = document.documentElement;
    root.setAttribute("data-scheme", scheme);
    setActive(scheme);
    setOpen(false);
    try {
      window.localStorage.setItem("color-scheme", scheme);
    } catch {
      // The visual choice still applies for this page if storage is unavailable.
    }
  }

  return (
    <div className={`scheme-picker scheme-picker-${placement}`} ref={pickerRef}>
      <button
        type="button"
        className="scheme-picker-trigger"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t(d.label, locale)}
        title={t(d.label, locale)}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="scheme-picker-swatch" aria-hidden>
          {SWATCHES[active].map((color) => <i key={color} style={{ backgroundColor: color }} />)}
        </span>
        <span className="sr-only">{t(d.active, locale)}: {t(d.names[active], locale)}</span>
        <PaletteIcon width={16} height={16} aria-hidden />
      </button>

      {open && (
        <div className="scheme-picker-popover" role="listbox" aria-label={t(d.choose, locale)}>
          <div className="scheme-picker-heading">
            <span>{t(d.choose, locale)}</span>
            <small>{t(d.helper, locale)}</small>
          </div>
          {SCHEME_IDS.map((scheme) => (
            <button
              type="button"
              role="option"
              aria-selected={active === scheme}
              className={`scheme-picker-option${active === scheme ? " is-active" : ""}`}
              key={scheme}
              onClick={() => chooseScheme(scheme)}
            >
              <span className="scheme-picker-option-swatches" aria-hidden>
                {SWATCHES[scheme].map((color) => <i key={color} style={{ backgroundColor: color }} />)}
              </span>
              <span className="scheme-picker-option-copy">
                <strong>{t(d.names[scheme], locale)}</strong>
                <small>{t(d.descriptions[scheme], locale)}</small>
              </span>
              {active === scheme && <span className="scheme-picker-check" aria-hidden>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
