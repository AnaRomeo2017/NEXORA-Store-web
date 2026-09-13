import { ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import { ButtonLink } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { defaultWhatsAppMessage, whatsappLink } from '@/config/site';
import { localePath, type Dictionary, type Locale } from '@/lib/i18n';

export type CTASectionProps = {
  locale: Locale;
  dict: Dictionary;
  title: string;
  subtitle: string;
  /** الزر الرئيسي — افتراضياً واتساب */
  primaryHref?: string;
  primaryLabel?: string;
  primaryExternal?: boolean;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function CTASection({
  locale,
  dict,
  title,
  subtitle,
  primaryHref,
  primaryLabel,
  primaryExternal,
  secondaryHref,
  secondaryLabel,
}: CTASectionProps) {
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;
  const waHref = whatsappLink(defaultWhatsAppMessage(locale), locale);
  const resolvedPrimary = primaryHref ?? waHref ?? localePath(locale, 'contact');
  const isExternal =
    primaryExternal !== undefined
      ? primaryExternal
      : resolvedPrimary.startsWith('http');

  return (
    <section className="section">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[var(--brand-navy-600)]/40 bg-[var(--brand-navy-700)] px-6 py-12 text-white sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="absolute -top-24 h-72 w-72 rounded-full bg-[var(--brand-blue-600)]/40 blur-[100px] ltr:-right-16 rtl:-left-16" />
              <div className="absolute -bottom-24 h-72 w-72 rounded-full bg-[var(--brand-cyan-400)]/25 blur-[110px] ltr:-left-16 rtl:-right-16" />
            </div>

            <div className="relative flex flex-col items-center gap-5 text-center">
              <h2 className="text-balance text-2xl font-extrabold leading-tight sm:text-4xl">
                {title}
              </h2>
              <p className="max-w-2xl text-pretty text-sm leading-relaxed text-white/80 sm:text-base">
                {subtitle}
              </p>

              <div className="mt-2 flex flex-wrap justify-center gap-3">
                <ButtonLink
                  href={resolvedPrimary}
                  external={isExternal}
                  variant="accent"
                  size="lg"
                >
                  {!primaryHref && waHref ? (
                    <MessageCircle size={17} strokeWidth={2} aria-hidden />
                  ) : null}
                  {primaryLabel ?? dict.cta.consult}
                  <Arrow size={17} strokeWidth={2.2} aria-hidden />
                </ButtonLink>

                {secondaryHref && secondaryLabel ? (
                  <ButtonLink
                    href={secondaryHref}
                    external={secondaryHref.startsWith('http')}
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:border-white hover:text-white"
                  >
                    {secondaryLabel}
                  </ButtonLink>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default CTASection;
