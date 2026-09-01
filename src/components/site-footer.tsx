import Link from "next/link";
import { dictionary, t } from "@/content/dictionary";
import { contact, person, residency } from "@/content/profile";
import { localeHref, type Locale } from "@/lib/i18n";
import { LinkedInIcon, MailIcon, StethoscopeIcon } from "./icons";
import { Monogram } from "./monogram";

const NAV = [
  { key: "about", path: "/about" },
  { key: "clinical", path: "/clinical" },
  { key: "insights", path: "/insights" },
  { key: "research", path: "/research" },
  { key: "media", path: "/media" },
  { key: "cv", path: "/cv" },
  { key: "contact", path: "/contact" },
] as const;

export function SiteFooter({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();

  return (
    <footer
      data-print="hide"
      data-global-footer
      className="border-t border-line bg-surface-2/60"
    >
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link
              href={localeHref(locale)}
              className="inline-flex items-center gap-3 text-ink"
            >
              <Monogram size={32} className="text-accent" />
              <span className="font-display text-lg">{person.displayName}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {t(person.role, locale)}
              <br />
              {residency.hospital}
              <br />
              {t(person.location, locale)}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-ink">
              {t(dictionary.nav.menu, locale)}
            </h2>
            <ul className="space-y-2.5">
              {NAV.map((item) => (
                <li key={item.key}>
                  <Link
                    href={localeHref(locale, item.path)}
                    className="link-draw text-sm text-muted hover:text-ink"
                  >
                    {t(dictionary.nav[item.key], locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-ink">
              {t(dictionary.contact.title, locale)}
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="link-draw inline-flex items-center gap-2 text-muted hover:text-ink"
                >
                  <MailIcon width={16} height={16} />
                  {contact.email}
                </a>
              </li>
              {contact.linkedin && (
                <li>
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="link-draw inline-flex items-center gap-2 text-muted hover:text-ink"
                  >
                    <LinkedInIcon width={16} height={16} />
                    LinkedIn
                  </a>
                </li>
              )}
              {contact.doximity && (
                <li>
                  <a
                    href={contact.doximity}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="link-draw inline-flex items-center gap-2 text-muted hover:text-ink"
                  >
                    <StethoscopeIcon width={16} height={16} />
                    Doximity
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-muted">
            {t(dictionary.footer.disclaimer, locale)}{" "}
            <strong className="font-medium text-ink">
              {t(dictionary.footer.emergency, locale)}
            </strong>
          </p>
          <p className="mt-4 text-xs text-muted">
            © {year} {person.displayName}. {t(dictionary.footer.rights, locale)}
          </p>
        </div>
      </div>
    </footer>
  );
}
