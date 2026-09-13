import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { SectionHeader } from '@/components/SectionHeader';
import { getSortedBlogPosts, hasBlogPosts } from '@/data/blog';
import { getDictionary, isLocale, localePath, type Locale } from '@/lib/i18n';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/utils';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'ar';
  const dict = getDictionary(locale);

  return buildMetadata({
    locale,
    title: dict.blog.metaTitle,
    description: dict.blog.subtitle,
    path: 'blog',
  });
}

export default async function BlogPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);
  const posts = getSortedBlogPosts();
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: '' },
          { name: dict.blog.metaTitle, path: 'blog' },
        ])}
      />

      <section className="border-b border-border bg-background-subtle">
        <div className="container-page flex flex-col gap-8 py-12 lg:py-16">
          <Breadcrumbs
            locale={locale}
            label={dict.common.breadcrumb}
            items={[{ label: dict.nav.home, href: '' }, { label: dict.blog.metaTitle }]}
          />
          <SectionHeader
            as="h1"
            align="start"
            badge={dict.blog.badge}
            title={dict.blog.title}
            subtitle={dict.blog.subtitle}
          />
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          {hasBlogPosts ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Reveal key={post.slug} delay={index * 70} className="h-full">
                  <article className="h-full">
                    <Link
                      href={localePath(locale, `blog/${post.slug}`)}
                      className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-[var(--brand-blue-600)]/45 hover:shadow-lift"
                    >
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded-full bg-[var(--brand-blue-600)]/10 px-2.5 py-1 font-bold text-[var(--brand-blue-600)] dark:text-[var(--brand-cyan-400)]">
                          {post[locale].category}
                        </span>
                        <span className="nums text-muted">{formatDate(post.date, locale)}</span>
                      </div>

                      <h2 className="text-lg font-bold leading-snug">{post[locale].title}</h2>
                      <p className="flex-1 text-sm leading-relaxed text-muted">
                        {post[locale].excerpt}
                      </p>

                      <div className="flex items-center justify-between gap-2 border-t border-border pt-3">
                        <span className="nums inline-flex items-center gap-1.5 text-xs font-semibold text-muted">
                          <Clock size={13} strokeWidth={2} aria-hidden />
                          {post.readMinutes} {dict.common.minutesRead}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--brand-blue-600)] dark:text-[var(--brand-cyan-400)]">
                          {dict.cta.readMore}
                          <Arrow
                            size={15}
                            strokeWidth={2.4}
                            className="transition-transform group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1"
                            aria-hidden
                          />
                        </span>
                      </div>
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="mx-auto flex max-w-xl flex-col items-center gap-3 rounded-2xl border border-dashed border-border-strong bg-card p-10 text-center">
                <h2 className="text-xl font-extrabold">{dict.blog.emptyTitle}</h2>
                <p className="text-muted">{dict.blog.emptyBody}</p>
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
