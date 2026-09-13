import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LOCALES = ['ar', 'en'] as const;
const DEFAULT_LOCALE = 'ar';

const PUBLIC_FILE = /\.[^/]+$/;

/** كشف اللغة من الكوكيز ثم من ترويسة المتصفح */
function detectLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && LOCALES.includes(cookieLocale as (typeof LOCALES)[number])) {
    return cookieLocale;
  }

  const header = request.headers.get('accept-language');
  if (header) {
    const preferred = header
      .split(',')
      .map((part) => {
        const [tag, q] = part.trim().split(';q=');
        return { tag: (tag ?? '').toLowerCase(), q: q ? Number(q) : 1 };
      })
      .sort((a, b) => b.q - a.q);

    for (const { tag } of preferred) {
      if (tag.startsWith('ar')) return 'ar';
      if (tag.startsWith('en')) return 'en';
    }
  }

  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/downloads') ||
    pathname.startsWith('/images') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;

  const response = NextResponse.redirect(url);
  response.cookies.set('NEXT_LOCALE', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 });
  return response;
}

export const config = {
  matcher: ['/((?!_next|api|downloads|images|.*\\..*).*)'],
};
