import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap disabled:opacity-60 disabled:pointer-events-none';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--brand-blue-600)] text-white hover:bg-[var(--brand-blue-700)] shadow-[0_10px_30px_-12px_rgba(37,99,235,0.7)] hover:shadow-[0_14px_36px_-12px_rgba(37,99,235,0.85)] hover:-translate-y-0.5',
  secondary:
    'bg-[var(--brand-navy-700)] text-white hover:bg-[var(--brand-navy-600)] dark:bg-white dark:text-[var(--brand-navy-700)] dark:hover:bg-navy-100 hover:-translate-y-0.5',
  accent:
    'bg-[var(--brand-cyan-400)] text-[var(--brand-navy-900)] hover:bg-[var(--brand-cyan-300)] hover:-translate-y-0.5',
  outline:
    'border border-border-strong bg-transparent text-foreground hover:border-[var(--brand-blue-600)] hover:text-[var(--brand-blue-600)] dark:hover:text-[var(--brand-cyan-400)] dark:hover:border-[var(--brand-cyan-400)]',
  ghost: 'bg-transparent text-foreground hover:bg-background-subtle',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-[0.95rem]',
  lg: 'h-13 px-7 text-base',
};

export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
): string {
  return cn(base, variants[variant], sizes[size], className);
}

export type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
  download?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  external = false,
  ariaLabel,
  download = false,
}: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);

  if (external || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(download ? { download: '' } : {})}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  if (download) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel} download="">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
