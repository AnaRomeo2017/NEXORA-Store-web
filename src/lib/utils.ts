export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

/** دمج أسماء الأصناف بشكل آمن (بديل خفيف عن clsx) */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  const walk = (value: ClassValue): void => {
    if (value === null || value === undefined || value === false || value === '') return;

    if (typeof value === 'string' || typeof value === 'number') {
      out.push(String(value));
      return;
    }

    if (Array.isArray(value)) {
      for (const item of value) walk(item);
      return;
    }

    for (const [key, enabled] of Object.entries(value)) {
      if (enabled) out.push(key);
    }
  };

  for (const input of inputs) walk(input);

  return out.join(' ');
}

/** تنسيق رقم بأرقام لاتينية مع فواصل */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

/** تنسيق تاريخ ISO حسب اللغة */
export function formatDate(iso: string, locale: 'ar' | 'en'): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;

  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    numberingSystem: 'latn',
  }).format(date);
}

/** تقدير زمن القراءة بالدقائق */
export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

/** slug مبسّط */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\p{L}\p{N}-]+/gu, '')
    .replace(/-{2,}/g, '-');
}

/** تقطيع نص طويل */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}
