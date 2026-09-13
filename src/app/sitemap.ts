import type { MetadataRoute } from 'next';
import { blogSlugs } from '@/data/blog';
import { hasPortfolio } from '@/data/portfolio';
import { serviceSlugs } from '@/data/services';
import { locales, localePath } from '@/lib/i18n';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    '',
    'about',
    'services',
    'solutions',
    'products/nexora-store',
    'blog',
    'contact',
    ...(hasPortfolio ? ['portfolio'] : []),
  ];

  const dynamicPaths = [
    ...serviceSlugs.map((slug) => `services/${slug}`),
    ...blogSlugs.map((slug) => `blog/${slug}`),
  ];

  const allPaths = [...staticPaths, ...dynamicPaths];
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    allPaths.map((path) => ({
      url: absoluteUrl(localePath(locale, path).slice(1)),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : path === 'products/nexora-store' ? 0.9 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [alt, absoluteUrl(localePath(alt, path).slice(1))]),
        ),
      },
    })),
  );
}
