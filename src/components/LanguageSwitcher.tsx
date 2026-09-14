'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Languages } from 'lucide-react';
import { locales, otherLocale, type Locale } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

export type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  switchLabel: string;
  className?: string;
};

/** يبني نفس المسار الحالي بلغة أخرى */
function swapLocaleInPath(pathname: string, target: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];

  if (first && (locales as readonly string[]).includes(first)) {
    segments[0] = target;
  } else {
    segments.unshift(target);
  }

  return `/${segments.join('/')}`;
}

export function LanguageSwitcher({
  locale,
  label,
  switchLabel,
  className,
}: LanguageSwitcherProps) {
  const pathname = usePathname() ?? `/${locale}`;
  const target = otherLocale(locale);
  const href = swapLocaleInPath(pathname, target);

  return (
    <Link
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={switchLabel}
      title={switchLabel}
      onClick={() => {
        try {
          document.cookie = `NEXT_LOCALE=${target};path=/;max-age=31536000`;
        } catch {
          /* ignore */
        }
        trackEvent('language_switch', { from: locale, to: target });
      }}
      className={cn(
        'inline-flex h-10 items-center gap-1.5 rounded-xl border border-border px-3 text-sm font-semibold text-foreground/80 transition-colors hover:border-[var(--brand-blue-600)] hover:text-[var(--brand-blue-600)] dark:hover:border-[var(--brand-cyan-400)] dark:hover:text-[var(--brand-cyan-400)]',
        className,
      )}
    >
      <Languages size={16} strokeWidth={1.9} aria-hidden />
      <span>{label}</span>
    </Link>
  );
}

export default LanguageSwitcher;
