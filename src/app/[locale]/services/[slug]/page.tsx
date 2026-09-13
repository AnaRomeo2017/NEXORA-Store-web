import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CheckCircle2, CircleAlert, Lightbulb } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { FAQ } from '@/components/FAQ';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { SectionHeader } from '@/components/SectionHeader';
import { ServiceCard } from '@/components/ServiceCard';
import { getRelatedServices, getServiceBySlug, services } from '@/data/services';
import { getDictionary, isLocale, locales, type Locale } from '@/lib/i18n';
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from '@/lib/seo';

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams(): Array<{ locale: string; slug: string }> {
  return locales.flatMap((locale) =>
    services.map((service) => ({ locale, slug: service.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'ar';
  const service = getServiceBySlug(slug);

  if (!service) {
    return buildMetadata({
      locale,
      title: getDictionary(locale).notFound.title,
      description: getDictionary(locale).notFound.body,
      path: `services/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    locale,
    title: service[locale].title,
    description: service[locale].short,
    path: `services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const content = service[locale];
  const related = getRelatedServices(slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale, [
            { name: dict.nav.home, path: '' },
            { name: dict.services.metaTitle, path: 'services' },
            { name: content.title, path: `services/${slug}` },
          ]),
          faqJsonLd(content.faq),
        ]}
      />

      <section className="border-b border-border bg-background-subtle">
        <div className="container-page flex flex-col gap-8 py-12 lg:py-16">
          <Breadcrumbs
            locale={locale}
            label={dict.common.breadcrumb}
            items={[
              { label: dict.nav.home, href: '' },
              { label: dict.services.metaTitle, href: 'services' },
              { label: content.title },
            ]}
          />

          <div className="flex flex-col items-start gap-5">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--brand-blue-600)] text-white shadow-[0_14px_36px_-14px_rgba(37,99,235,0.8)]">
              <Icon name={service.icon} size={28} />
            </span>
            <SectionHeader
              as="h1"
              align="start"
              badge={dict.services.detailBadge}
              title={content.title}
              subtitle={content.description}
            />
          </div>
        </div>
      </section>

      {/* التحدّي والحل */}
      <section className="section">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="flex h-full flex-col gap-3 rounded-2xl border border-[var(--warning)]/30 bg-[var(--warning)]/6 p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--warning)]/16 text-[var(--warning)]">
                <CircleAlert size={21} strokeWidth={2} aria-hidden />
              </span>
              <h2 className="text-lg font-extrabold">{dict.common.problem}</h2>
              <p className="leading-relaxed text-muted">{content.problem}</p>
            </div>
          </Reveal>

          <Reveal delay={90} className="h-full">
            <div className="flex h-full flex-col gap-3 rounded-2xl border border-[var(--brand-blue-600)]/30 bg-[var(--brand-blue-600)]/6 p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-blue-600)]/14 text-[var(--brand-blue-600)] dark:text-[var(--brand-cyan-400)]">
                <Lightbulb size={21} strokeWidth={2} aria-hidden />
              </span>
              <h2 className="text-lg font-extrabold">{dict.common.solution}</h2>
              <p className="leading-relaxed text-muted">{content.solution}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* المزايا */}
      <section className="border-y border-border bg-background-subtle section">
        <div className="container-page flex flex-col gap-10">
          <SectionHeader title={dict.common.features} />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.features.map((feature, index) => (
              <Reveal key={feature} delay={index * 50} className="h-full">
                <div className="flex h-full items-start gap-2.5 rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <CheckCircle2
                    size={18}
                    strokeWidth={2}
                    className="mt-0.5 shrink-0 text-[var(--brand-cyan-500)] dark:text-[var(--brand-cyan-400)]"
                    aria-hidden
                  />
                  <span className="text-sm font-semibold leading-relaxed">{feature}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* الخطوات والمخرجات */}
      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-extrabold">{dict.services.stepsTitle}</h2>
            <ol className="flex flex-col gap-3">
              {content.steps.map((step, index) => (
                <Reveal key={step} delay={index * 60} as="li">
                  <div className="flex items-start gap-3.5 rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <span className="nums inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-navy-700)] text-sm font-black text-white dark:bg-[var(--brand-blue-600)]">
                      {index + 1}
                    </span>
                    <span className="pt-1.5 text-sm leading-relaxed">{step}</span>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-extrabold">{dict.services.deliverablesTitle}</h2>
            <Reveal>
              <ul className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-soft">
                {content.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2
                      size={18}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-[var(--success)]"
                      aria-hidden
                    />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* أسئلة الخدمة */}
      <section className="border-y border-border bg-background-subtle section">
        <div className="container-page flex flex-col gap-8">
          <SectionHeader title={dict.common.faqTitle} />
          <div className="mx-auto w-full max-w-3xl">
            <FAQ
              items={content.faq.map((item, index) => ({
                id: `${slug}-faq-${index}`,
                q: item.q,
                a: item.a,
              }))}
            />
          </div>
        </div>
      </section>

      {/* خدمات ذات صلة */}
      {related.length > 0 ? (
        <section className="section">
          <div className="container-page flex flex-col gap-8">
            <SectionHeader title={dict.services.relatedTitle} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <ServiceCard
                  key={item.slug}
                  service={item}
                  locale={locale}
                  ctaLabel={dict.cta.viewDetails}
                  delay={index * 60}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection
        locale={locale}
        dict={dict}
        title={dict.services.ctaTitle}
        subtitle={dict.services.ctaSubtitle}
      />
    </>
  );
}
