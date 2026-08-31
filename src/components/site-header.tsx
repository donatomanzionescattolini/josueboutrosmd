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
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { key: "about", path: "/about" },
  { key: "clinical", path: "/clinical" },
  { key: "insights", path: "/insights" },
  { key: "research", path: "/research" },
  { key: "media", path: "/media" },
] as const;

export function SiteHeader({ locale }: { locale: Locale }) {
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

  return (
    <header data-print="hide" className="sticky top-0 z-50">
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

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => {
              const href = localeHref(locale, item.path);
              const active = pathname === href;
              return (
                <Link
                  key={item.key}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "link-draw text-sm transition-colors",
                    active ? "text-accent" : "text-muted hover:text-ink",
                  )}
                >
                  {t(dictionary.nav[item.key], locale)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle
              locale={locale}
              label={t(dictionary.actions.toggleLanguage, locale)}
            />
            <ThemeToggle label={t(dictionary.actions.toggleTheme, locale)} />
            <Link
              href={localeHref(locale, "/contact")}
              className="hidden rounded-pill bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-accent lg:block"
            >
              {t(dictionary.nav.contact, locale)}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={t(
                open ? dictionary.nav.close : dictionary.nav.menu,
                locale,
              )}
              className="inline-flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink lg:hidden"
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
            className="overflow-hidden lg:hidden"
          >
            <nav
              aria-label="Mobile"
              className="container-page mt-3 rounded-card border border-line bg-paper py-4 shadow-lift"
            >
              <ul className="flex flex-col px-2">
                {[...NAV, { key: "contact", path: "/contact" } as const].map(
                  (item, i) => {
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
                  },
                )}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
