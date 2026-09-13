import type { IconName } from '@/components/Icon';

export type FeatureCategoryId =
  | 'sales'
  | 'inventory'
  | 'people'
  | 'money'
  | 'reports'
  | 'platform';

export type FeatureCategory = {
  id: FeatureCategoryId;
  ar: string;
  en: string;
};

export type NexoraFeature = {
  id: string;
  category: FeatureCategoryId;
  icon: IconName;
  /** يُعرض بوسم «اختياري» — متوفر لكنه يُفعّل حسب النشاط */
  optional?: boolean;
  ar: { title: string; desc: string };
  en: { title: string; desc: string };
};

export const featureCategories: FeatureCategory[] = [
  { id: 'sales', ar: 'المبيعات ونقاط البيع', en: 'Sales & POS' },
  { id: 'inventory', ar: 'المخازن والأصناف', en: 'Inventory & items' },
  { id: 'people', ar: 'العملاء والموردون والفريق', en: 'Customers, suppliers & team' },
  { id: 'money', ar: 'المال والتحصيل', en: 'Money & collection' },
  { id: 'reports', ar: 'التقارير والمتابعة', en: 'Reports & tracking' },
  { id: 'platform', ar: 'المنصة والبيانات', en: 'Platform & data' },
];

/**
 * المزايا المتحققة فعلياً في NEXORA Store 0.1.0 — لا تُضاف أي ميزة غير موجودة.
 */
