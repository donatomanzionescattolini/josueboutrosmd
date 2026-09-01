"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { dictionary, t } from "@/content/dictionary";
import { person } from "@/content/profile";
import { localeHref, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { CloseIcon, MenuIcon } from "./icons";
import { LanguageToggle } from "./language-toggle";
import { Monogram } from "./monogram";
import { SchemePicker } from "./scheme-picker";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { key: "about", path: "/about" },
  { key: "clinical", path: "/clinical" },
  { key: "insights", path: "/insights" },
  { key: "research", path: "/research" },
  { key: "media", path: "/media" },
] as const;

/**
 * Primary site chrome. On large screens this renders as a persistent left
 * navigation rail — logo, vertical link list, language/theme toggles — that
 * stays fixed alongside the page as you scroll, paired with `CvRail` on the
 * opposite edge (the "sidenav left, CV right" shell of the earlier
 * single-page design). Below `lg`, where a fixed rail has no room, it
 * collapses to the familiar sticky top bar with a dropdown menu.
 */
export function SideNav({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const items = [...NAV, { key: "contact", path: "/contact" } as const];

  return (
    <>
      {/* Desktop: persistent left navigation rail. */}
      <aside
        data-print="hide"
        data-global-chrome
        aria-label="Primary"
        className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col overflow-y-auto border-r border-line bg-paper/95 px-7 py-8 backdrop-blur-xl lg:flex"
      >
        <Link
          href={localeHref(locale)}
          className="group flex items-center gap-2.5 text-ink"
          aria-label={person.displayName}
        >
          <Monogram
            size={30}
            className="text-accent transition-transform duration-500 group-hover:rotate-6"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-[0.9375rem] tracking-tight">
              {person.displayName}
            </span>
            <span className="text-[0.625rem] uppercase tracking-[0.14em] text-muted">
              {t(person.specialty, locale)}
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="mt-10 flex flex-col gap-1">
          {items.map((item) => {
            const href = localeHref(locale, item.path);
            const active = pathname === href;
            return (
              <Link
                key={item.key}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-card px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent-soft text-accent"
                    : "text-muted hover:bg-surface-2 hover:text-ink",
                )}
              >
                {t(dictionary.nav[item.key], locale)}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex items-center gap-2 border-t border-line pt-6">
          <LanguageToggle
            locale={locale}
            label={t(dictionary.actions.toggleLanguage, locale)}
          />
          <ThemeToggle label={t(dictionary.actions.toggleTheme, locale)} />
          <SchemePicker locale={locale} placement="top" />
        </div>
      </aside>

      {/* Mobile / tablet: sticky top bar with a dropdown menu. */}
      <header data-print="hide" data-global-chrome className="sticky top-0 z-50 lg:hidden">
        <div className="container-page pt-3 sm:pt-4">
          <div className="flex h-16 items-center justify-between gap-4 rounded-pill border border-line bg-paper/85 px-4 shadow-soft backdrop-blur-xl sm:px-5">
            <Link
              href={localeHref(locale)}
              onClick={() => setOpen(false)}
              className="group flex items-center gap-2.5 text-ink"
              aria-label={person.displayName}
            >
              <Monogram
                size={30}
                className="text-accent transition-transform duration-500 group-hover:rotate-6"
              />
              <span className="flex flex-col leading-tight">
                <span className="font-display text-[0.9375rem] tracking-tight">
                  {person.displayName}
                </span>
                <span className="text-[0.625rem] uppercase tracking-[0.14em] text-muted">
                  {t(person.specialty, locale)}
                </span>
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <LanguageToggle
                locale={locale}
                label={t(dictionary.actions.toggleLanguage, locale)}
              />
              <ThemeToggle label={t(dictionary.actions.toggleTheme, locale)} />
              <SchemePicker locale={locale} placement="bottom" />
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={t(
                  open ? dictionary.nav.close : dictionary.nav.menu,
                  locale,
                )}
                className="inline-flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink"
              >
                {open ? (
                  <CloseIcon width={18} height={18} />
                ) : (
                  <MenuIcon width={18} height={18} />
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-nav"
              key="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <nav
                aria-label="Mobile"
                className="container-page mt-3 rounded-card border border-line bg-paper py-4 shadow-lift"
              >
                <ul className="flex flex-col px-2">
                  {items.map((item, i) => {
                    const href = localeHref(locale, item.path);
                    const active = pathname === href;
                    return (
                      <motion.li
                        key={item.key}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                      >
                        <Link
                          href={href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "block border-b border-line px-3 py-4 font-display text-xl transition-colors last:border-b-0",
                            active ? "text-accent" : "text-ink",
                          )}
                        >
                          {t(dictionary.nav[item.key], locale)}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
