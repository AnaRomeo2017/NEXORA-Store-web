'use client';

import Image from 'next/image';
import { Clock, Download, Info } from 'lucide-react';
import { buttonClasses } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { defaultWhatsAppMessage, whatsappLink } from '@/config/site';
import { media } from '@/data/media';
import type { DownloadItem } from '@/data/downloads';
import { trackEvent } from '@/lib/analytics';
import { localePath, type Dictionary, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export type DownloadCardProps = {
  item: DownloadItem;
  locale: Locale;
  dict: Dictionary;
  className?: string;
};

export function DownloadCard({ item, locale, dict, className }: DownloadCardProps) {
  const content = item[locale];
  const icon = media.nexoraIcon;
  const notifyHref =
    whatsappLink(
      locale === 'ar'
        ? `مرحباً، أريد إشعاري عند توفر تحميل ${content.name}.`
        : `Hello, please notify me when ${content.name} download is available.`,
      locale,
    ) ?? whatsappLink(defaultWhatsAppMessage(locale), locale) ?? localePath(locale, 'contact');

  return (
    <div
      className={cn(
        'flex h-full flex-col gap-4 rounded-2xl border bg-card p-6 shadow-soft transition-colors',
        item.available
          ? 'border-[var(--brand-blue-600)]/35 hover:border-[var(--brand-blue-600)]/60'
          : 'border-border',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background-subtle">
            <Image
              src={icon.src}
              alt={icon.alt[locale]}
              width={icon.width}
              height={icon.height}
              sizes="44px"
              className={cn('h-10 w-10 object-contain', !item.available && 'opacity-45 grayscale')}
            />
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="flex items-center gap-2 text-lg font-extrabold">
              <Icon name={item.icon} size={18} />
              {content.name}
            </h3>
            <p className="nums text-xs font-semibold text-muted">
              {item.available ? `v${item.version} · ${item.size} · ${item.arch}` : '—'}
            </p>
          </div>
        </div>

        <span
          className={cn(
            'shrink-0 rounded-full px-2.5 py-1 text-[0.68rem] font-bold',
            item.available
              ? 'bg-[var(--success)]/14 text-[var(--success)]'
              : 'bg-[var(--warning)]/14 text-[var(--warning)]',
          )}
        >
          {item.available ? dict.common.available : dict.common.comingSoon}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-muted">{content.desc}</p>

      {item.available ? (
        <>
          <dl className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg border border-border bg-background-subtle px-3 py-2">
              <dt className="text-[0.65rem] font-semibold text-muted">{dict.common.version}</dt>
              <dd className="nums font-bold">{item.version}</dd>
            </div>
            <div className="rounded-lg border border-border bg-background-subtle px-3 py-2">
              <dt className="text-[0.65rem] font-semibold text-muted">{dict.common.size}</dt>
              <dd className="nums font-bold">{item.size}</dd>
            </div>
          </dl>

          <a
            href={item.url}
            {...(item.url.startsWith('http')
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : { download: '' })}
            onClick={() =>
              trackEvent('download_click', { platform: item.id, version: item.version, locale })
            }
            className={buttonClasses('primary', 'lg', 'mt-auto w-full')}
          >
            <Download size={18} strokeWidth={2.1} aria-hidden />
            {dict.cta.downloadWindows}
          </a>

          <p className="nums break-all text-[0.68rem] text-muted">{item.fileName}</p>
        </>
      ) : (
        <>
          <div className="flex items-start gap-2 rounded-xl border border-[var(--warning)]/30 bg-[var(--warning)]/8 p-3 text-xs leading-relaxed">
            <Info size={15} className="mt-0.5 shrink-0 text-[var(--warning)]" aria-hidden />
            <span className="text-muted">{content.note}</span>
          </div>

          <a
            href={notifyHref}
            target={notifyHref.startsWith('http') ? '_blank' : undefined}
            rel={notifyHref.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={buttonClasses('outline', 'lg', 'mt-auto w-full')}
          >
            <Clock size={17} strokeWidth={2} aria-hidden />
            {dict.nexora.download.notifyMe}
          </a>
        </>
      )}
    </div>
  );
}

export default DownloadCard;
