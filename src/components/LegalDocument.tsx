import type { Locale } from '@/lib/i18n';
import type { LegalDoc } from '@/data/legal';

export function LegalDocument({ locale, doc }: { locale: Locale; doc: LegalDoc }) {
  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-8" lang={locale}>
      <header className="flex flex-col gap-3">
        <p className="nums text-xs font-semibold text-muted">{doc.updatedLabel}</p>
        <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">{doc.title}</h1>
        <p className="text-base leading-8 text-muted">{doc.intro}</p>
      </header>

      {doc.sections.map((section) => (
        <section key={section.heading} className="flex flex-col gap-3">
          <h2 className="text-xl font-bold">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="text-[0.95rem] leading-8 text-foreground/90">
              {paragraph}
            </p>
          ))}
          {section.bullets && section.bullets.length > 0 ? (
            <ul className="flex list-disc flex-col gap-2 ps-5 text-[0.95rem] leading-8 text-foreground/90">
              {section.bullets.map((bullet) => (
                <li key={bullet.slice(0, 48)}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </article>
  );
}
