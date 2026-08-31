import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import { useLang } from "../context/LangContext";

const links = [
  { to: "/about", key: "about", testid: "nav-about-link" },
  { to: "/clinical", key: "clinical", testid: "nav-clinical-link" },
  { to: "/insights", key: "insights", testid: "nav-insights-link" },
  { to: "/research", key: "research", testid: "nav-research-link" },
  { to: "/media", key: "media", testid: "nav-media-link" },
];

export function Nav() {
  const { t, lang, setLang, dark, setDark } = useLang();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mt-4 flex items-center justify-between rounded-full border border-linew/70 bg-cream/80 backdrop-blur-xl px-5 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
          <Link to="/" data-testid="nav-logo-link" className="font-serif text-lg sm:text-xl font-medium tracking-tight text-ink" onClick={() => setOpen(false)}>
            Josué Boutros<span className="text-terra">, MD</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <NavLink
                key={l.key}
                to={l.to}
                data-testid={l.testid}
                className={({ isActive }) =>
                  `text-[13px] font-medium tracking-wide transition-colors duration-300 ${isActive ? "text-terra" : "text-mutedw hover:text-ink"}`
                }
              >
                {t.nav[l.key]}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              data-testid="language-switcher-toggle"
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="flex items-center gap-1.5 rounded-full border border-linew px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-mutedw hover:text-terra hover:border-terra/40 transition-colors duration-300"
              aria-label="Switch language"
            >
              <Globe size={12} />
              {lang === "en" ? "ES" : "EN"}
            </button>
            <button
              data-testid="theme-mode-toggle"
              onClick={() => setDark(!dark)}
              className="rounded-full border border-linew p-2 text-mutedw hover:text-terra hover:border-terra/40 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={13} /> : <Moon size={13} />}
            </button>
            <button
              data-testid="nav-contact-button"
              onClick={() => navigate("/contact")}
              className="hidden md:block rounded-full bg-ink px-4 py-2 text-[13px] font-semibold text-cream hover:bg-terra transition-colors duration-300"
            >
              {t.nav.contact}
            </button>
            <button
              data-testid="mobile-menu-toggle"
              onClick={() => setOpen(!open)}
              className="md:hidden rounded-full border border-linew p-2 text-ink"
              aria-label="Menu"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mx-auto max-w-6xl px-5"
            data-testid="mobile-menu"
          >
            <div className="mt-2 rounded-2xl border border-linew bg-cream/95 backdrop-blur-xl p-5 flex flex-col gap-4">
              {links.map((l) => (
                <NavLink
                  key={l.key}
                  to={l.to}
                  data-testid={`mobile-${l.testid}`}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `font-serif text-xl ${isActive ? "text-terra" : "text-ink"}`
                  }
                >
                  {t.nav[l.key]}
                </NavLink>
              ))}
              <NavLink to="/contact" data-testid="mobile-nav-contact-button" onClick={() => setOpen(false)} className="font-serif text-xl text-terra">
                {t.nav.contact}
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
