import { Reveal } from '@/components/Reveal';
import type { SiteStat } from '@/config/site';
import type { Locale } from '@/lib/i18n';

export type StatsProps = {
  locale: Locale;
  items: SiteStat[];
  className?: string;
};

/**
 * لا تُعرض إلا العناصر التي `enabled: true`.
 * إن لم يوجد أي عنصر مفعّل يُخفى المكوّن بالكامل.
 */
export function Stats({ locale, items, className }: StatsProps) {
  const visible = items.filter((item) => item.enabled);
  if (visible.length === 0) return null;

  return (
    <div
      className={
        className ??
        'grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4'
      }
    >
      {visible.map((item, index) => (
        <Reveal key={item.id} delay={index * 70}>
          <div className="flex h-full flex-col items-center gap-1.5 rounded-2xl border border-border bg-card p-5 text-center shadow-soft">
            <span className="nums text-2xl font-extrabold text-[var(--brand-blue-600)] sm:text-3xl dark:text-[var(--brand-cyan-400)]">
              {item.value}
            </span>
            <span className="text-xs font-semibold text-muted sm:text-sm">
              {locale === 'ar' ? item.labelAr : item.labelEn}
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default Stats;
