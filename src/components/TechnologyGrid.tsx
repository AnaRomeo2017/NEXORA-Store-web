import { Icon } from '@/components/Icon';
import { Reveal } from '@/components/Reveal';
import { technologies } from '@/data/technologies';
import type { Locale } from '@/lib/i18n';

export type TechnologyGridProps = {
  locale: Locale;
};

export function TechnologyGrid({ locale }: TechnologyGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {technologies.map((category, index) => (
        <Reveal key={category.id} delay={index * 70} className="h-full">
          <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-soft transition-colors hover:border-[var(--brand-blue-600)]/40">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-cyan-400)]/14 text-[var(--brand-cyan-600)] dark:text-[var(--brand-cyan-400)]">
              <Icon name={category.icon} size={21} />
            </span>
            <h3 className="text-base font-bold">{category[locale].title}</h3>
            <p className="text-sm leading-relaxed text-muted">{category[locale].desc}</p>
            <ul className="mt-1 flex flex-wrap gap-1.5">
              {category.items.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-border bg-background-subtle px-2.5 py-1 text-xs font-semibold text-foreground/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default TechnologyGrid;
