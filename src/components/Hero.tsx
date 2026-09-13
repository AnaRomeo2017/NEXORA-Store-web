import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { ButtonLink } from '@/components/Button';
import { defaultWhatsAppMessage, whatsappLink } from '@/config/site';
import { media } from '@/data/media';
import { localePath, type Dictionary, type Locale } from '@/lib/i18n';

export type HeroProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Hero({ locale, dict }: HeroProps) {
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;
  const points = [dict.home.hero.point1, dict.home.hero.point2, dict.home.hero.point3];
  const waHref = whatsappLink(defaultWhatsAppMessage(locale), locale) ?? localePath(locale, 'contact');

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* خلفية */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="absolute -top-32 h-96 w-96 rounded-full bg-[var(--brand-blue-600)]/18 blur-[120px] ltr:-left-24 rtl:-right-24" />
        <div className="absolute top-10 h-80 w-80 rounded-full bg-[var(--brand-cyan-400)]/16 blur-[120px] ltr:right-0 rtl:left-0" />
      </div>

      <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-blue-600)]/25 bg-[var(--brand-blue-600)]/8 px-4 py-2 text-xs font-bold text-[var(--brand-blue-600)] dark:border-[var(--brand-cyan-400)]/25 dark:bg-[var(--brand-cyan-400)]/10 dark:text-[var(--brand-cyan-400)]">
            <Sparkles size={14} strokeWidth={2.2} aria-hidden />
            {dict.home.hero.badge}
          </span>

          <h1 className="text-balance text-4xl font-extrabold leading-[1.15] sm:text-5xl lg:text-6xl">
            <span className="block text-gradient-brand pb-1 text-5xl font-black sm:text-6xl lg:text-7xl">
              {dict.home.hero.titleLead}
            </span>
            <span className="mt-1 block">{dict.home.hero.titleRest}</span>
          </h1>

          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {dict.home.hero.subtitle}
          </p>

          <ul className="flex flex-col gap-2.5">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm sm:text-base">
                <CheckCircle2
                  size={19}
                  strokeWidth={2}
                  className="mt-0.5 shrink-0 text-[var(--brand-cyan-500)] dark:text-[var(--brand-cyan-400)]"
                  aria-hidden
                />
                <span className="text-foreground/85">{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-2 flex flex-wrap gap-3">
            <ButtonLink href={waHref} external variant="primary" size="lg">
              {dict.cta.consult}
              <Arrow size={17} strokeWidth={2.2} aria-hidden />
            </ButtonLink>
            <ButtonLink
              href={localePath(locale, 'products/nexora-store')}
              variant="outline"
              size="lg"
            >
              {dict.cta.exploreNexora}
            </ButtonLink>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-[var(--brand-blue-600)]/12 via-transparent to-[var(--brand-cyan-400)]/14 blur-2xl" aria-hidden />
          <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-lift">
            <Image
              src={media.menzomaHero.src}
              alt={media.menzomaHero.alt[locale]}
              width={media.menzomaHero.width}
              height={media.menzomaHero.height}
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="h-auto w-full object-cover"
            />
          </div>
          <p className="mt-3 text-center text-xs text-muted">{dict.home.hero.imageCaption}</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
