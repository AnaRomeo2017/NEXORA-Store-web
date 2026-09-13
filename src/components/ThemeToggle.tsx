'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

export type ThemeToggleProps = {
  label: string;
  className?: string;
};

export function ThemeToggle({ label, className }: ThemeToggleProps) {
  const { theme, toggleTheme, ready } = useTheme();

  return (
    <button
      type="button"
      onClick={() => {
        toggleTheme();
        trackEvent('theme_toggle', { to: theme === 'dark' ? 'light' : 'dark' });
      }}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground/80 transition-colors hover:border-[var(--brand-blue-600)] hover:text-[var(--brand-blue-600)] dark:hover:border-[var(--brand-cyan-400)] dark:hover:text-[var(--brand-cyan-400)]',
        className,
      )}
    >
      {ready && theme === 'dark' ? (
        <Sun size={18} strokeWidth={1.9} aria-hidden />
      ) : (
        <Moon size={18} strokeWidth={1.9} aria-hidden />
      )}
    </button>
  );
}

export default ThemeToggle;
