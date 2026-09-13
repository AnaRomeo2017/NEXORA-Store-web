import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { Process } from '@/components/Process';
import { ProductCard } from '@/components/ProductCard';
import { Reveal } from '@/components/Reveal';
import { SectionHeader } from '@/components/SectionHeader';
import { Stats } from '@/components/Stats';
import { siteConfig } from '@/config/site';
import { media } from '@/data/media';
import { products } from '@/data/products';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';
import type { IconName } from '@/components/Icon';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'ar';
  const dict = getDictionary(locale);

  return buildMetadata({
    locale,
    title: dict.about.metaTitle,
    description: dict.about.lead,
    path: 'about',
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);

  const values: Array<{ icon: IconName; title: string; desc: string }> = [
    { icon: 'FileText', title: dict.about.value1Title, desc: dict.about.value1Desc },
    { icon: 'BadgeCheck', title: dict.about.value2Title, desc: dict.about.value2Desc },
    { icon: 'LifeBuoy', title: dict.about.value3Title, desc: dict.about.value3Desc },
    { icon: 'ShieldCheck', title: dict.about.value4Title, desc: dict.about.value4Desc },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: '' },
          { name: dict.about.metaTitle, path: 'about' },
        ])}
      />

      <section className="border-b border-border bg-background-subtle">
        <div className="container-page flex flex-col gap-8 py-12 lg:py-16">
          <Breadcrumbs
            locale={locale}
            label={dict.common.breadcrumb}
            items={[{ label: dict.nav.home, href: '' }, { label: dict.about.metaTitle }]}
          />

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div className="flex flex-col gap-5">
              <SectionHeader
                as="h1"
                align="start"
                badge={dict.about.badge}
                title={dict.about.title}
                subtitle={dict.about.lead}
                className="max-w-2xl"
              />
            </div>

            <Reveal delay={120} className="mx-auto">
              <Image
                src={media.menzomaBrand.src}
                alt={media.menzomaBrand.alt[locale]}
                width={media.menzomaBrand.width}
                height={media.menzomaBrand.height}
                sizes="(max-width: 1024px) 180px, 240px"
                className="h-44 w-44 rounded-[1.75rem] border border-border bg-card object-contain p-4 shadow-lift lg:h-60 lg:w-60"
              />
            </Reveal>
          </div>

          <Stats locale={locale} items={siteConfig.facts} />
        </div>
      </section>

      {/* الرسالة والرؤية */}
      <section className="section">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-7 shadow-soft">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-blue-600)]/10 text-[var(--brand-blue-600)] dark:text-[var(--brand-cyan-400)]">
                <Icon name="Rocket" size={22} />
              </span>
              <h2 className="text-xl font-extrabold">{dict.about.missionTitle}</h2>
              <p className="leading-relaxed text-muted">{dict.about.missionBody}</p>
            </div>
          </Reveal>

          <Reveal delay={90} className="h-full">
            <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-7 shadow-soft">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-cyan-400)]/16 text-[var(--brand-cyan-600)] dark:text-[var(--brand-cyan-400)]">
                <Icon name="Lightbulb" size={22} />
              </span>
              <h2 className="text-xl font-extrabold">{dict.about.visionTitle}</h2>
              <p className="leading-relaxed text-muted">{dict.about.visionBody}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* القيم */}
      <section className="border-y border-border bg-background-subtle section">
        <div className="container-page flex flex-col gap-10">
          <SectionHeader title={dict.about.valuesTitle} subtitle={dict.about.valuesSubtitle} />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 70} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-blue-600)]/10 text-[var(--brand-blue-600)] dark:text-[var(--brand-cyan-400)]">
                    <Icon name={value.icon} size={20} />
                  </span>
                  <h3 className="text-base font-bold">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{value.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* المنهجية */}
      <section className="section">
        <div className="container-page flex flex-col gap-10">
          <SectionHeader title={dict.about.approachTitle} subtitle={dict.about.approachSubtitle} />
          <Process locale={locale} />
        </div>
      </section>

      {/* المنتج */}
      <section className="border-t border-border bg-background-subtle section">
        <div className="container-page flex flex-col gap-10">
          <SectionHeader title={dict.about.productTitle} subtitle={dict.about.productSubtitle} />
          <div className="mx-auto grid w-full max-w-3xl gap-6">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} locale={locale} dict={dict} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        locale={locale}
        dict={dict}
        title={dict.about.ctaTitle}
        subtitle={dict.about.ctaSubtitle}
      />
    </>
  );
}
