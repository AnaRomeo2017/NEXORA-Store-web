export type MediaAsset = {
  src: string;
  alt: { ar: string; en: string };
  width: number;
  height: number;
};

/** أصول الصور الحقيقية الموجودة في public/images — مرتبطة بالغرض من كل صورة */
export const media = {
  /** شعار/علامة الشركة — الهيدر، من نحن، الفوتر */
  menzomaBrand: {
    src: '/images/menzoma-brand.png',
    alt: {
      ar: 'شعار منظومة للبرمجيات',
      en: 'Menzoma Software logo',
    },
    width: 1254,
    height: 1254,
  },
  /** الصورة الرئيسية في الصفحة الرئيسية */
  menzomaHero: {
    src: '/images/menzoma-hero.png',
    alt: {
      ar: 'منظومة للبرمجيات — نظام واحد لإدارة أعمالك على الكمبيوتر والموبايل',
      en: 'Menzoma Software — one system for desktop and mobile business management',
    },
    width: 1942,
    height: 809,
  },
  /** أيقونة منتج NEXORA Store — كروت المنتج والتحميل والأيقونة */
  nexoraIcon: {
    src: '/images/nexora-icon.png',
    alt: {
      ar: 'أيقونة NEXORA Store',
      en: 'NEXORA Store icon',
    },
    width: 1254,
    height: 1254,
  },
  /** صورة Hero في صفحة منتج NEXORA Store */
  nexoraHeroDashboard: {
    src: '/images/nexora-hero-dashboard.png',
    alt: {
      ar: 'لوحة تحكم NEXORA Store على جهاز لابتوب',
      en: 'NEXORA Store dashboard on a laptop',
    },
    width: 1672,
    height: 941,
  },
  /** شاشة نقاط البيع — قسم المزايا واللقطات */
  nexoraPosScreen: {
    src: '/images/nexora-pos-screen.png',
    alt: {
      ar: 'شاشة المبيعات في NEXORA Store مع باركود وطابعة',
      en: 'NEXORA Store POS screen with barcode scanner and printer',
    },
    width: 1672,
    height: 941,
  },
  /** قسم العمل بدون إنترنت (Local-First) */
  nexoraOffline: {
    src: '/images/nexora-offline.png',
    alt: {
      ar: 'NEXORA Store يعمل محلياً حتى عند انقطاع الإنترنت',
      en: 'NEXORA Store local-first offline operation',
    },
    width: 1672,
    height: 941,
  },
} as const satisfies Record<string, MediaAsset>;

export type MediaKey = keyof typeof media;

/** نص بديل بحسب اللغة */
export function altFor(key: MediaKey, locale: 'ar' | 'en'): string {
  return media[key].alt[locale];
}
