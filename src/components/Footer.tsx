import Image from 'next/image';
import Link from 'next/link';
import { Download, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { media } from '@/data/media';
import { services } from '@/data/services';
import {
  activeSocialLinks,
  defaultWhatsAppMessage,
  mailLink,
  siteConfig,
  telLink,
  whatsappLink,
} from '@/config/site';
import { localePath, type Dictionary, type Locale } from '@/lib/i18n';

export type FooterProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Footer({ locale, dict }: FooterProps) {
  const year = new Date().getFullYear();
  const brandName = locale === 'ar' ? siteConfig.siteName : siteConfig.siteNameEn;
  const socials = activeSocialLinks();
  const phoneHref = telLink();
  const emailHref = mailLink();
  const waHref = whatsappLink(defaultWhatsAppMessage(locale), locale);

  const quickLinks = [
    { href: '', label: dict.nav.home },
    { href: 'about', label: dict.nav.about },
    { href: 'services', label: dict.nav.services },
    { href: 'solutions', label: dict.nav.solutions },
    { href: 'blog', label: dict.nav.blog },
    { href: 'contact', label: dict.nav.contact },
  ];

  return (
    <footer className="mt-auto border-t border-border bg-background-subtle">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Link href={localePath(locale)} className="flex items-center gap-2.5">
            <Image
              src={media.menzomaBrand.src}
              alt={media.menzomaBrand.alt[locale]}
              width={media.menzomaBrand.width}
              height={media.menzomaBrand.height}
              sizes="48px"
              className="h-11 w-11 rounded-xl object-contain"
            />
            <span className="text-lg font-extrabold">{brandName}</span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-muted">{dict.footer.about}</p>

          {socials.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              <span className="sr-only">{dict.footer.followUs}</span>
              {socials.map((social) => (
                <a
                  key={social.key}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold capitalize text-muted transition-colors hover:text-foreground"
                >
                  {social.key}
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
            {dict.footer.quickLinks}
          </h2>
          <ul className="flex flex-col gap-2">
            {quickLinks.map((link) => (
              <li key={link.href || 'home'}>
                <Link
                  href={localePath(locale, link.href)}
                  className="text-sm text-muted transition-colors hover:text-[var(--brand-blue-600)] dark:hover:text-[var(--brand-cyan-400)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
            {dict.footer.servicesTitle}
          </h2>
          <ul className="flex flex-col gap-2">
            {services.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link
                  href={localePath(locale, `services/${service.slug}`)}
                  className="text-sm text-muted transition-colors hover:text-[var(--brand-blue-600)] dark:hover:text-[var(--brand-cyan-400)]"
                >
                  {service[locale].title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
            {dict.footer.productsTitle}
          </h2>

          <Link
            href={localePath(locale, 'products/nexora-store')}
            className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:border-[var(--brand-blue-600)]/45"
          >
            <Image
              src={media.nexoraIcon.src}
              alt={media.nexoraIcon.alt[locale]}
              width={media.nexoraIcon.width}
              height={media.nexoraIcon.height}
              sizes="40px"
              className="h-10 w-10 rounded-lg object-contain"
            />
            <span className="flex flex-col">
              <span className="text-sm font-bold">NEXORA Store</span>
              <span className="nums text-xs text-muted">v0.1.0 · Windows</span>
            </span>
          </Link>

          <Link
            href={`${localePath(locale, 'products/nexora-store')}#download`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-blue-600)] hover:underline dark:text-[var(--brand-cyan-400)]"
          >
            <Download size={15} strokeWidth={2} aria-hidden />
            {dict.footer.downloadNexora}
          </Link>

          <h2 className="mt-3 text-sm font-bold uppercase tracking-wider text-foreground">
            {dict.footer.contactTitle}
          </h2>
          <ul className="flex flex-col gap-2 text-sm text-muted">
            {phoneHref ? (
              <li>
                <a href={phoneHref} className="nums inline-flex items-center gap-2 hover:text-foreground">
                  <Phone size={15} strokeWidth={1.9} aria-hidden />
                  {siteConfig.phone.value}
                </a>
              </li>
            ) : null}
            {waHref ? (
              <li>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-foreground"
                >
                  <MessageCircle size={15} strokeWidth={1.9} aria-hidden />
                  {dict.cta.whatsapp}
                </a>
              </li>
            ) : null}
            {emailHref ? (
              <li>
                <a href={emailHref} className="inline-flex items-center gap-2 hover:text-foreground">
                  <Mail size={15} strokeWidth={1.9} aria-hidden />
                  {siteConfig.email.value}
                </a>
              </li>
            ) : null}
            {!siteConfig.address.isPlaceholder ? (
              <li className="inline-flex items-center gap-2">
                <MapPin size={15} strokeWidth={1.9} aria-hidden />
                {siteConfig.address[locale]}
              </li>
            ) : null}
            {!phoneHref && !emailHref && !waHref ? (
              <li className="text-xs">{dict.common.contactNotConfigured}</li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted sm:flex-row">
          <p className="nums">
            © {year} {brandName} — {dict.footer.rights}
          </p>
          <p>{dict.common.madeWith}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
