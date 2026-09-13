import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Icon } from '@/components/Icon';
import { Reveal } from '@/components/Reveal';
import type { Service } from '@/data/services';
import { localePath, type Locale } from '@/lib/i18n';

export type ServiceCardProps = {
  service: Service;
  locale: Locale;
  ctaLabel: string;
  delay?: number;
};

export function ServiceCard({ service, locale, ctaLabel, delay = 0 }: ServiceCardProps) {
  const content = service[locale];
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={localePath(locale, `services/${service.slug}`)}
        className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-blue-600)]/45 hover:shadow-lift"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-blue-600)]/10 text-[var(--brand-blue-600)] transition-colors group-hover:bg-[var(--brand-blue-600)] group-hover:text-white dark:text-[var(--brand-cyan-400)] dark:group-hover:text-white">
          <Icon name={service.icon} size={22} />
        </span>

        <h3 className="text-lg font-bold leading-snug">{content.title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-muted">{content.short}</p>

        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--brand-blue-600)] dark:text-[var(--brand-cyan-400)]">
          {ctaLabel}
          <Arrow
            size={15}
            strokeWidth={2.4}
            className="transition-transform group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1"
            aria-hidden
          />
        </span>
      </Link>
    </Reveal>
  );
}

export default ServiceCard;
