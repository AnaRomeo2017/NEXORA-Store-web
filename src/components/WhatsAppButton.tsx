'use client';

import { MessageCircle } from 'lucide-react';
import { defaultWhatsAppMessage, siteConfig, whatsappLink } from '@/config/site';
import { trackEvent } from '@/lib/analytics';
import type { Locale } from '@/lib/i18n';

export type WhatsAppButtonProps = {
  locale: Locale;
  label: string;
};

/**
 * زر واتساب عائم — يظهر في كل الصفحات عند ضبط الرقم.
 */
export function WhatsAppButton({ locale, label }: WhatsAppButtonProps) {
  const href = whatsappLink(defaultWhatsAppMessage(locale), locale);
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      onClick={() => trackEvent('whatsapp_click', { locale })}
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_38px_-12px_rgba(37,211,102,0.85)] transition-transform hover:scale-105 focus-visible:scale-105"
    >
      <span
        className="pulse-ring absolute inset-0 rounded-full bg-[#25D366]/50"
        aria-hidden
      />
      <MessageCircle size={26} strokeWidth={2} aria-hidden />
      <span className="sr-only">{label} — {siteConfig.whatsapp.value}</span>
    </a>
  );
}

export default WhatsAppButton;
