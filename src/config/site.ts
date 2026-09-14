/**
 * الإعدادات المركزية للموقع — منظومة للبرمجيات
 *
 * قاعدة مهمة: كل قيمة تواصل أو إحصائية هنا **مبدئية (placeholder)** حتى تُضبط فعلياً.
 * الحقول التي تحمل `isPlaceholder: true` أو `enabled: false` لا تُعرض في الواجهة،
 * حتى لا يظهر للزائر أي معلومة غير حقيقية.
 */

export type ContactValue = {
  /** القيمة الخام (رقم/بريد/عنوان). فارغة = غير مضبوطة */
  value: string;
  /** true = قيمة مبدئية لم تُضبط بعد، ولا يجب عرضها */
  isPlaceholder: boolean;
};

export type SiteStat = {
  id: string;
  /** القيمة الرقمية أو النصية المعروضة */
  value: string;
  labelAr: string;
  labelEn: string;
  /** false = لا تُعرض (لعدم توفر رقم حقيقي بعد) */
  enabled: boolean;
};

export type SocialLinks = {
  facebook?: string;
  x?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  github?: string;
  tiktok?: string;
};

function env(key: string): string {
  const raw = process.env[key];
  return typeof raw === 'string' ? raw.trim() : '';
}

function contactFromEnv(key: string, fallback: string): ContactValue {
  const fromEnv = env(key);
  if (fromEnv.length > 0) {
    return { value: fromEnv, isPlaceholder: false };
  }
  return { value: fallback, isPlaceholder: true };
}

/** رقم التواصل الرسمي — مصر (01111096380 → wa.me/201111096380) */
const DEFAULT_PHONE = '01111096380';
const DEFAULT_WHATSAPP = '201111096380';

const PHONE = (() => {
  const fromEnv = env('NEXT_PUBLIC_PHONE');
  if (fromEnv.length > 0) return { value: fromEnv, isPlaceholder: false };
  return { value: DEFAULT_PHONE, isPlaceholder: false };
})();
const WHATSAPP = (() => {
  const fromEnv = env('NEXT_PUBLIC_WHATSAPP');
  if (fromEnv.length > 0) return { value: fromEnv, isPlaceholder: false };
  return { value: DEFAULT_WHATSAPP, isPlaceholder: false };
})();
const EMAIL = contactFromEnv('NEXT_PUBLIC_EMAIL', 'info@example.com');

/** روابط التواصل الاجتماعي — فارغة حتى توفر حسابات رسمية */
const SOCIAL_LINKS: SocialLinks = {
  github: 'https://github.com/AnaRomeo2017/NEXORA-Store-web',
};

/** إحصائيات تسويقية — كلها معطّلة لعدم توفر أرقام موثوقة للعرض */
const STATS: SiteStat[] = [
  { id: 'clients', value: '—', labelAr: 'عميل', labelEn: 'Clients', enabled: false },
  { id: 'projects', value: '—', labelAr: 'مشروع منجز', labelEn: 'Projects delivered', enabled: false },
  { id: 'years', value: '—', labelAr: 'سنوات خبرة', labelEn: 'Years of experience', enabled: false },
  { id: 'uptime', value: '—', labelAr: 'نسبة التوفر', labelEn: 'Uptime', enabled: false },
];

/** حقائق تقنية يمكن ذكرها بثقة (ليست إحصائيات تسويقية) */
const FACTS: SiteStat[] = [
  {
    id: 'offline',
    value: '100%',
    labelAr: 'تشغيل بدون إنترنت',
    labelEn: 'Works fully offline',
    enabled: true,
  },
  {
    id: 'trial',
    value: '3',
    labelAr: 'أيام تجربة مجانية',
    labelEn: 'Days free trial',
    enabled: true,
  },
  {
    id: 'platform',
    value: 'Windows',
    labelAr: 'منصة متوفرة حالياً',
    labelEn: 'Available platform',
    enabled: true,
  },
  {
    id: 'sync',
    value: 'Cloud',
    labelAr: 'مزامنة سحابية اختيارية',
    labelEn: 'Optional cloud sync',
    enabled: true,
  },
];

