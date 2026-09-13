import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ButtonLink } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { media } from '@/data/media';
import type { Product } from '@/data/products';
import { localePath, type Dictionary, type Locale } from '@/lib/i18n';

export type ProductCardProps = {
  product: Product;
  locale: Locale;
  dict: Dictionary;
  delay?: number;
};

export function ProductCard({ product, locale, dict, delay = 0 }: ProductCardProps) {
  const content = product[locale];
  const icon = media[product.iconImage];
  const cover = media[product.image];
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;
  const available = product.status === 'available';

  return (
    <Reveal delay={delay} className="h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:border-[var(--brand-blue-600)]/40 hover:shadow-lift">
        <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-background-subtle">
          <Image
            src={cover.src}
            alt={cover.alt[locale]}
            width={cover.width}
            height={cover.height}
            sizes="(max-width: 768px) 100vw, 560px"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex items-start gap-3">
            <Image
              src={icon.src}
              alt={icon.alt[locale]}
              width={icon.width}
              height={icon.height}
              sizes="48px"
              className="h-12 w-12 shrink-0 rounded-xl object-contain"
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-extrabold leading-tight">{content.name}</h3>
              <p className="text-sm text-muted">{content.tagline}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span
              className={
                available
                  ? 'rounded-full bg-[var(--success)]/12 px-2.5 py-1 font-bold text-[var(--success)]'
                  : 'rounded-full bg-[var(--warning)]/12 px-2.5 py-1 font-bold text-[var(--warning)]'
              }
            >
              {available ? dict.common.available : dict.common.comingSoon}
            </span>
            <span className="nums rounded-full border border-border px-2.5 py-1 font-semibold text-muted">
              v{product.version}
            </span>
            <span className="rounded-full border border-border px-2.5 py-1 font-semibold text-muted">
              {product.platforms[locale]}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-muted">{content.summary}</p>

          <ul className="flex flex-col gap-2">
            {content.highlights.slice(0, 4).map((highlight) => (
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

          <div className="mt-auto flex flex-wrap gap-3 pt-2">
            <ButtonLink href={localePath(locale, product.href)} variant="primary" size="md">
              {dict.cta.learnMore}
              <Arrow size={16} strokeWidth={2.2} aria-hidden />
            </ButtonLink>
            <Link
              href={`${localePath(locale, product.href)}#download`}
              className="inline-flex h-11 items-center rounded-xl border border-border-strong px-5 text-[0.95rem] font-semibold transition-colors hover:border-[var(--brand-blue-600)] hover:text-[var(--brand-blue-600)] dark:hover:border-[var(--brand-cyan-400)] dark:hover:text-[var(--brand-cyan-400)]"
            >
              {dict.cta.download}
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default ProductCard;
