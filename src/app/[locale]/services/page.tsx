import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { JsonLd } from '@/components/JsonLd';
import { Process } from '@/components/Process';
import { SectionHeader } from '@/components/SectionHeader';
import { ServiceCard } from '@/components/ServiceCard';
import { services } from '@/data/services';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'ar';
  const dict = getDictionary(locale);

  return buildMetadata({
    locale,
    title: dict.services.metaTitle,
    description: dict.services.subtitle,
    path: 'services',
  });
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: '' },
          { name: dict.services.metaTitle, path: 'services' },
        ])}
      />

      <section className="border-b border-border bg-background-subtle">
        <div className="container-page flex flex-col gap-8 py-12 lg:py-16">
          <Breadcrumbs
            locale={locale}
            label={dict.common.breadcrumb}
            items={[{ label: dict.nav.home, href: '' }, { label: dict.services.metaTitle }]}
          />
          <SectionHeader
            as="h1"
            align="start"
            badge={dict.services.badge}
            title={dict.services.title}
            subtitle={dict.services.subtitle}
          />
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard
              key={service.slug}
              service={service}
              locale={locale}
              ctaLabel={dict.cta.viewDetails}
              delay={index * 60}
            />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-background-subtle section">
        <div className="container-page flex flex-col gap-10">
          <SectionHeader
            badge={dict.home.process.badge}
            title={dict.home.process.title}
            subtitle={dict.home.process.subtitle}
          />
          <Process locale={locale} />
        </div>
      </section>

      <CTASection
        locale={locale}
        dict={dict}
        title={dict.services.ctaTitle}
        subtitle={dict.services.ctaSubtitle}
      />
    </>
  );
}
