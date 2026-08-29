import Link from "next/link";
import { dictionary, t } from "@/content/dictionary";
import { DEFAULT_LOCALE, localeHref } from "@/lib/i18n";
import { ArrowRightIcon } from "@/components/icons";
import { Monogram } from "@/components/monogram";

/**
 * Rendered inside the locale layout. `notFound()` throws before the locale
 * param can be trusted, so this page uses the default language.
 */
export default function NotFound() {
  const locale = DEFAULT_LOCALE;

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <Monogram size={44} className="text-accent opacity-60" />
      <p className="eyebrow mt-8">404</p>
      <h1 className="type-heading mt-4 text-ink">
        {t(dictionary.notFound.title, locale)}
      </h1>
      <p className="type-lede mt-5 max-w-md">
        {t(dictionary.notFound.body, locale)}
      </p>
      <Link
        href={localeHref(locale)}
        className="group mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
      >
        {t(dictionary.actions.backHome, locale)}
        <ArrowRightIcon
          width={16}
          height={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}
