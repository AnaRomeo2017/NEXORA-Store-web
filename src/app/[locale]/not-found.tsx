import Image from 'next/image';
import { ButtonLink } from '@/components/Button';
import { media } from '@/data/media';
import { ar } from '@/data/i18n/ar';
import { defaultLocale, localePath } from '@/lib/i18n';

/**
 * صفحة 404 داخل نطاق اللغة.
 * ملاحظة: `not-found` لا يستقبل params، لذا تُستخدم اللغة الافتراضية.
 */
export default function LocaleNotFound() {
  const dict = ar;
  const locale = defaultLocale;

  return (
    <section className="section">
      <div className="container-page flex flex-col items-center gap-6 py-16 text-center">
        <Image
          src={media.menzomaBrand.src}
          alt={media.menzomaBrand.alt[locale]}
          width={media.menzomaBrand.width}
          height={media.menzomaBrand.height}
          sizes="96px"
          className="h-24 w-24 rounded-2xl object-contain opacity-90"
        />

        <span className="nums text-gradient-brand text-6xl font-black sm:text-7xl">
          {dict.notFound.code}
        </span>

        <h1 className="text-2xl font-extrabold sm:text-3xl">{dict.notFound.title}</h1>
        <p className="max-w-lg text-pretty leading-relaxed text-muted">{dict.notFound.body}</p>

        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <ButtonLink href={localePath(locale)} variant="primary" size="lg">
            {dict.cta.backHome}
          </ButtonLink>
          <ButtonLink href={localePath(locale, 'services')} variant="outline" size="lg">
            {dict.cta.allServices}
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
    </section>
  );
}