export const nexoraFeatures: NexoraFeature[] = [
  // المبيعات ونقاط البيع
  {
    id: 'pos',
    category: 'sales',
    icon: 'ShoppingCart',
    ar: { title: 'نقاط البيع (POS)', desc: 'شاشة بيع سريعة للكاشير مع بحث فوري عن الأصناف وإتمام الفاتورة.' },
    en: { title: 'Point of sale (POS)', desc: 'A fast cashier screen with instant item search and quick checkout.' },
  },
  {
    id: 'sales',
    category: 'sales',
    icon: 'Receipt',
    ar: { title: 'إدارة المبيعات', desc: 'تسجيل فواتير البيع ومتابعتها وتعديلها حسب الصلاحيات.' },
    en: { title: 'Sales management', desc: 'Record, track and amend sales invoices according to permissions.' },
  },
  {
    id: 'returns',
    category: 'sales',
    icon: 'Undo2',
    ar: { title: 'المرتجعات', desc: 'مرتجعات بيع وشراء مع تعديل المخزون والحسابات تلقائياً.' },
    en: { title: 'Returns', desc: 'Sales and purchase returns with automatic stock and account adjustments.' },
  },
  {
    id: 'barcode',
    category: 'sales',
    icon: 'ScanBarcode',
    ar: { title: 'الباركود', desc: 'قراءة الباركود للبيع والجرد، وتوليد باركود للأصناف.' },
    en: { title: 'Barcode', desc: 'Scan barcodes for selling and stocktaking, and generate item barcodes.' },
  },
  {
    id: 'printing',
    category: 'sales',
    icon: 'Printer',
    ar: { title: 'الطباعة', desc: 'طباعة فواتير وإيصالات على الطابعات الحرارية وA4.' },
    en: { title: 'Printing', desc: 'Print invoices and receipts on thermal and A4 printers.' },
  },
  {
    id: 'price-levels',
    category: 'sales',
    icon: 'Tag',
    ar: { title: 'مستويات الأسعار', desc: 'أكثر من سعر لكل صنف (تجزئة، جملة، خاص) بحسب نوع العميل.' },
    en: { title: 'Price levels', desc: 'Multiple prices per item (retail, wholesale, special) by customer type.' },
  },
  {
    id: 'promotions',
    category: 'sales',
    icon: 'Percent',
    ar: { title: 'العروض والخصومات', desc: 'إعداد عروض وخصومات وتطبيقها على الفواتير.' },
    en: { title: 'Promotions & discounts', desc: 'Configure promotions and discounts and apply them to invoices.' },
  },
  {
    id: 'quantity-pricing',
    category: 'sales',
    icon: 'Layers',
    ar: { title: 'التسعير بالكمية', desc: 'أسعار مختلفة حسب حجم الكمية المشتراة.' },
    en: { title: 'Quantity pricing', desc: 'Different prices based on the purchased quantity tier.' },
  },
  {
    id: 'tables',
    category: 'sales',
    icon: 'UtensilsCrossed',
    optional: true,
    ar: { title: 'طاولات المطاعم', desc: 'إدارة الطاولات والطلبات — تُفعّل لأنشطة المطاعم والكافيهات.' },
    en: { title: 'Restaurant tables', desc: 'Table and order management — enabled for restaurants and cafés.' },
  },

  // المخازن والأصناف
  {
    id: 'inventory',
    category: 'inventory',
    icon: 'Warehouse',
    ar: { title: 'مخازن متعددة', desc: 'إدارة أكثر من مخزن ومتابعة الأرصدة والتحويلات بينها.' },
    en: { title: 'Multi-warehouse', desc: 'Manage multiple warehouses and track balances and transfers between them.' },
  },
  {
    id: 'products',
    category: 'inventory',
    icon: 'Package',
    ar: { title: 'الأصناف والمنتجات', desc: 'بيانات الأصناف والوحدات والأسعار والتصنيفات.' },
    en: { title: 'Products & items', desc: 'Item data, units, prices and categories.' },
  },
  {
    id: 'purchases',
    category: 'inventory',
    icon: 'Boxes',
    ar: { title: 'المشتريات', desc: 'فواتير الشراء من الموردين وتحديث المخزون والتكاليف.' },
    en: { title: 'Purchases', desc: 'Supplier purchase invoices with stock and cost updates.' },
  },

  // العملاء والموردون والفريق
  {
    id: 'customers',
    category: 'people',
    icon: 'Users',
    ar: { title: 'العملاء', desc: 'ملفات العملاء وأرصدتهم وسجل تعاملاتهم.' },
    en: { title: 'Customers', desc: 'Customer records, balances and transaction history.' },
  },
  {
    id: 'suppliers',
    category: 'people',
    icon: 'Truck',
    ar: { title: 'الموردون', desc: 'ملفات الموردين وأرصدتهم وفواتير الشراء المرتبطة.' },
    en: { title: 'Suppliers', desc: 'Supplier records, balances and linked purchase invoices.' },
  },
  {
    id: 'sales-reps',
    category: 'people',
    icon: 'Briefcase',
    ar: { title: 'مندوبو البيع', desc: 'ربط الفواتير بالمندوبين ومتابعة مبيعات كل مندوب.' },
    en: { title: 'Sales reps', desc: 'Link invoices to reps and track each rep’s sales.' },
  },
  {
    id: 'delivery-reps',
    category: 'people',
    icon: 'ArrowLeftRight',
    ar: { title: 'مندوبو التوصيل', desc: 'إسناد الطلبات لمندوبي التوصيل ومتابعة حالتها.' },
    en: { title: 'Delivery reps', desc: 'Assign orders to delivery reps and follow their status.' },
  },
  {
    id: 'permissions',
    category: 'people',
    icon: 'UserCog',
    ar: { title: 'الصلاحيات والأدوار', desc: 'أدوار للكاشير والمخزن والإدارة بصلاحيات دقيقة لكل شاشة.' },
    en: { title: 'Permissions & roles', desc: 'Cashier, warehouse and management roles with per-screen permissions.' },
  },
  {
    id: 'shifts',
    category: 'people',
    icon: 'Timer',
    ar: { title: 'الورديات', desc: 'فتح وإغلاق ورديات الكاشير مع تقفيل ومطابقة النقدية.' },
    en: { title: 'Shifts', desc: 'Open and close cashier shifts with cash closing and reconciliation.' },
  },

  // المال والتحصيل
  {
    id: 'installments',
    category: 'money',
    icon: 'CreditCard',
    ar: { title: 'الأقساط', desc: 'بيع بالتقسيط وجدولة الأقساط ومتابعة التحصيل.' },
    en: { title: 'Installments', desc: 'Installment sales with schedules and collection tracking.' },
  },
  {
    id: 'expenses',
    category: 'money',
    icon: 'Banknote',
    ar: { title: 'المصروفات', desc: 'تسجيل المصروفات وتصنيفها لحساب الأرباح الصافية.' },
    en: { title: 'Expenses', desc: 'Record and categorise expenses for accurate net profit.' },
  },
  {
    id: 'multi-currency',
    category: 'money',
    icon: 'Coins',
    ar: { title: 'تعدد العملات', desc: 'التعامل بأكثر من عملة مع أسعار تحويل قابلة للضبط.' },
    en: { title: 'Multi-currency', desc: 'Work with more than one currency with configurable rates.' },
  },

  // التقارير والمتابعة
  {
    id: 'reports',
    category: 'reports',
    icon: 'BarChart3',
    ar: { title: 'التقارير', desc: 'تقارير مبيعات ومخزون وأرباح ومصروفات وورديات قابلة للطباعة.' },
    en: { title: 'Reports', desc: 'Printable sales, stock, profit, expense and shift reports.' },
  },
  {
    id: 'audit-logs',
    category: 'reports',
    icon: 'FileClock',
    ar: { title: 'سجل التدقيق', desc: 'سجل يوضّح من نفّذ كل عملية حسّاسة ومتى.' },
    en: { title: 'Audit logs', desc: 'A log showing who performed each sensitive action and when.' },
  },
  {
    id: 'whatsapp',
    category: 'reports',
    icon: 'MessageCircle',
    ar: { title: 'أتمتة واتساب', desc: 'إرسال رسائل واتساب للعملاء من داخل النظام حسب الإعداد.' },
    en: { title: 'WhatsApp automation', desc: 'Send WhatsApp messages to customers from inside the system.' },
  },

  // المنصة والبيانات
  {
    id: 'offline',
    category: 'platform',
    icon: 'WifiOff',
    ar: { title: 'تشغيل محلي بدون إنترنت', desc: 'قاعدة بيانات SQLite محلية — العمل لا يتوقف عند انقطاع الشبكة.' },
    en: { title: 'Offline local-first', desc: 'A local SQLite database — work never stops when the network drops.' },
  },
  {
    id: 'cloud-sync',
    category: 'platform',
    icon: 'CloudCog',
    ar: { title: 'مزامنة سحابية', desc: 'مزامنة اختيارية عبر Firestore بين الأجهزة عند توفر الإنترنت.' },
    en: { title: 'Cloud sync', desc: 'Optional Firestore sync across devices when internet is available.' },
  },
  {
    id: 'backup',
    category: 'platform',
    icon: 'HardDrive',
    ar: { title: 'النسخ الاحتياطي', desc: 'نسخ احتياطي محلي وعلى Google Drive واسترجاع عند الحاجة.' },
    en: { title: 'Backup', desc: 'Local and Google Drive backups with restore when needed.' },
  },
  {
    id: 'license',
    category: 'platform',
    icon: 'KeyRound',
    ar: { title: 'تجربة وتنشيط', desc: 'تجربة مجانية 3 أيام ثم تنشيط النظام بترخيص.' },
    en: { title: 'Trial & activation', desc: 'A 3-day free trial, then activation with a license.' },
  },
];

export function featuresByCategory(category: FeatureCategoryId): NexoraFeature[] {
  return nexoraFeatures.filter((feature) => feature.category === category);
}

export const nexoraFeatureCount: number = nexoraFeatures.length;
