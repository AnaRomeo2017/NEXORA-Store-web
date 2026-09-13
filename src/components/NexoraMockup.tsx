import { cn } from '@/lib/utils';
import type { Locale } from '@/lib/i18n';

export type NexoraMockupProps = {
  locale: Locale;
  className?: string;
  /** نوع الشاشة المعروضة */
  variant?: 'pos' | 'dashboard';
};

const COPY = {
  ar: {
    windowTitle: 'NEXORA Store',
    online: 'متزامن',
    offline: 'بدون إنترنت — يعمل محلياً',
    search: 'ابحث عن صنف أو امسح الباركود…',
    cart: 'الفاتورة الحالية',
    total: 'الإجمالي',
    pay: 'إتمام الدفع وطباعة',
    items: [
      { name: 'أرز 1 كجم', qty: '2', price: '64.00' },
      { name: 'زيت ذرة 700 مل', qty: '1', price: '58.50' },
      { name: 'سكر 1 كجم', qty: '3', price: '96.00' },
    ],
    totalValue: '218.50',
    tiles: ['المبيعات', 'المخزون', 'العملاء', 'التقارير', 'المصروفات', 'الورديات'],
    kpis: [
      { label: 'مبيعات اليوم', value: '12,480' },
      { label: 'الأرباح', value: '3,110' },
      { label: 'أصناف منخفضة', value: '14' },
      { label: 'فواتير', value: '96' },
    ],
  },
  en: {
    windowTitle: 'NEXORA Store',
    online: 'Synced',
    offline: 'Offline — running locally',
    search: 'Search an item or scan a barcode…',
    cart: 'Current invoice',
    total: 'Total',
    pay: 'Checkout & print',
    items: [
      { name: 'Rice 1 kg', qty: '2', price: '64.00' },
      { name: 'Corn oil 700 ml', qty: '1', price: '58.50' },
      { name: 'Sugar 1 kg', qty: '3', price: '96.00' },
    ],
    totalValue: '218.50',
    tiles: ['Sales', 'Inventory', 'Customers', 'Reports', 'Expenses', 'Shifts'],
    kpis: [
      { label: 'Today’s sales', value: '12,480' },
      { label: 'Profit', value: '3,110' },
      { label: 'Low stock', value: '14' },
      { label: 'Invoices', value: '96' },
    ],
  },
} as const;

/**
 * رسم توضيحي (CSS/SVG) لواجهة النظام — ليس لقطة شاشة حقيقية.
 * يُستخدم كعنصر بصري مساعد بجانب صور المنتج الفعلية.
 */
export function NexoraMockup({ locale, className, variant = 'pos' }: NexoraMockupProps) {
  const copy = COPY[locale];

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-border bg-card shadow-lift',
        className,
      )}
      role="img"
      aria-label={
        locale === 'ar'
          ? 'رسم توضيحي لواجهة NEXORA Store'
          : 'Illustration of the NEXORA Store interface'
      }
    >
      {/* شريط النافذة */}
      <div className="flex items-center justify-between gap-3 border-b border-border bg-background-subtle px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden />
        </div>
        <span className="text-xs font-bold text-muted">{copy.windowTitle}</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--warning)]/14 px-2 py-0.5 text-[0.65rem] font-bold text-[var(--warning)]">
          <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
          {copy.offline}
        </span>
      </div>

      {variant === 'pos' ? (
        <div className="grid gap-3 p-4 sm:grid-cols-[1.35fr_1fr]">
          {/* شبكة الأصناف */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" className="text-muted" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" className="text-muted" />
              </svg>
              <span className="truncate text-[0.7rem] text-muted">{copy.search}</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {copy.tiles.map((tile, index) => (
                <div
                  key={tile}
                  className="flex flex-col gap-1.5 rounded-xl border border-border bg-background p-2.5"
                >
                  <span
                    className={cn(
                      'h-8 rounded-lg',
                      index % 3 === 0
                        ? 'bg-[var(--brand-blue-600)]/18'
                        : index % 3 === 1
                          ? 'bg-[var(--brand-cyan-400)]/22'
                          : 'bg-[var(--brand-navy-700)]/12',
                    )}
                    aria-hidden
                  />
                  <span className="truncate text-[0.62rem] font-bold text-foreground/75">{tile}</span>
                </div>
              ))}
            </div>
          </div>

          {/* الفاتورة */}
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-background p-3">
            <span className="text-[0.7rem] font-extrabold">{copy.cart}</span>

            <ul className="flex flex-col gap-1.5">
              {copy.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between gap-2 rounded-lg bg-background-subtle px-2 py-1.5"
                >
                  <span className="truncate text-[0.65rem] font-semibold">{item.name}</span>
                  <span className="nums shrink-0 text-[0.62rem] text-muted">
                    {item.qty} × {item.price}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-2 border-t border-border pt-2">
              <div className="flex items-center justify-between">
                <span className="text-[0.7rem] font-bold text-muted">{copy.total}</span>
                <span className="nums text-base font-black text-[var(--brand-blue-600)] dark:text-[var(--brand-cyan-400)]">
                  {copy.totalValue}
                </span>
              </div>
              <span className="rounded-lg bg-[var(--brand-blue-600)] px-3 py-2 text-center text-[0.65rem] font-bold text-white">
                {copy.pay}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 p-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {copy.kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="flex flex-col gap-1 rounded-xl border border-border bg-background p-3"
              >
                <span className="truncate text-[0.6rem] font-semibold text-muted">{kpi.label}</span>
                <span className="nums text-sm font-black text-[var(--brand-blue-600)] dark:text-[var(--brand-cyan-400)]">
                  {kpi.value}
                </span>
              </div>
            ))}
          </div>

          {/* رسم بياني SVG */}
          <div className="rounded-xl border border-border bg-background p-3">
            <svg viewBox="0 0 320 96" className="h-24 w-full" role="presentation" aria-hidden>
              <defs>
                <linearGradient id="nexora-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--brand-blue-600)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--brand-blue-600)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 78 L40 64 L80 70 L120 44 L160 52 L200 28 L240 36 L280 18 L320 24 L320 96 L0 96 Z"
                fill="url(#nexora-area)"
              />
              <path
                d="M0 78 L40 64 L80 70 L120 44 L160 52 L200 28 L240 36 L280 18 L320 24"
                fill="none"
                stroke="var(--brand-blue-600)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {[
                [40, 64],
                [120, 44],
                [200, 28],
                [280, 18],
              ].map(([x, y]) => (
                <circle
                  key={`${x}-${y}`}
                  cx={x}
                  cy={y}
                  r="3.5"
                  fill="var(--brand-cyan-400)"
                  stroke="var(--card)"
                  strokeWidth="2"
                />
              ))}
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {copy.tiles.slice(0, 3).map((tile) => (
              <div key={tile} className="rounded-xl border border-border bg-background p-2.5">
                <span className="mb-1.5 block h-6 rounded-md bg-[var(--brand-cyan-400)]/20" aria-hidden />
                <span className="truncate text-[0.62rem] font-bold text-foreground/75">{tile}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NexoraMockup;
