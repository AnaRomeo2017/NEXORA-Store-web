import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { getOgLocale, locales, localePath, type Locale } from '@/lib/i18n';

export function absoluteUrl(path = ''): string {
  const base = siteConfig.url.replace(/\/+$/, '');
  const clean = path.replace(/^\/+/, '');
  return clean.length === 0 ? base : `${base}/${clean}`;
}

/** خرائط hreflang لكل اللغات لمسار معيّن (بدون بادئة اللغة) */
export function languageAlternates(path = ''): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of locales) {
    alternates[locale] = absoluteUrl(localePath(locale, path).slice(1));
  }
  alternates['x-default'] = absoluteUrl(localePath('ar', path).slice(1));
  return alternates;
}

export type BuildMetadataOptions = {
  locale: Locale;
  title: string;
  description: string;
  /** المسار بدون بادئة اللغة، مثل `services/web-development` */
  path?: string;
  /** لا يُفهرس (صفحات فارغة أو مؤقتة) */
  noIndex?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  keywords?: string[];
};

export function buildMetadata(options: BuildMetadataOptions): Metadata {
  const { locale, title, description, path = '', noIndex = false, type = 'website' } = options;
  const canonical = absoluteUrl(localePath(locale, path).slice(1));
  const siteName = locale === 'ar' ? siteConfig.siteName : siteConfig.siteNameEn;

  return {
    title,
    description,
    keywords: options.keywords,
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      type,
      title,
      description,
      url: canonical,
      siteName,
      locale: getOgLocale(locale),
      ...(options.publishedTime ? { publishedTime: options.publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

/** JSON-LD للمنظمة */
export function organizationJsonLd(locale: Locale): Record<string, unknown> {
  const name = locale === 'ar' ? siteConfig.siteName : siteConfig.siteNameEn;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    alternateName: locale === 'ar' ? siteConfig.siteNameEn : siteConfig.siteName,
    url: absoluteUrl(localePath(locale).slice(1)),
    description: locale === 'ar' ? siteConfig.description : siteConfig.descriptionEn,
  };
}

/** JSON-LD لبرنامج (NEXORA Store) */
export function softwareJsonLd(params: {
  locale: Locale;
  name: string;
  description: string;
  version: string;
  path: string;
  operatingSystem: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: params.name,
    description: params.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: params.operatingSystem,
    softwareVersion: params.version,
    url: absoluteUrl(localePath(params.locale, params.path).slice(1)),
  };
}

/** JSON-LD لمسار التنقّل */
export function breadcrumbJsonLd(
  locale: Locale,
  items: Array<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localePath(locale, item.path).slice(1)),
    })),
  };
}

/** JSON-LD للأسئلة الشائعة */
export function faqJsonLd(items: Array<{ q: string; a: string }>): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}
