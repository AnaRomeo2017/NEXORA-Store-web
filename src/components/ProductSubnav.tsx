'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export type SubnavItem = { id: string; label: string };

export type ProductSubnavProps = {
  items: SubnavItem[];
};

/**
 * شريط تنقّل داخلي لصفحة المنتج — ثابت على الشاشات الكبيرة فقط.
 */
export function ProductSubnav({ items }: ProductSubnavProps) {
  const [active, setActive] = useState<string>(items[0]?.id ?? '');

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);

    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        const first = visible[0];
        if (first) setActive(first.target.id);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [items]);

  return (
    <div
      className="sticky z-30 hidden border-y border-border bg-background/85 backdrop-blur-lg lg:block"
      style={{ top: 'var(--header-height)' }}
    >
      <div className="container-page">
        <nav className="no-scrollbar flex items-center gap-1 overflow-x-auto py-2">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                'shrink-0 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors',
                active === item.id
                  ? 'bg-[var(--brand-blue-600)]/12 text-[var(--brand-blue-600)] dark:text-[var(--brand-cyan-400)]'
                  : 'text-muted hover:text-foreground',
              )}
              aria-current={active === item.id ? 'true' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default ProductSubnav;
