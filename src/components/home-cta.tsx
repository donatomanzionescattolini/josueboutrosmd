import Link from "next/link";
import { dictionary, t } from "@/content/dictionary";
import { localeHref, type Locale } from "@/lib/i18n";
import { ArrowRightIcon } from "./icons";
import { Reveal } from "./reveal";

export function HomeCta({ locale }: { locale: Locale }) {
  const d = dictionary.home;

  return (
    <section className="py-24 sm:py-36">
      <div className="container-page text-center">
        <Reveal>
          <h2 className="type-heading mx-auto max-w-3xl text-ink">
            {t(d.ctaTitle, locale)}
          </h2>
          <p className="type-lede mx-auto mt-6 max-w-xl">{t(d.ctaSub, locale)}</p>
          <Link
            href={localeHref(locale, "/contact")}
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-hover"
          >
            {t(d.ctaButton, locale)}
            <ArrowRightIcon
              width={15}
              height={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

