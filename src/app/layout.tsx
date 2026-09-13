import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Cairo } from 'next/font/google';
import { themeInitScript } from '@/lib/theme';
import { siteConfig } from '@/config/site';
import { media } from '@/data/media';
import './globals.css';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.siteName} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.siteName,
  icons: {
    icon: [{ url: media.nexoraIcon.src, type: 'image/png' }],
    apple: [{ url: media.nexoraIcon.src }],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#060d1a' },
  ],
};

/**
 * التخطيط الجذري — الحد الأدنى فقط.
 *
 * وسمَا `lang` و `dir` يُضبطان لكل لغة من `src/app/[locale]/layout.tsx`
 * (على العنصر الحاوي وعلى `<html>` عبر سكربت يُنفّذ قبل الرسم).
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning className={cairo.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
