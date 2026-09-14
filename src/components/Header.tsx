'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft, Menu, X } from 'lucide-react';
import { ButtonLink } from '@/components/Button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import { defaultWhatsAppMessage, whatsappLink } from '@/config/site';
import { media } from '@/data/media';
import { localePath, type Dictionary, type Locale } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

export type HeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: HeaderProps) {
  const pathname = usePathname() ?? localePath(locale);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: '', label: dict.nav.home },
    { href: 'about', label: dict.nav.about },
    { href: 'services', label: dict.nav.services },
    { href: 'solutions', label: dict.nav.solutions },
    { href: 'products/nexora-store', label: dict.nav.nexora },
    { href: 'blog', label: dict.nav.blog },
    { href: 'contact', label: dict.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string): boolean => {
    const full = localePath(locale, href);
    if (href === '') return pathname === localePath(locale) || pathname === `${localePath(locale)}/`;
    return pathname === full || pathname.startsWith(`${full}/`);
  };

  const CtaArrow = locale === 'ar' ? ArrowLeft : ArrowRight;
  const waHref = whatsappLink(defaultWhatsAppMessage(locale), locale) ?? localePath(locale, 'contact');

  return (
    <>
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70'
          : 'border-b border-transparent bg-background/40 backdrop-blur-sm',
      )}
      style={{ height: 'var(--header-height)' }}
    >
      <div className="container-page flex h-full min-w-0 items-center justify-between gap-4">
        <Link
          href={localePath(locale)}
          className="flex shrink-0 items-center gap-2.5"
          aria-label={dict.brand.fullName}
        >
          <Image
            src={media.menzomaBrand.src}
            alt={media.menzomaBrand.alt[locale]}
            width={media.menzomaBrand.width}
            height={media.menzomaBrand.height}
            sizes="44px"
            priority
            className="h-10 w-10 rounded-xl object-contain"
          />
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight">{dict.brand.name}</span>
            <span className="mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted">
              {locale === 'ar' ? 'للبرمجيات' : 'Software'}
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label={dict.nav.menu}
        >
          {navItems.map((item) => (
            <Link
              key={item.href || 'home'}
              href={localePath(locale, item.href)}
              onClick={() => trackEvent('nav_click', { path: item.href, locale })}
              className={cn(
                'rounded-lg px-3 py-2 text-[0.9rem] font-semibold transition-colors',
                isActive(item.href)
                  ? 'text-[var(--brand-blue-600)] dark:text-[var(--brand-cyan-400)]'
                  : 'text-foreground/75 hover:text-foreground',
              )}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex min-w-0 items-center gap-2">
          <div className="max-sm:hidden">
            <LanguageSwitcher
              locale={locale}
              label={dict.common.switchToEnglish}
              switchLabel={dict.common.switchLanguage}
            />
          </div>
          <ThemeToggle label={dict.common.toggleTheme} />

          <div className="max-xl:hidden">
            <ButtonLink href={waHref} external variant="primary" size="md">
              {dict.cta.consult}
              <CtaArrow size={16} strokeWidth={2.2} aria-hidden />
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground lg:hidden"
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </div>
    </header>

      {open ? (
      <div
        id="mobile-menu"
        className="fixed inset-x-0 bottom-0 z-[60] overflow-y-auto border-t border-border bg-background px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-4 lg:hidden"
        style={{ top: 'var(--header-height)' }}
      >
        <nav className="flex flex-col gap-1" aria-label={dict.nav.menu}>
          {navItems.map((item) => (
            <Link
              key={item.href || 'home'}
              href={localePath(locale, item.href)}
              className={cn(
                'rounded-xl px-4 py-3 text-base font-semibold transition-colors',
                isActive(item.href)
                  ? 'bg-[var(--brand-blue-600)]/10 text-[var(--brand-blue-600)] dark:text-[var(--brand-cyan-400)]'
                  : 'text-foreground/85 hover:bg-background-subtle',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-5 flex flex-col gap-3">
          <ButtonLink href={waHref} external variant="primary" size="lg">
            {dict.cta.consult}
          </ButtonLink>
          <ButtonLink
            href={localePath(locale, 'products/nexora-store')}
            variant="outline"
            size="lg"
          >
            {dict.cta.exploreNexora}
          </ButtonLink>
          <LanguageSwitcher
            locale={locale}
            label={dict.common.switchToEnglish}
            switchLabel={dict.common.switchLanguage}
            className="justify-center sm:hidden"
          />
        </div>
      </div>
      ) : null}
    </>
  );
}

export default Header;
