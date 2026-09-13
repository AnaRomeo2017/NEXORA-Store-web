import { Icon } from '@/components/Icon';
import { Reveal } from '@/components/Reveal';
import { processSteps } from '@/data/technologies';
import type { Locale } from '@/lib/i18n';

export type ProcessProps = {
  locale: Locale;
};

export function Process({ locale }: ProcessProps) {
  return (
    <ol className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-5 lg:gap-4">
      {/* خط الربط على الشاشات الكبيرة */}
      <span
        className="pointer-events-none absolute inset-x-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-[var(--brand-blue-600)]/30 to-transparent lg:block"
        aria-hidden
      />

      {processSteps.map((step, index) => (
        <Reveal key={step.id} delay={index * 90} as="li" className="relative">
          <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="relative inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand-navy-700)] text-white dark:bg-[var(--brand-blue-600)]">
                <Icon name={step.icon} size={22} />
                <span className="nums absolute -top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-[var(--brand-cyan-400)] text-[0.7rem] font-black text-[var(--brand-navy-900)] ltr:-right-1.5 rtl:-left-1.5">
                  {index + 1}
                </span>
              </span>
              <h3 className="text-base font-bold leading-snug">{step[locale].title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted">{step[locale].desc}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

export default Process;
