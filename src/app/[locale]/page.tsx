import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2, Download } from 'lucide-react';
import { ButtonLink } from '@/components/Button';
import { CTASection } from '@/components/CTASection';
import { FAQ } from '@/components/FAQ';
import { Hero } from '@/components/Hero';
import { Icon } from '@/components/Icon';
import { Process } from '@/components/Process';
import { ProductCard } from '@/components/ProductCard';
import { Reveal } from '@/components/Reveal';
import { SectionHeader } from '@/components/SectionHeader';
import { ServiceCard } from '@/components/ServiceCard';
import { Stats } from '@/components/Stats';
import { TechnologyGrid } from '@/components/TechnologyGrid';
import { siteConfig } from '@/config/site';
import { generalFaq } from '@/data/faq';
import { media } from '@/data/media';
import { nexoraStore, products } from '@/data/products';
import { getSortedBlogPosts, hasBlogPosts } from '@/data/blog';
import { hasPortfolio, portfolio } from '@/data/portfolio';
import { hasTestimonials, testimonials } from '@/data/testimonials';
import { services } from '@/data/services';
import { getDictionary, isLocale, localePath, type Locale } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/utils';
import type { IconName } from '@/components/Icon';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'ar';

  return buildMetadata({
    locale,
    title:
      locale === 'ar'
        ? `${siteConfig.siteName} — ${siteConfig.tagline}`
        : `${siteConfig.siteNameEn} — ${siteConfig.taglineEn}`,
    description: locale === 'ar' ? siteConfig.description : siteConfig.descriptionEn,
    path: '',
  });
}

const WHY_ITEMS: Array<{ icon: IconName; titleKey: 1 | 2 | 3 | 4 | 5 | 6 }> = [
  { icon: 'WifiOff', titleKey: 1 },
  { icon: 'Database', titleKey: 2 },
  { icon: 'ShieldCheck', titleKey: 3 },
  { icon: 'Languages', titleKey: 4 },
  { icon: 'FileText', titleKey: 5 },
  { icon: 'TrendingUp', titleKey: 6 },
];

