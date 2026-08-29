import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "@/content/profile";

/**
 * Every page lives under a locale segment (`/en/...`, `/es/...`). Anything that
 * arrives without one is rewritten into the default locale, so `/cv` still
 * resolves and old or hand-typed links keep working.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip API routes, Next internals, and anything that looks like a file.
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
