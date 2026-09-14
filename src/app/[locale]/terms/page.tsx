import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { LegalDocument } from '@/components/LegalDocument';
import { getLegalDoc } from '@/data/legal';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'ar';
  const doc = getLegalDoc('terms', locale);

  return buildMetadata({
    locale,
    title: doc.metaTitle,
    description: doc.metaDescription,
    path: 'terms',
  });
}

export default async function TermsPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);
  const doc = getLegalDoc('terms', locale);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: '' },
          { name: doc.title, path: 'terms' },
        ])}
      />

      <section className="border-b border-border bg-background-subtle">
        <div className="container-page py-8 lg:py-10">
          <Breadcrumbs
            locale={locale}
            label={dict.common.breadcrumb}
            items={[{ label: dict.nav.home, href: '' }, { label: doc.title }]}
          />
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <LegalDocument locale={locale} doc={doc} />
        </div>
      </section>
    </>
  );
}
