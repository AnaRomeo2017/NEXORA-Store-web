import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { JsonLd } from '@/components/JsonLd';
import { ThemeProvider } from '@/components/ThemeProvider';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { siteConfig } from '@/config/site';
import {
  getDictionary,
  getDirection,
  isLocale,
  locales,
  type Locale,
} from '@/lib/i18n';
import { languageAlternates, organizationJsonLd } from '@/lib/seo';
import { htmlLangScript } from '@/lib/theme';

export function generateStaticParams(): Array<{ locale: Locale }> {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'ar';

  const title =
    locale === 'ar'
      ? `${siteConfig.siteName} — ${siteConfig.tagline}`
      : `${siteConfig.siteNameEn} — ${siteConfig.taglineEn}`;

  return {
    title: {
      default: title,
      template: `%s | ${locale === 'ar' ? siteConfig.siteName : siteConfig.siteNameEn}`,
    },
    description: locale === 'ar' ? siteConfig.description : siteConfig.descriptionEn,
    alternates: { languages: languageAlternates('') },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);
  const dir = getDirection(locale);

  return (
    <>
      {/* يضبط lang/dir على <html> قبل الرسم — الحاوية أدناه تضبطهما للمحتوى نفسه */}
      <script dangerouslySetInnerHTML={{ __html: htmlLangScript(locale, dir) }} />

      <ThemeProvider>
        <div lang={locale} dir={dir} className="flex min-h-screen flex-col">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-[var(--brand-blue-600)] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white ltr:focus:left-3 rtl:focus:right-3"
          >
            {dict.common.skipToContent}
          </a>

          <Header locale={locale} dict={dict} />

          <main id="main" className="flex-1">
            {children}
          </main>

          <Footer locale={locale} dict={dict} />
          <WhatsAppButton locale={locale} label={dict.cta.whatsapp} />
        </div>
      </ThemeProvider>

      <JsonLd data={organizationJsonLd(locale)} />
    </>
  );
}