export const siteConfig = {
  siteName: 'منظومة للبرمجيات',
  siteNameShort: 'منظومة',
  siteNameEn: 'Menzoma Software',
  siteNameEnShort: 'Menzoma',

  tagline: 'أنظمة برمجية تُدار بها أعمالك بالكامل',
  taglineEn: 'Software systems that run your entire business',

  description:
    'منظومة للبرمجيات تبني أنظمة نقاط بيع وإدارة مخازن وحلول برمجية مخصصة تعمل بدون إنترنت ومع مزامنة سحابية، مع دعم فني مباشر.',
  descriptionEn:
    'Menzoma Software builds point-of-sale, inventory and custom business systems that work offline with cloud sync, backed by hands-on technical support.',

  /** العنوان العام للموقع — يُستخدم في canonical و sitemap و OG */
  url: env('NEXT_PUBLIC_SITE_URL') || 'http://localhost:3000',

  locale: {
    default: 'ar',
    supported: ['ar', 'en'],
  },

  /** بيانات التواصل — مبدئية حتى ضبط متغيرات البيئة */
  phone: PHONE,
  whatsapp: WHATSAPP,
  email: EMAIL,

  address: {
    ar: 'العنوان غير محدد بعد',
    en: 'Address not set yet',
    isPlaceholder: true,
  },

  workingHours: {
    ar: 'ساعات العمل غير محددة بعد',
    en: 'Working hours not set yet',
    isPlaceholder: true,
  },

  /** روابط التواصل الاجتماعي — كائن فارغ = لا يُعرض أي أيقونة */
  socialLinks: SOCIAL_LINKS,

  stats: STATS,

  facts: FACTS,

  /** نقطة استقبال نماذج الطلبات (اختيارية) */
  leadsEndpoint: env('NEXT_PUBLIC_LEADS_ENDPOINT'),

  analyticsEnabled: env('NEXT_PUBLIC_ANALYTICS_ENABLED') === 'true',
} as const;

export type SiteConfig = typeof siteConfig;

/** هل قيمة التواصل مضبوطة فعلياً وقابلة للعرض؟ */
export function isContactConfigured(contact: ContactValue): boolean {
  return !contact.isPlaceholder && contact.value.length > 0;
}

/** رقم واتساب منقّى من أي رموز غير رقمية (يحوّل 01… المصري إلى 201…) */
export function whatsappDigits(): string {
  let digits = siteConfig.whatsapp.value.replace(/\D/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.startsWith('0') && digits.length === 11) digits = `20${digits.slice(1)}`;
  return digits;
}

/** رسالة واتساب الافتراضية حسب اللغة */
export function defaultWhatsAppMessage(locale: 'ar' | 'en' = 'ar'): string {
  if (locale === 'en') {
    return `Hello ${siteConfig.siteNameEn}, I would like to inquire about your software services and NEXORA Store.`;
  }
  return `مرحباً ${siteConfig.siteName}، أريد الاستفسار عن خدماتكم ونظام NEXORA Store.`;
}

/** رابط محادثة واتساب، أو null إن لم يُضبط الرقم */
export function whatsappLink(message?: string, locale: 'ar' | 'en' = 'ar'): string | null {
  if (!isContactConfigured(siteConfig.whatsapp)) return null;
  const digits = whatsappDigits();
  if (digits.length === 0) return null;
  const text = message ?? defaultWhatsAppMessage(locale);
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

/** رابط هاتف، أو null إن لم يُضبط */
export function telLink(): string | null {
  if (!isContactConfigured(siteConfig.phone)) return null;
  return `tel:${siteConfig.phone.value.replace(/\s/g, '')}`;
}

/** رابط بريد، أو null إن لم يُضبط */
export function mailLink(subject?: string): string | null {
  if (!isContactConfigured(siteConfig.email)) return null;
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  return `mailto:${siteConfig.email.value}${query}`;
}

/** روابط التواصل الاجتماعي المضبوطة فقط */
export function activeSocialLinks(): Array<{ key: keyof SocialLinks; url: string }> {
  return Object.entries(siteConfig.socialLinks)
    .filter((entry): entry is [keyof SocialLinks, string] =>
      typeof entry[1] === 'string' && entry[1].length > 0,
    )
    .map(([key, url]) => ({ key, url }));
}
