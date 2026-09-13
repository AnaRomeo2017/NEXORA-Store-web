import type { IconName } from '@/components/Icon';

export type DownloadPlatformId = 'windows' | 'android';

export type DownloadItem = {
  id: DownloadPlatformId;
  icon: IconName;
  available: boolean;
  /** رابط التحميل — فارغ عندما لا يكون متوفراً */
  url: string;
  version: string;
  /** حجم الملف كنص معروض */
  size: string;
  /** معمارية/متطلب أساسي */
  arch: string;
  fileName: string;
  /** بصمة SHA-256 إن توفرت (تُنشر مع الإصدارات الرسمية) */
  checksum: string | null;
  ar: { name: string; desc: string; note: string };
  en: { name: string; desc: string; note: string };
};

export const NEXORA_VERSION = '0.1.0';
export const NEXORA_RELEASE_CHANNEL = 'early';

const WINDOWS_URL =
  process.env.NEXT_PUBLIC_NEXORA_WINDOWS_URL?.trim() ||
  '/downloads/NEXORA-Store-Setup-0.1.0.exe';

const ANDROID_URL = process.env.NEXT_PUBLIC_NEXORA_ANDROID_URL?.trim() || '';

export const downloads: DownloadItem[] = [
  {
    id: 'windows',
    icon: 'Monitor',
    available: true,
    url: WINDOWS_URL,
    version: NEXORA_VERSION,
    size: '129 MB',
    arch: 'x64',
    fileName: 'NEXORA-Store-Setup-0.1.0.exe',
    checksum: null,
    ar: {
      name: 'Windows',
      desc: 'مثبّت كامل لأجهزة Windows 10 أو أحدث (64-bit).',
      note: 'يشمل كل ما يحتاجه النظام للعمل بدون إنترنت.',
    },
    en: {
      name: 'Windows',
      desc: 'Full installer for Windows 10 or newer (64-bit).',
      note: 'Includes everything the system needs to run offline.',
    },
  },
  {
    id: 'android',
    icon: 'Smartphone',
    available: false,
    url: ANDROID_URL,
    version: '—',
    size: '—',
    arch: '—',
    fileName: '',
    checksum: null,
    ar: {
      name: 'Android',
      desc: 'تطبيق الموبايل قيد التطوير ولم يُطلق بعد.',
      note: 'سنعلن عن موعد الإطلاق عند اكتمال الاختبارات.',
    },
    en: {
      name: 'Android',
      desc: 'The mobile app is in development and has not been released yet.',
      note: 'We will announce the release date once testing is complete.',
    },
  },
];

export function getDownload(id: DownloadPlatformId): DownloadItem {
  const item = downloads.find((entry) => entry.id === id);
  if (!item) {
    throw new Error(`Unknown download platform: ${id}`);
  }
  return item;
}

export const windowsDownload: DownloadItem = getDownload('windows');
export const androidDownload: DownloadItem = getDownload('android');
