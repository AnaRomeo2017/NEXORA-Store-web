import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ButtonLink } from '@/components/Button';
import { CTASection } from '@/components/CTASection';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { ProductCard } from '@/components/ProductCard';
import { Reveal } from '@/components/Reveal';
import { SectionHeader } from '@/components/SectionHeader';
import { defaultWhatsAppMessage, whatsappLink } from '@/config/site';
import { industries, products } from '@/data/products';
import { getDictionary, isLocale, localePath, type Locale } from '@/lib/i18n';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'ar';
  const dict = getDictionary(locale);

  return buildMetadata({
    locale,
    title: dict.solutions.metaTitle,
    description: dict.solutions.subtitle,
    path: 'solutions',
  });
}

export default async function SolutionsPage({ params }: PageProps) {
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
          { name: dict.solutions.metaTitle, path: 'solutions' },
        ])}
      />

      <section className="border-b border-border bg-background-subtle">
        <div className="container-page flex flex-col gap-8 py-12 lg:py-16">
          <Breadcrumbs
            locale={locale}
            label={dict.common.breadcrumb}
            items={[{ label: dict.nav.home, href: '' }, { label: dict.solutions.metaTitle }]}
          />
          <SectionHeader
            as="h1"
            align="start"
            badge={dict.solutions.badge}
            title={dict.solutions.title}
            subtitle={dict.solutions.subtitle}
          />
        </div>
      </section>

      {/* المنتجات الجاهزة */}
      <section className="section">
        <div className="container-page flex flex-col gap-10">
          <SectionHeader title={dict.solutions.productsTitle} />
          <div className="mx-auto grid w-full max-w-3xl gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={product.slug}
                product={product}
                locale={locale}
                dict={dict}
                delay={index * 80}
              />
            ))}
          </div>
        </div>
      </section>

      {/* نظام مخصص */}
      <section className="border-y border-border bg-background-subtle section">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto flex max-w-3xl flex-col items-start gap-5 rounded-2xl border border-border bg-card p-8 shadow-soft sm:p-10">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--brand-blue-600)]/10 text-[var(--brand-blue-600)] dark:text-[var(--brand-cyan-400)]">
                <Icon name="Code2" size={24} />
              </span>
              <h2 className="text-2xl font-extrabold">{dict.solutions.customTitle}</h2>
              <p className="leading-relaxed text-muted">{dict.solutions.customDesc}</p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink
                  href={localePath(locale, 'services/custom-software')}
                  variant="primary"
                  size="lg"
                >
                  {dict.cta.viewDetails}
                  <Arrow size={17} strokeWidth={2.2} aria-hidden />
                </ButtonLink>
                <ButtonLink
                  href={whatsappLink(defaultWhatsAppMessage(locale), locale) ?? localePath(locale, 'contact')}
                  external
                  variant="outline"
                  size="lg"
                >
                  {dict.cta.quote}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* القطاعات */}
      <section className="section">
        <div className="container-page flex flex-col gap-10">
          <SectionHeader
            title={dict.solutions.industriesTitle}
            subtitle={dict.solutions.industriesSubtitle}
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <Reveal key={industry.id} delay={index * 60} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-soft transition-colors hover:border-[var(--brand-blue-600)]/40">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-cyan-400)]/16 text-[var(--brand-cyan-600)] dark:text-[var(--brand-cyan-400)]">
                    <Icon name={industry.icon} size={20} />
                  </span>
                  <h3 className="text-base font-bold">{industry[locale].title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{industry[locale].desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
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
