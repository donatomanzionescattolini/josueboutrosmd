import { Link } from "react-router-dom";
import { Linkedin, Mail, MapPin } from "lucide-react";
import { useLang } from "../context/LangContext";
import { LINKS } from "../data/content";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-linew/70 mt-24" data-testid="site-footer">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
        <div className="mb-14 rounded-3xl border border-linew bg-cardw p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center gap-6" data-testid="footer-newsletter">
          <div className="flex-1">
            <p className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-ink">{t.newsletter.title}</p>
            <p className="mt-2 text-sm text-mutedw max-w-md">{t.newsletter.sub}</p>
          </div>
          <NewsletterForm />
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <p className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-ink leading-tight">
              Josué Boutros<span className="text-terra">, MD</span>
            </p>
            <p className="mt-3 font-serif italic text-lg text-mutedw">{t.footer.tagline}</p>
            <p className="mt-4 flex items-center gap-2 text-sm text-subtlew">
              <MapPin size={13} className="text-terra" /> {t.contact.location}
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-subtlew mb-4">{t.footer.nav}</p>
            <div className="flex flex-col gap-2.5">
              {[["/about", t.nav.about], ["/clinical", t.nav.clinical], ["/insights", t.nav.insights], ["/research", t.nav.research], ["/media", t.nav.media], ["/contact", t.nav.contact]].map(([to, label]) => (
                <Link key={to} to={to} data-testid={`footer-link-${to.slice(1)}`} className="text-sm text-mutedw hover:text-terra transition-colors duration-300 w-fit">
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-subtlew mb-4">{t.footer.connect}</p>
            <div className="flex flex-col gap-2.5">
              <a href={`mailto:${LINKS.email}`} data-testid="footer-email-link" className="flex items-center gap-2 text-sm text-mutedw hover:text-terra transition-colors duration-300 w-fit">
                <Mail size={13} /> {LINKS.email}
              </a>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" data-testid="footer-linkedin-link" className="flex items-center gap-2 text-sm text-mutedw hover:text-terra transition-colors duration-300 w-fit">
                <Linkedin size={13} /> LinkedIn
              </a>
              <a href={LINKS.doximity} target="_blank" rel="noopener noreferrer" data-testid="footer-doximity-link" className="text-sm text-mutedw hover:text-terra transition-colors duration-300 w-fit">
                Doximity
              </a>
            </div>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-linew/60 flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-xs text-subtlew">© {new Date().getFullYear()} Josué Boutros, MD. {t.footer.rights}</p>
          <p className="text-xs text-subtlew">{t.footer.note}</p>
        </div>
      </div>
    </footer>
  );
}
