'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

export type FAQEntry = { id: string; q: string; a: string };

export type FAQProps = {
  items: FAQEntry[];
  /** فتح أول عنصر تلقائياً */
  defaultOpenFirst?: boolean;
  className?: string;
};

export function FAQ({ items, defaultOpenFirst = true, className }: FAQProps) {
  const firstId = items[0]?.id ?? null;
  const [openId, setOpenId] = useState<string | null>(defaultOpenFirst ? firstId : null);

  if (items.length === 0) return null;

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className={cn(
              'overflow-hidden rounded-2xl border bg-card transition-colors',
              isOpen ? 'border-[var(--brand-blue-600)]/45 shadow-soft' : 'border-border',
            )}
          >
            <h3>
              <button
                type="button"
                onClick={() => {
                  const next = isOpen ? null : item.id;
                  setOpenId(next);
                  if (next) trackEvent('faq_open', { id: item.id });
                }}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                id={`faq-button-${item.id}`}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start text-[0.95rem] font-bold sm:text-base"
              >
                <span>{item.q}</span>
                <ChevronDown
                  size={20}
                  strokeWidth={2.2}
                  className={cn(
                    'shrink-0 text-[var(--brand-blue-600)] transition-transform duration-300 dark:text-[var(--brand-cyan-400)]',
                    isOpen && 'rotate-180',
                  )}
                  aria-hidden
                />
              </button>
            </h3>

            <div
              id={`faq-panel-${item.id}`}
              role="region"
              aria-labelledby={`faq-button-${item.id}`}
              hidden={!isOpen}
              className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FAQ;
