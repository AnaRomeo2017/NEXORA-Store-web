import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, FolderOpen } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ButtonLink } from '@/components/Button';
import { CTASection } from '@/components/CTASection';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { SectionHeader } from '@/components/SectionHeader';
import { media } from '@/data/media';
import { hasPortfolio, portfolio } from '@/data/portfolio';
import { getDictionary, isLocale, localePath, type Locale } from '@/lib/i18n';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'ar';
  const dict = getDictionary(locale);

  return buildMetadata({
    locale,
    title: dict.portfolio.metaTitle,
    description: dict.portfolio.subtitle,
    path: 'portfolio',
    // لا فائدة من فهرسة صفحة بلا محتوى منشور
    noIndex: !hasPortfolio,
  });
}

export default async function PortfolioPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: '' },
          { name: dict.portfolio.metaTitle, path: 'portfolio' },
        ])}
      />

      <section className="border-b border-border bg-background-subtle">
        <div className="container-page flex flex-col gap-8 py-12 lg:py-16">
          <Breadcrumbs
            locale={locale}
            label={dict.common.breadcrumb}
            items={[{ label: dict.nav.home, href: '' }, { label: dict.portfolio.metaTitle }]}
          />
          <SectionHeader
            as="h1"
            align="start"
            badge={dict.portfolio.badge}
            title={dict.portfolio.title}
            subtitle={dict.portfolio.subtitle}
          />
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          {hasPortfolio ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {portfolio.map((item, index) => (
                <Reveal key={item.slug} delay={index * 70} className="h-full">
                  <article className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-soft">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-lg font-bold">{item[locale].title}</h2>
                      <span className="nums text-xs font-semibold text-muted">{item.year}</span>
                    </div>
                    <p className="text-xs font-bold text-[var(--brand-blue-600)] dark:text-[var(--brand-cyan-400)]">
                      {item[locale].sector}
                    </p>
                    <p className="text-sm leading-relaxed text-muted">{item[locale].summary}</p>
                    <ul className="mt-auto flex flex-wrap gap-1.5">
                      {item[locale].scope.map((scope) => (
                        <li
                          key={scope}
                          className="rounded-lg border border-border bg-background-subtle px-2.5 py-1 text-xs font-semibold"
                        >
                          {scope}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            /* الحالة الفارغة — لا تُنشر مشاريع أو أسماء عملاء بدون موافقة */
            <Reveal>
              <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-[1.75rem] border border-dashed border-border-strong bg-card p-10 text-center shadow-soft">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-background-subtle text-muted">
                  <FolderOpen size={28} strokeWidth={1.8} aria-hidden />
                </span>
                <h2 className="text-xl font-extrabold">{dict.portfolio.emptyTitle}</h2>
                <p className="text-pretty leading-relaxed text-muted">{dict.portfolio.emptyBody}</p>

                <div className="mt-2 overflow-hidden rounded-2xl border border-border">
                  <Image
                    src={media.nexoraPosScreen.src}
                    alt={media.nexoraPosScreen.alt[locale]}
                    width={media.nexoraPosScreen.width}
                    height={media.nexoraPosScreen.height}
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="h-auto w-full object-cover"
                  />
                </div>

                <ButtonLink
                  href={localePath(locale, 'products/nexora-store')}
                  variant="primary"
                  size="lg"
                >
                  {dict.portfolio.emptyCta}
                  <Arrow size={17} strokeWidth={2.2} aria-hidden />
                </ButtonLink>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <CTASection
        locale={locale}
        dict={dict}
        title={dict.home.cta.title}
        subtitle={dict.home.cta.subtitle}
      />
    </>
  );
}
