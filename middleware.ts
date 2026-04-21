import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

const locales = ["en", "sr"];
const defaultLocale = "sr";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // skip za Next internals i statiku
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // ako već ima locale → pusti dalje
  const hasLocale = locales.some(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  // redirect na default locale
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;

  return NextResponse.redirect(url);
}

/* 👇 OVO IDE NA KRAJ FAJLA */
export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};