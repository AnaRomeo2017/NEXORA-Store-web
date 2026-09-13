import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock, Info } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { SectionHeader } from '@/components/SectionHeader';
import { blogPosts, getBlogPost, getRelatedPosts } from '@/data/blog';
import type { BlogBlock } from '@/data/blog';
import { getDictionary, isLocale, localePath, locales, type Locale } from '@/lib/i18n';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/utils';

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams(): Array<{ locale: string; slug: string }> {
  return locales.flatMap((locale) => blogPosts.map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'ar';
  const post = getBlogPost(slug);
  const dict = getDictionary(locale);

  if (!post) {
    return buildMetadata({
      locale,
      title: dict.notFound.title,
      description: dict.notFound.body,
      path: `blog/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    locale,
    title: post[locale].title,
    description: post[locale].excerpt,
    path: `blog/${slug}`,
    type: 'article',
    publishedTime: post.date,
  });
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="mt-4 text-xl font-extrabold sm:text-2xl">{block.text}</h2>;

    case 'p':
      return <p className="leading-[1.9] text-foreground/85">{block.text}</p>;

    case 'ul':
      return (
        <ul className="flex flex-col gap-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 leading-relaxed text-foreground/85">
              <span
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-cyan-500)] dark:bg-[var(--brand-cyan-400)]"
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
      );

    case 'ol':
      return (
        <ol className="flex flex-col gap-3">
          {block.items.map((item, index) => (
            <li key={item} className="flex items-start gap-3 leading-relaxed text-foreground/85">
              <span className="nums mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-blue-600)]/12 text-xs font-black text-[var(--brand-blue-600)] dark:text-[var(--brand-cyan-400)]">
                {index + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      );

    case 'note':
      return (
        <aside className="flex items-start gap-3 rounded-2xl border border-[var(--brand-blue-600)]/30 bg-[var(--brand-blue-600)]/6 p-5">
          <Info
            size={19}
            strokeWidth={2}
            className="mt-0.5 shrink-0 text-[var(--brand-blue-600)] dark:text-[var(--brand-cyan-400)]"
            aria-hidden
          />
          <p className="text-sm font-semibold leading-relaxed">{block.text}</p>
        </aside>
      );

    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);
  const post = getBlogPost(slug);
  if (!post) notFound();

  const content = post[locale];
  const related = getRelatedPosts(slug);
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;
  const headings = content.body.filter(
    (block): block is Extract<BlogBlock, { type: 'h2' }> => block.type === 'h2',
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale, [
            { name: dict.nav.home, path: '' },
            { name: dict.blog.metaTitle, path: 'blog' },
            { name: content.title, path: `blog/${slug}` },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: content.title,
            description: content.excerpt,
            datePublished: post.date,
            inLanguage: locale,
            articleSection: content.category,
          },
        ]}
      />

      <section className="border-b border-border bg-background-subtle">
        <div className="container-page flex flex-col gap-6 py-12 lg:py-16">
          <Breadcrumbs
            locale={locale}
            label={dict.common.breadcrumb}
            items={[
              { label: dict.nav.home, href: '' },
              { label: dict.blog.metaTitle, href: 'blog' },
              { label: content.title },
            ]}
          />

          <div className="flex max-w-3xl flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-[var(--brand-blue-600)]/10 px-3 py-1 font-bold text-[var(--brand-blue-600)] dark:text-[var(--brand-cyan-400)]">
                {content.category}
              </span>
              <span className="nums text-muted">
                {dict.blog.publishedOn} {formatDate(post.date, locale)}
              </span>
              <span className="nums inline-flex items-center gap-1.5 text-muted">
                <Clock size={13} strokeWidth={2} aria-hidden />
                {post.readMinutes} {dict.common.minutesRead}
              </span>
            </div>

            <h1 className="text-balance text-3xl font-extrabold leading-tight sm:text-4xl">
              {content.title}
            </h1>
            <p className="text-pretty text-lg leading-relaxed text-muted">{content.excerpt}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_16rem]">
          <article className="flex max-w-3xl flex-col gap-5">
            {content.body.map((block, index) => (
              <Block key={`${block.type}-${index}`} block={block} />
            ))}

            <Link
              href={localePath(locale, 'blog')}
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-blue-600)] hover:underline dark:text-[var(--brand-cyan-400)]"
            >
              <Arrow size={15} strokeWidth={2.4} aria-hidden />
              {dict.blog.backToBlog}
            </Link>
          </article>

          {headings.length > 0 ? (
            <aside className="hidden lg:block">
              <div
                className="sticky flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft"
                style={{ top: 'calc(var(--header-height) + 1.5rem)' }}
              >
                <h2 className="text-sm font-extrabold">{dict.blog.tocTitle}</h2>
                <ol className="flex flex-col gap-2">
                  {headings.map((heading, index) => (
                    <li key={heading.text} className="flex gap-2 text-xs leading-relaxed text-muted">
                      <span className="nums font-bold text-[var(--brand-blue-600)] dark:text-[var(--brand-cyan-400)]">
                        {index + 1}.
                      </span>
                      {heading.text}
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          ) : null}
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-border bg-background-subtle section">
          <div className="container-page flex flex-col gap-8">
            <SectionHeader title={dict.blog.relatedTitle} />
            <div className="grid gap-5 md:grid-cols-2">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 70} className="h-full">
                  <Link
                    href={localePath(locale, `blog/${item.slug}`)}
                    className="flex h-full flex-col gap-2 rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-[var(--brand-blue-600)]/45"
                  >
                    <span className="nums text-xs text-muted">{formatDate(item.date, locale)}</span>
                    <h3 className="text-base font-bold leading-snug">{item[locale].title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{item[locale].excerpt}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection
        locale={locale}
        dict={dict}
        title={dict.home.cta.title}
        subtitle={dict.home.cta.subtitle}
      />
    </>
  );
}
