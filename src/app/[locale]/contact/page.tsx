import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ButtonLink } from '@/components/Button';
import { FAQ } from '@/components/FAQ';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { SectionHeader } from '@/components/SectionHeader';
import {
  defaultWhatsAppMessage,
  siteConfig,
  telLink,
  whatsappLink,
} from '@/config/site';
import { generalFaq } from '@/data/faq';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from '@/lib/seo';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'ar';
  const dict = getDictionary(locale);

  return buildMetadata({
    locale,
    title: dict.contact.metaTitle,
    description: dict.contact.subtitle,
    path: 'contact',
  });
}

export default async function ContactPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);

  const phoneHref = telLink();
  const waHref = whatsappLink(defaultWhatsAppMessage(locale), locale);

  const showAddress = !siteConfig.address.isPlaceholder;
  const showHours = !siteConfig.workingHours.isPlaceholder;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale, [
            { name: dict.nav.home, path: '' },
            { name: dict.contact.metaTitle, path: 'contact' },
          ]),
          faqJsonLd(generalFaq.map((item) => ({ q: item[locale].q, a: item[locale].a }))),
        ]}
      />

      <section className="border-b border-border bg-background-subtle">
        <div className="container-page flex flex-col gap-8 py-12 lg:py-16">
          <Breadcrumbs
            locale={locale}
            label={dict.common.breadcrumb}
            items={[{ label: dict.nav.home, href: '' }, { label: dict.contact.metaTitle }]}
          />
          <SectionHeader
            as="h1"
            align="start"
            badge={dict.contact.badge}
            title={dict.contact.title}
            subtitle={dict.contact.subtitle}
          />
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <div className="flex flex-col items-start gap-5 rounded-2xl border border-border bg-card p-8 shadow-soft sm:p-10">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366]/15 text-[#1da851]">
                <MessageCircle size={28} strokeWidth={2} aria-hidden />
              </span>
              <h2 className="text-2xl font-extrabold">{dict.contact.formTitle}</h2>
              <p className="max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                {dict.contact.responseNote}
              </p>
              {waHref ? (
                <ButtonLink href={waHref} external variant="primary" size="lg">
                  <MessageCircle size={18} strokeWidth={2} aria-hidden />
                  {dict.cta.whatsapp}
                </ButtonLink>
              ) : (
                <p className="rounded-xl border border-dashed border-border-strong bg-background-subtle p-4 text-sm text-muted">
                  {dict.common.contactNotConfigured}
                </p>
              )}
              <p className="nums text-sm font-bold text-foreground/80">
                {siteConfig.phone.value}
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-extrabold">{dict.contact.infoTitle}</h2>

            <Reveal delay={60}>
              <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
                <ul className="flex flex-col gap-3">
                  {phoneHref ? (
                    <li>
                      <a
                        href={phoneHref}
                        className="flex items-center gap-3 rounded-xl border border-border p-3.5 transition-colors hover:border-[var(--brand-blue-600)]/50"
                      >
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-blue-600)]/10 text-[var(--brand-blue-600)] dark:text-[var(--brand-cyan-400)]">
                          <Phone size={18} strokeWidth={2} aria-hidden />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-xs font-semibold text-muted">{dict.cta.call}</span>
                          <span className="nums text-sm font-bold">{siteConfig.phone.value}</span>
                        </span>
                      </a>
                    </li>
                  ) : null}

                  {waHref ? (
                    <li>
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-xl border border-border p-3.5 transition-colors hover:border-[#25D366]/60"
                      >
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#25D366]/14 text-[#1da851]">
                          <MessageCircle size={18} strokeWidth={2} aria-hidden />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-xs font-semibold text-muted">WhatsApp</span>
                          <span className="text-sm font-bold">{dict.cta.whatsapp}</span>
                        </span>
                      </a>
                    </li>
                  ) : null}
                </ul>

                {showAddress ? (
                  <div className="flex items-start gap-3 border-t border-border pt-4">
                    <MapPin size={18} strokeWidth={2} className="mt-0.5 text-muted" aria-hidden />
                    <span className="flex flex-col">
                      <span className="text-xs font-semibold text-muted">
                        {dict.contact.addressTitle}
                      </span>
                      <span className="text-sm font-bold">{siteConfig.address[locale]}</span>
                    </span>
                  </div>
                ) : null}

                {showHours ? (
                  <div className="flex items-start gap-3 border-t border-border pt-4">
                    <Clock size={18} strokeWidth={2} className="mt-0.5 text-muted" aria-hidden />
                    <span className="flex flex-col">
                      <span className="text-xs font-semibold text-muted">
                        {dict.contact.hoursTitle}
                      </span>
                      <span className="text-sm font-bold">{siteConfig.workingHours[locale]}</span>
                    </span>
                  </div>
                ) : null}
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="flex flex-col gap-3 rounded-2xl border border-border bg-background-subtle p-6">
                <h3 className="text-base font-extrabold">{dict.nexora.hero.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{dict.nexora.hero.trialNote}</p>
                <ButtonLink
                  href={`/${locale}/products/nexora-store#download`}
                  variant="outline"
                  size="md"
                >
                  {dict.cta.download}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background-subtle section">
        <div className="container-page flex flex-col gap-8">
          <SectionHeader title={dict.contact.faqTitle} />
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
    </>
  );
}
