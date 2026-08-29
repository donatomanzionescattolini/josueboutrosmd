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
  { key: "practice", path: "/practice" },
  { key: "cv", path: "/cv" },
  { key: "contact", path: "/contact" },
] as const;

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      data-print="hide"
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-line bg-paper/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="container-page">
        <div className="flex h-18 items-center justify-between gap-4 py-4">
          <Link
            href={localeHref(locale)}
            onClick={() => setOpen(false)}
            className="group flex items-center gap-3 text-ink"
            aria-label={person.displayName}
          >
            <Monogram
              size={34}
              className="text-accent transition-transform duration-500 group-hover:rotate-6"
            />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-[1.0625rem] tracking-tight">
                {person.displayName}
              </span>
              <span className="text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                {t(person.specialty, locale)}
              </span>
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 lg:flex"
          >
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
            className="overflow-hidden border-t border-line bg-paper lg:hidden"
          >
            <nav aria-label="Mobile" className="container-page py-6">
              <ul className="flex flex-col">
                {NAV.map((item, i) => {
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
                          "block border-b border-line py-4 font-display text-2xl transition-colors",
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
  );
}
