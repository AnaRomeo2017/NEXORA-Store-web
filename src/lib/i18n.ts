import { ar } from '@/data/i18n/ar';
import { en } from '@/data/i18n/en';

export const locales = ['ar', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ar';

/** القاموس المرجعي — العربية هي المصدر لبنية المفاتيح */
export type Dictionary = typeof ar;

const dictionaries: Record<Locale, Dictionary> = { ar, en };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** اتجاه الكتابة */
export function getDirection(locale: Locale): 'rtl' | 'ltr' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

/** وسم اللغة الكامل (لـ html lang و OG) */
export function getHtmlLang(locale: Locale): string {
  return locale === 'ar' ? 'ar' : 'en';
}

export function getOgLocale(locale: Locale): string {
  return locale === 'ar' ? 'ar_AR' : 'en_US';
}

/** بناء مسار داخلي مع بادئة اللغة */
export function localePath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+/, '');
  return clean.length === 0 ? `/${locale}` : `/${locale}/${clean}`;
}

/** اللغة المقابلة (للتبديل) */
export function otherLocale(locale: Locale): Locale {
  return locale === 'ar' ? 'en' : 'ar';
}

/** اختيار حقل ثنائي اللغة */
export function pick<T>(locale: Locale, value: { ar: T; en: T }): T {
  return locale === 'ar' ? value.ar : value.en;
}
