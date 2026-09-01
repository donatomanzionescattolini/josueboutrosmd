"use client";

import { MoonIcon, SunIcon } from "./icons";

/**
 * Toggles the `dark` class on <html> and remembers the choice.
 *
 * Deliberately stateless: the current theme lives in the DOM (set before paint
 * by `ThemeScript`), the icons are swapped with a CSS `dark:` variant, and the
 * handler reads the class when clicked. That means no effect, no hydration
 * mismatch, and no flash of the wrong icon.
 */
export function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    try {
      window.localStorage.setItem("theme", next);
    } catch {
      // Storage can be unavailable (private mode, blocked cookies). The toggle
      // still works for this page view, it just will not persist.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"
    >
      <MoonIcon width={18} height={18} className="dark:hidden" />
      <SunIcon width={18} height={18} className="hidden dark:block" />
    </button>
  );
}

/**
 * Runs before paint. Kept as a raw inline string so it executes ahead of the
 * first render rather than being fetched, which is what makes it flash-free.
 */
export function ThemeScript() {
  const script = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var scheme = localStorage.getItem('color-scheme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var schemes = ['warm', 'monochromatic', 'analogous', 'complementary', 'split', 'triadic', 'tetradic'];
    if (schemes.indexOf(scheme) !== -1) {
      document.documentElement.dataset.scheme = scheme;
    }
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();`.trim();

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
