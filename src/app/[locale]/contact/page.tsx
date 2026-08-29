import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dictionary, t } from "@/content/dictionary";
import { contact, contactNote, person, residency } from "@/content/profile";
import { isLocale, type Locale } from "@/lib/i18n";
import { ContactForm } from "@/components/contact-form";
import {
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  StethoscopeIcon,
} from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return {
    title: t(dictionary.contact.title, locale),
    description: t(dictionary.contact.lede, locale),
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const d = dictionary.contact;

  const links = [
    { icon: MailIcon, label: contact.email, href: `mailto:${contact.email}` },
    contact.phone
      ? {
          icon: PhoneIcon,
          label: contact.phone,
          href: `tel:${contact.phone.replace(/[^+\d]/g, "")}`,
        }
      : null,
    {
      icon: MapPinIcon,
      label: `${residency.hospital} · ${t(person.location, locale)}`,
      href: null,
    },
  ].filter((item) => item !== null);

  const profiles = [
    contact.linkedin
      ? { icon: LinkedInIcon, label: "LinkedIn", href: contact.linkedin }
      : null,
    contact.doximity
      ? { icon: StethoscopeIcon, label: "Doximity", href: contact.doximity }
      : null,
  ].filter((item) => item !== null);

  return (
    <>
      <PageHeader
        eyebrow={t(dictionary.nav.contact, locale)}
        title={t(d.title, locale)}
        lede={t(d.lede, locale)}
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[1fr_20rem] lg:gap-20">
            <Reveal>
              <ContactForm locale={locale} />
            </Reveal>

            <Reveal delay={0.1}>
              <aside className="space-y-10">
                <div>
                  <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                    {t(d.directHeading, locale)}
                  </h2>
                  <ul className="mt-5 space-y-3.5 text-[0.9375rem]">
                    {links.map(({ icon: Icon, label, href }) => (
                      <li key={label} className="flex items-start gap-3">
                        <Icon
                          width={17}
                          height={17}
                          className="mt-0.5 shrink-0 text-accent"
                        />
                        {href ? (
                          <a
                            href={href}
                            className="link-draw text-ink-soft hover:text-ink"
                          >
                            {label}
                          </a>
                        ) : (
                          <span className="text-muted">{label}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {profiles.length > 0 && (
                  <div className="border-t border-line pt-8">
                    <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                      {t(d.elsewhereHeading, locale)}
                    </h2>
                    <ul className="mt-5 space-y-3.5 text-[0.9375rem]">
                      {profiles.map(({ icon: Icon, label, href }) => (
                        <li key={label} className="flex items-center gap-3">
                          <Icon
                            width={17}
                            height={17}
                            className="shrink-0 text-accent"
                          />
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer me"
                            className="link-draw text-ink-soft hover:text-ink"
                          >
                            {label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <p className="rounded-card border border-line bg-surface-2/70 p-5 text-sm leading-relaxed text-muted">
                  {t(contactNote, locale)}
                </p>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
