import type { IconName } from '@/components/Icon';
import type { MediaKey } from '@/data/media';

export type ProductStatus = 'available' | 'in-development';

export type ProductContent = {
  name: string;
  tagline: string;
  summary: string;
  highlights: string[];
};

export type Product = {
  slug: string;
  status: ProductStatus;
  /** مسار الصفحة داخل [locale] — فارغ يعني لا صفحة مخصصة */
  href: string;
  icon: IconName;
  /** الصورة الأساسية للمنتج من src/data/media.ts */
  image: MediaKey;
  /** أيقونة المنتج */
  iconImage: MediaKey;
  version: string;
  platforms: { ar: string; en: string };
  ar: ProductContent;
  en: ProductContent;
};

export const products: Product[] = [
  {
    slug: 'nexora-store',
    status: 'available',
    href: 'products/nexora-store',
    icon: 'Store',
    image: 'nexoraHeroDashboard',
    iconImage: 'nexoraIcon',
    version: '0.1.0',
    platforms: { ar: 'Windows · Android قريباً', en: 'Windows · Android coming soon' },
    ar: {
      name: 'NEXORA Store',
      tagline: 'نظام نقاط بيع وإدارة مخازن يعمل بدون إنترنت',
      summary:
        'نظام متكامل للمبيعات والمخازن والعملاء والتقارير، يعمل محلياً على Windows بقاعدة بيانات SQLite، مع مزامنة سحابية اختيارية ونسخ احتياطي محلي وعلى Google Drive.',
      highlights: [
        'نقاط بيع سريعة مع باركود وطباعة فواتير',
        'مخازن متعددة ومشتريات ومرتجعات',
        'تقارير مبيعات وأرباح ومصروفات وورديات',
        'أقساط ومندوبو بيع وتوصيل',
        'صلاحيات وأدوار وسجل تدقيق',
        'تجربة مجانية 3 أيام ثم تنشيط بترخيص',
      ],
    },
    en: {
      name: 'NEXORA Store',
      tagline: 'Point-of-sale and inventory management that works offline',
      summary:
        'A complete system for sales, inventory, customers and reporting that runs locally on Windows over an SQLite database, with optional cloud sync and local plus Google Drive backups.',
      highlights: [
        'Fast POS with barcode and invoice printing',
        'Multi-warehouse, purchases and returns',
        'Sales, profit, expense and shift reports',
        'Installments, sales reps and delivery reps',
        'Roles, permissions and audit log',
        '3-day free trial, then license activation',
      ],
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export const nexoraStore: Product = (() => {
  const product = getProduct('nexora-store');
  if (!product) throw new Error('nexora-store product is missing');
  return product;
})();

/** قطاعات يغطّيها تصميم أنظمتنا الحالي — أنماط أعمال لا أسماء عملاء */
export type Industry = {
  id: string;
  icon: IconName;
  ar: { title: string; desc: string };
  en: { title: string; desc: string };
};

export const industries: Industry[] = [
  {
    id: 'retail',
    icon: 'Store',
    ar: { title: 'التجارة والتجزئة', desc: 'سوبرماركت ومحلات تجزئة تحتاج بيعاً سريعاً وجرداً دقيقاً.' },
    en: { title: 'Retail', desc: 'Supermarkets and retail shops needing fast selling and accurate stock.' },
  },
  {
    id: 'wholesale',
    icon: 'Warehouse',
    ar: { title: 'الجملة والتوزيع', desc: 'مخازن متعددة ومستويات أسعار ومندوبو بيع وتوصيل.' },
    en: { title: 'Wholesale & distribution', desc: 'Multiple warehouses, price levels, and sales/delivery reps.' },
  },
  {
    id: 'pharmacy',
    icon: 'Pill',
    ar: { title: 'الصيدليات', desc: 'أصناف كثيرة وباركود وأسعار متغيرة وتقارير دقيقة.' },
    en: { title: 'Pharmacies', desc: 'Large catalogues, barcodes, changing prices and precise reporting.' },
  },
  {
    id: 'restaurants',
    icon: 'UtensilsCrossed',
    ar: { title: 'المطاعم والكافيهات', desc: 'شاشات طلبات وطاولات (اختيارية) وطباعة سريعة.' },
    en: { title: 'Restaurants & cafés', desc: 'Order screens, optional tables, and fast printing.' },
  },
  {
    id: 'services',
    icon: 'Wrench',
    ar: { title: 'ورش وخدمات', desc: 'فواتير خدمات وقطع غيار ومتابعة عملاء وأقساط.' },
    en: { title: 'Workshops & services', desc: 'Service and parts invoicing, customer tracking and installments.' },
  },
  {
    id: 'multi-branch',
    icon: 'Building2',
    ar: { title: 'أنشطة متعددة الفروع', desc: 'عدة فروع ومخازن ومستخدمين بصلاحيات منفصلة.' },
    en: { title: 'Multi-branch businesses', desc: 'Several branches, warehouses and users with separate permissions.' },
  },
];
