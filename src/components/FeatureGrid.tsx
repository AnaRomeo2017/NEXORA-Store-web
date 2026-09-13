import { Icon } from '@/components/Icon';
import { Reveal } from '@/components/Reveal';
import { featureCategories, nexoraFeatures } from '@/data/nexora-features';
import type { Dictionary, Locale } from '@/lib/i18n';

export type FeatureGridProps = {
  locale: Locale;
  dict: Dictionary;
};

/** شبكة مزايا NEXORA Store مجمّعة حسب الفئة — المزايا المتحققة فقط */
export function FeatureGrid({ locale, dict }: FeatureGridProps) {
  return (
    <div className="flex flex-col gap-10">
      {featureCategories.map((category) => {
        const items = nexoraFeatures.filter((feature) => feature.category === category.id);
        if (items.length === 0) return null;

        return (
          <div key={category.id} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-extrabold">{category[locale]}</h3>
              <span className="h-px flex-1 bg-border" aria-hidden />
              <span className="nums text-xs font-bold text-muted">{items.length}</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((feature, index) => (
                <Reveal key={feature.id} delay={index * 50} className="h-full">
                  <div className="flex h-full gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-[var(--brand-blue-600)]/40">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-blue-600)]/10 text-[var(--brand-blue-600)] dark:text-[var(--brand-cyan-400)]">
                      <Icon name={feature.icon} size={20} />
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <h4 className="flex flex-wrap items-center gap-2 text-[0.95rem] font-bold leading-snug">
                        {feature[locale].title}
                        {feature.optional ? (
                          <span className="rounded-full bg-[var(--warning)]/14 px-2 py-0.5 text-[0.62rem] font-bold text-[var(--warning)]">
                            {dict.nexora.features.optionalTag}
                          </span>
                        ) : null}
                      </h4>
                      <p className="text-sm leading-relaxed text-muted">{feature[locale].desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FeatureGrid;
