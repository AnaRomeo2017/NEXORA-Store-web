import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/Reveal';

export type SectionHeaderProps = {
  badge?: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'center' | 'start';
  className?: string;
  /** عنصر h المستخدم للعنوان */
  as?: 'h1' | 'h2' | 'h3';
};

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = 'center',
  className,
  as = 'h2',
}: SectionHeaderProps) {
  const Heading = as;

  return (
    <Reveal
      className={cn(
        'flex max-w-3xl flex-col gap-3',
        align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-start',
        className,
      )}
    >
      {badge ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-blue-600)]/25 bg-[var(--brand-blue-600)]/8 px-3.5 py-1.5 text-xs font-bold tracking-wide text-[var(--brand-blue-600)] dark:border-[var(--brand-cyan-400)]/25 dark:bg-[var(--brand-cyan-400)]/10 dark:text-[var(--brand-cyan-400)]">
          <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
          {badge}
        </span>
      ) : null}

      <Heading className="text-balance text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.6rem]">
        {title}
      </Heading>

      {subtitle ? (
        <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>
      ) : null}
    </Reveal>
  );
}

export default SectionHeader;