export default async function HomePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;
  const posts = getSortedBlogPosts().slice(0, 3);

  const whyCopy = dict.home.why;
  const whyText: Record<number, { title: string; desc: string }> = {
    1: { title: whyCopy.item1Title, desc: whyCopy.item1Desc },
    2: { title: whyCopy.item2Title, desc: whyCopy.item2Desc },
    3: { title: whyCopy.item3Title, desc: whyCopy.item3Desc },
    4: { title: whyCopy.item4Title, desc: whyCopy.item4Desc },
    5: { title: whyCopy.item5Title, desc: whyCopy.item5Desc },
    6: { title: whyCopy.item6Title, desc: whyCopy.item6Desc },
  };

  return (
    <>
      <Hero locale={locale} dict={dict} />

      {/* حقائق سريعة */}
      <section className="border-b border-border bg-background-subtle py-10">
        <div className="container-page">
          <Stats locale={locale} items={siteConfig.facts} />
        </div>
      </section>

      {/* الخدمات */}
      <section className="section">
        <div className="container-page flex flex-col gap-10">
          <SectionHeader
            badge={dict.home.services.badge}
            title={dict.home.services.title}
            subtitle={dict.home.services.subtitle}
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

          <Reveal className="flex justify-center">
            <ButtonLink href={localePath(locale, 'services')} variant="outline" size="lg">
              {dict.cta.allServices}
              <Arrow size={17} strokeWidth={2.2} aria-hidden />
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* NEXORA Store */}
      <section className="relative overflow-hidden border-y border-border bg-background-subtle section">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="flex flex-col items-start gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-blue-600)]/25 bg-[var(--brand-blue-600)]/8 px-3.5 py-1.5 text-xs font-bold text-[var(--brand-blue-600)] dark:border-[var(--brand-cyan-400)]/25 dark:text-[var(--brand-cyan-400)]">
              {dict.home.nexora.badge}
            </span>

            <div className="flex items-center gap-3">
              <Image
                src={media.nexoraIcon.src}
                alt={media.nexoraIcon.alt[locale]}
                width={media.nexoraIcon.width}
                height={media.nexoraIcon.height}
                sizes="56px"
                className="h-14 w-14 rounded-2xl object-contain"
              />
              <h2 className="text-balance text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
                {dict.home.nexora.title}
              </h2>
            </div>

            <p className="text-pretty leading-relaxed text-muted">{dict.home.nexora.subtitle}</p>

            <ul className="grid gap-2.5 sm:grid-cols-2">
              {[
                dict.home.nexora.highlight1,
                dict.home.nexora.highlight2,
                dict.home.nexora.highlight3,
                dict.home.nexora.highlight4,
              ].map((highlight) => (
                <li key={highlight} className="flex items-start gap-2 text-sm">
                  <CheckCircle2
                    size={17}
                    strokeWidth={2}
                    className="mt-0.5 shrink-0 text-[var(--brand-cyan-500)] dark:text-[var(--brand-cyan-400)]"
                    aria-hidden
                  />
                  <span className="text-foreground/85">{highlight}</span>
                </li>
              ))}
            </ul>

            <div className="mt-2 flex flex-wrap gap-3">
              <ButtonLink
                href={localePath(locale, 'products/nexora-store')}
                variant="primary"
                size="lg"
              >
                {dict.cta.exploreNexora}
                <Arrow size={17} strokeWidth={2.2} aria-hidden />
              </ButtonLink>
              <ButtonLink
                href={`${localePath(locale, 'products/nexora-store')}#download`}
                variant="outline"
                size="lg"
              >
                <Download size={17} strokeWidth={2} aria-hidden />
                {dict.cta.download}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-[var(--brand-blue-600)]/14 to-[var(--brand-cyan-400)]/14 blur-2xl"
              aria-hidden
            />
            <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-lift">
              <Image
                src={media.nexoraHeroDashboard.src}
                alt={media.nexoraHeroDashboard.alt[locale]}
                width={media.nexoraHeroDashboard.width}
                height={media.nexoraHeroDashboard.height}
                sizes="(max-width: 1024px) 100vw, 560px"
                className="h-auto w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* لماذا منظومة */}
      <section className="section">
        <div className="container-page flex flex-col gap-10">
          <SectionHeader
            badge={dict.home.why.badge}
            title={dict.home.why.title}
            subtitle={dict.home.why.subtitle}
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_ITEMS.map((item, index) => {
              const text = whyText[item.titleKey];
              if (!text) return null;

              return (
                <Reveal key={item.titleKey} delay={index * 60} className="h-full">
                  <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-soft transition-colors hover:border-[var(--brand-blue-600)]/40">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-blue-600)]/10 text-[var(--brand-blue-600)] dark:text-[var(--brand-cyan-400)]">
                      <Icon name={item.icon} size={21} />
                    </span>
                    <h3 className="text-base font-bold">{text.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{text.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* كيف نعمل */}
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

      {/* التقنيات */}
      <section className="section">
        <div className="container-page flex flex-col gap-10">
          <SectionHeader
            badge={dict.home.tech.badge}
            title={dict.home.tech.title}
            subtitle={dict.home.tech.subtitle}
          />
          <TechnologyGrid locale={locale} />
        </div>
      </section>

      {/* المنتجات */}
      <section className="border-y border-border bg-background-subtle section">
        <div className="container-page flex flex-col gap-10">
          <SectionHeader
            badge={dict.solutions.badge}
            title={dict.solutions.productsTitle}
            subtitle={nexoraStore[locale].tagline}
          />
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

      {/* أعمالنا — تُعرض فقط عند وجود عناصر */}
      {hasPortfolio ? (
        <section className="section">
          <div className="container-page flex flex-col gap-10">
            <SectionHeader
              badge={dict.home.portfolio.badge}
              title={dict.home.portfolio.title}
              subtitle={dict.home.portfolio.subtitle}
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {portfolio.map((item) => (
                <Reveal key={item.slug} className="h-full">
                  <article className="flex h-full flex-col gap-2 rounded-2xl border border-border bg-card p-6 shadow-soft">
                    <h3 className="text-lg font-bold">{item[locale].title}</h3>
                    <p className="text-sm text-muted">{item[locale].summary}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* شهادات العملاء — تُعرض فقط عند وجود شهادات حقيقية موثّقة */}
      {hasTestimonials ? (
        <section className="section">
          <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <Reveal key={item.id} className="h-full">
                <blockquote className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <p className="text-sm leading-relaxed">{item.quote[locale]}</p>
                  <footer className="mt-auto text-xs font-bold text-muted">
                    {item.author} — {item.role[locale]}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {/* المدونة */}
      {hasBlogPosts ? (
        <section className="section">
          <div className="container-page flex flex-col gap-10">
            <SectionHeader
              badge={dict.home.blog.badge}
              title={dict.home.blog.title}
              subtitle={dict.home.blog.subtitle}
            />

            <div className="grid gap-5 md:grid-cols-3">
              {posts.map((post, index) => (
                <Reveal key={post.slug} delay={index * 70} className="h-full">
                  <Link
                    href={localePath(locale, `blog/${post.slug}`)}
                    className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-[var(--brand-blue-600)]/45 hover:shadow-lift"
                  >
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <span className="rounded-full bg-[var(--brand-blue-600)]/10 px-2.5 py-1 font-bold text-[var(--brand-blue-600)] dark:text-[var(--brand-cyan-400)]">
                        {post[locale].category}
                      </span>
                      <span className="nums">{formatDate(post.date, locale)}</span>
                    </div>
                    <h3 className="text-base font-bold leading-snug">{post[locale].title}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-muted">
                      {post[locale].excerpt}
                    </p>
                    <span className="nums text-xs font-semibold text-muted">
                      {post.readMinutes} {dict.common.minutesRead}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>

            <Reveal className="flex justify-center">
              <ButtonLink href={localePath(locale, 'blog')} variant="outline" size="lg">
                {dict.cta.viewAll}
                <Arrow size={17} strokeWidth={2.2} aria-hidden />
              </ButtonLink>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* أسئلة شائعة */}
      <section className="border-t border-border bg-background-subtle section">
        <div className="container-page flex flex-col gap-8">
          <SectionHeader title={dict.common.faqTitle} />
          <div className="mx-auto w-full max-w-3xl">
            <FAQ
              items={generalFaq.map((item) => ({
                id: item.id,
                q: item[locale].q,
                a: item[locale].a,
              }))}
            />
          </div>
        </div>
      </section>

      <CTASection
        locale={locale}
        dict={dict}
        title={dict.home.cta.title}
        subtitle={dict.home.cta.subtitle}
        secondaryHref={localePath(locale, 'products/nexora-store')}
        secondaryLabel={dict.cta.exploreNexora}
      />
    </>
  );
}
