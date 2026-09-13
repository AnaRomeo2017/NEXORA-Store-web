import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { localePath, type Locale } from '@/lib/i18n';

export type Crumb = {
  label: string;
  /** مسار بدون بادئة اللغة — غير موجود يعني العنصر الحالي */
  href?: string;
};

export type BreadcrumbsProps = {
  locale: Locale;
  items: Crumb[];
  label: string;
};

export function Breadcrumbs({ locale, items, label }: BreadcrumbsProps) {
  const Chevron = locale === 'ar' ? ChevronLeft : ChevronRight;

  return (
    <nav aria-label={label} className="w-full">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted sm:text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {item.href !== undefined && !isLast ? (
                <Link
                  href={localePath(locale, item.href)}
                  className="transition-colors hover:text-[var(--brand-blue-600)] dark:hover:text-[var(--brand-cyan-400)]"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className="font-semibold text-foreground">
                  {item.label}
                </span>
              )}
              {!isLast ? <Chevron size={14} className="text-muted/70" aria-hidden /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
