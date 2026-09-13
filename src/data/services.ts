import type { IconName } from '@/components/Icon';

export type ServiceFaqItem = { q: string; a: string };

export type ServiceContent = {
  title: string;
  /** وصف قصير لكرت الخدمة */
  short: string;
  /** وصف تفصيلي لصفحة الخدمة */
  description: string;
  /** التحدّي الذي تواجهه الشركات */
  problem: string;
  /** كيف نحلّه */
  solution: string;
  features: string[];
  steps: string[];
  deliverables: string[];
  faq: ServiceFaqItem[];
};

export type Service = {
  slug: string;
  icon: IconName;
  /** خدمات ذات صلة (slugs) */
  related: string[];
  ar: ServiceContent;
  en: ServiceContent;
};

export const services: Service[] = [
  {
    slug: 'pos-inventory-systems',
    icon: 'ShoppingCart',
    related: ['custom-software', 'support-maintenance', 'cloud-infrastructure'],
    ar: {
      title: 'أنظمة نقاط البيع وإدارة المخازن',
      short: 'أنظمة كاشير ومخازن تعمل بدون إنترنت مع تقارير دقيقة وصلاحيات واضحة.',
      description:
        'نوفّر أنظمة نقاط بيع وإدارة مخازن جاهزة للتشغيل أو مخصصة حسب نشاطك: بيع سريع بالباركود، مخازن متعددة، تسعير متعدد المستويات، عروض، أقساط، ورديات، ومندوبي بيع وتوصيل. النظام يعمل محلياً أولاً فلا يتعطّل البيع عند انقطاع الإنترنت.',
      problem:
        'كثير من المتاجر تدير المبيعات والمخزون على أوراق أو جداول Excel، فيحدث فرق في الجرد، وتضيع أرقام الأرباح الحقيقية، ويتعطّل البيع كلياً عند انقطاع الإنترنت في الأنظمة السحابية البحتة.',
      solution:
        'نطبّق نظاماً يعمل محلياً على أجهزة المتجر بقاعدة بيانات SQLite، مع مزامنة سحابية اختيارية. نضبط الأصناف والأسعار والصلاحيات والورديات، وندرّب الفريق حتى يعمل بثقة.',
      features: [
        'شاشة بيع سريعة مع باركود وطباعة فواتير',
        'إدارة مخازن متعددة وتحويلات بينها',
        'مستويات أسعار وتسعير بالكمية وعروض',
        'مرتجعات بيع وشراء ومعالجة الفروق',
        'ورديات كاشير وتقفيل يومي',
        'أقساط ومتابعة تحصيل',
        'تقارير مبيعات وأرباح ومصروفات',
        'صلاحيات وأدوار وسجل تدقيق',
      ],
      steps: [
        'زيارة أو جلسة تحليل لفهم دورة البيع والمخزون',
        'إعداد النظام والأصناف والمخازن والمستخدمين',
        'ربط الأجهزة: قارئ الباركود والطابعة ودرج النقدية',
        'تدريب الكاشير والمخزن والإدارة',
        'تشغيل تجريبي ثم تشغيل فعلي مع متابعة',
      ],
      deliverables: [
        'نظام مثبّت ومهيّأ على أجهزة المتجر',
        'دليل استخدام مختصر بالعربية',
        'جلسة تدريب للفريق',
        'خطة نسخ احتياطي محلية وسحابية',
      ],
      faq: [
        {
          q: 'هل يعمل النظام بدون إنترنت؟',
          a: 'نعم. النظام يعمل محلياً بشكل كامل، والمزامنة السحابية اختيارية وتحدث في الخلفية عند توفر الاتصال.',
        },
        {
          q: 'هل يدعم أكثر من فرع أو مخزن؟',
          a: 'نعم، يدعم مخازن متعددة وتحويلات بينها، ويمكن إعداده لأكثر من نقطة بيع.',
        },
        {
          q: 'هل أستطيع تصدير بياناتي؟',
          a: 'نعم. قاعدة البيانات محلية لديك، وتتوفر نسخ احتياطية محلية وعلى Google Drive.',
        },
      ],
    },
    en: {
      title: 'POS and inventory systems',
      short: 'Register and inventory systems that work offline with accurate reports and clear permissions.',
      description:
        'We deliver ready-made or custom point-of-sale and inventory systems: fast barcode selling, multiple warehouses, multi-level pricing, promotions, installments, shifts, and sales/delivery reps. The system runs local-first so selling never stops when the internet drops.',
      problem:
        'Many shops still run sales and stock on paper or spreadsheets, which produces stocktaking gaps, unclear real profit, and a complete halt in selling when purely cloud-based systems lose connectivity.',
      solution:
        'We deploy a system that runs locally on your store machines on an SQLite database, with optional cloud sync. We configure items, prices, permissions and shifts, and train the team until they operate confidently.',
      features: [
        'Fast sales screen with barcode and invoice printing',
        'Multi-warehouse management and transfers',
        'Price levels, quantity pricing and promotions',
        'Sales and purchase returns with variance handling',
        'Cashier shifts and daily closing',
        'Installments and collection tracking',
        'Sales, profit and expense reports',
        'Roles, permissions and audit log',
      ],
      steps: [
        'A visit or analysis session to understand your sales and stock cycle',
        'System, items, warehouses and users setup',
        'Hardware setup: barcode scanner, printer and cash drawer',
        'Training for cashiers, warehouse and management',
        'Pilot run, then production rollout with follow-up',
      ],
      deliverables: [
        'A configured system installed on your store machines',
        'A concise Arabic user guide',
        'A team training session',
        'A local and cloud backup plan',
      ],
      faq: [
        {
          q: 'Does the system work without internet?',
          a: 'Yes. It runs fully locally, and cloud sync is optional and happens in the background when a connection is available.',
        },
        {
          q: 'Does it support multiple branches or warehouses?',
          a: 'Yes, it supports multiple warehouses and transfers between them, and can be set up for more than one register.',
        },
        {
          q: 'Can I export my data?',
          a: 'Yes. The database is local to you, with local and Google Drive backups available.',
        },
      ],
    },
  },

  {
    slug: 'custom-software',
    icon: 'Code2',
    related: ['pos-inventory-systems', 'web-development', 'cloud-infrastructure'],
    ar: {
      title: 'تطوير البرمجيات المخصصة',
      short: 'أنظمة تُبنى على قياس عملك عندما لا تكفي الحلول الجاهزة.',
      description:
        'نحلّل عمليات شركتك ونبني نظاماً يطابق طريقة عملك الفعلية: إدارة عمليات، مخازن، مبيعات، متابعة مهام، أو أي دورة عمل خاصة بك. نبدأ بنطاق مكتوب ومراحل تسليم واضحة.',
      problem:
        'الحلول الجاهزة تفرض طريقة عمل لا تناسب كل شركة، فينتهي الأمر بتشغيل النظام «على الورق» بينما العمل الحقيقي يدار خارجه.',
      solution:
        'نُصمّم النظام انطلاقاً من عملياتك الحقيقية: نوثّق دورة العمل، نبني نموذج بيانات مناسباً، ونسلّم على مراحل قابلة للاستخدام من أول مرحلة.',
      features: [
        'تحليل وتوثيق دورة العمل قبل الكود',
        'نموذج بيانات وتصميم معماري مكتوب',
        'تسليم على مراحل قابلة للتشغيل',
        'صلاحيات وأدوار مرنة',
        'تقارير مخصصة حسب مؤشراتك',
        'تكامل مع أنظمة أو أجهزة قائمة',
        'كود موثّق وقابل للتطوير',
        'نقل معرفة لفريقك عند التسليم',
      ],
      steps: [
        'جلسات تحليل وتحديد النطاق',
        'تصميم نموذج البيانات والمعمارية',
        'تطوير تدريجي بمراجعات دورية',
        'اختبار على بيانات واقعية',
        'إطلاق تدريجي ثم دعم وتحسين',
      ],
      deliverables: [
        'مستند نطاق ومتطلبات',
        'نظام عامل على البيئة المطلوبة',
        'توثيق تقني للتسليم',
        'فترة دعم بعد الإطلاق',
      ],
      faq: [
        {
          q: 'كم يستغرق بناء نظام مخصص؟',
          a: 'يعتمد على النطاق. بعد جلسة التحليل نعطيك تقديراً زمنياً بمراحل واضحة قبل بدء التنفيذ.',
        },
        {
          q: 'هل يمكن البدء بنطاق صغير؟',
          a: 'نعم، ونوصي بذلك: نبدأ بأهم دورة عمل ونطلقها، ثم نضيف المراحل التالية.',
        },
        {
          q: 'من يملك الكود؟',
          a: 'يُحدّد ذلك في العقد قبل البدء، بما يشمل حقوق الكود والتوثيق.',
        },
      ],
    },
    en: {
      title: 'Custom software development',
      short: 'Systems built to fit your business when off-the-shelf tools fall short.',
      description:
        'We analyse your operations and build a system that matches how you actually work: operations management, inventory, sales, task tracking, or any workflow specific to you. We start with a written scope and clear delivery milestones.',
      problem:
        'Off-the-shelf products impose a workflow that does not fit every company, so the system ends up running “on paper” while the real work happens outside it.',
      solution:
        'We design from your real operations: document the workflow, build an appropriate data model, and deliver in stages that are usable from the first milestone.',
      features: [
        'Workflow analysis and documentation before code',
        'A written data model and architecture design',
        'Staged delivery of usable increments',
        'Flexible roles and permissions',
        'Custom reports around your own KPIs',
        'Integration with existing systems or hardware',
        'Documented, maintainable code',
        'Knowledge transfer to your team at handover',
      ],
      steps: [
        'Analysis and scoping sessions',
        'Data model and architecture design',
        'Incremental development with regular reviews',
        'Testing against realistic data',
        'Phased launch, then support and improvement',
      ],
      deliverables: [
        'A scope and requirements document',
        'A working system on the target environment',
        'Technical handover documentation',
        'A post-launch support period',
      ],
      faq: [
        {
          q: 'How long does a custom system take?',
          a: 'It depends on scope. After the analysis session we give you a timeline with clear milestones before implementation starts.',
        },
        {
          q: 'Can we start with a small scope?',
          a: 'Yes, and we recommend it: start with the most important workflow, launch it, then add the next stages.',
        },
        {
          q: 'Who owns the code?',
          a: 'That is defined in the contract before we start, including code rights and documentation.',
        },
      ],
    },
  },

  {
    slug: 'web-development',
    icon: 'Globe',
    related: ['ui-ux-design', 'custom-software', 'digital-marketing'],
    ar: {
      title: 'تطوير المواقع وتطبيقات الويب',
      short: 'مواقع سريعة ومتوافقة مع محركات البحث ولوحات تحكم ويب متكاملة.',
      description:
        'نبني مواقع تعريفية ومتاجر ولوحات تحكم ويب بتقنيات حديثة: أداء عالٍ، تصميم متجاوب، دعم كامل للعربية (RTL)، وتهيئة تقنية لمحركات البحث.',
      problem:
        'مواقع كثيرة تُبنى على قوالب ثقيلة فتصبح بطيئة، وتفشل على الموبايل، ولا تُهيَّأ للعربية أو لمحركات البحث، فلا تجلب أي عملاء.',
      solution:
        'نبني بـ Next.js وTailwind CSS مع تركيز على الأداء وسرعة التحميل، وتهيئة تقنية كاملة للـ SEO، ودعم عربي أصلي من التصميم لا بإضافات لاحقة.',
      features: [
        'أداء عالٍ وسرعة تحميل',
        'تصميم متجاوب لكل الشاشات',
        'دعم عربي RTL أصلي',
        'تهيئة تقنية للـ SEO ومخططات schema',
        'لوحة تحكم للمحتوى عند الحاجة',
        'نماذج تواصل وربط واتساب',
        'ثنائي اللغة عربي/إنجليزي',
        'وضع ليلي ومعايير وصول أفضل',
      ],
      steps: [
        'تحديد الأهداف وهيكل الصفحات',
        'تصميم الواجهات ومراجعتها',
        'تطوير الموقع وربط المحتوى',
        'اختبار الأداء والتوافق',
        'النشر والتسليم والتدريب',
      ],
      deliverables: [
        'موقع منشور على نطاقك',
        'تهيئة SEO أساسية وخريطة موقع',
        'شرح لإدارة المحتوى',
        'فترة دعم بعد النشر',
      ],
      faq: [
        {
          q: 'هل الموقع يدعم العربية والإنجليزية؟',
          a: 'نعم، نبني الموقع ثنائي اللغة مع مسارات منفصلة لكل لغة واتجاه كتابة صحيح.',
        },
        {
          q: 'هل أستطيع تحديث المحتوى بنفسي؟',
          a: 'نعم، نوفّر طريقة لإدارة المحتوى مناسبة لحجم مشروعك ونشرح استخدامها.',
        },
        {
          q: 'هل تتولّون الاستضافة؟',
          a: 'نساعد في اختيار الاستضافة وإعدادها ونشر الموقع، مع توضيح التكاليف المتكررة.',
        },
      ],
    },
    en: {
      title: 'Web development',
      short: 'Fast, SEO-ready websites and full web dashboards.',
      description:
        'We build marketing sites, stores and web dashboards on a modern stack: high performance, responsive design, full Arabic (RTL) support, and technical SEO groundwork.',
      problem:
        'Many sites are built on heavy templates, so they load slowly, break on mobile, and are never prepared for Arabic or search engines — bringing in no customers.',
      solution:
        'We build with Next.js and Tailwind CSS, focused on performance and load speed, complete technical SEO, and native Arabic support designed in from the start rather than bolted on.',
      features: [
        'High performance and fast loading',
        'Responsive design for every screen',
        'Native Arabic RTL support',
        'Technical SEO and schema markup',
        'A content dashboard where needed',
        'Contact forms and WhatsApp integration',
        'Bilingual Arabic/English',
        'Dark mode and better accessibility',
      ],
      steps: [
        'Define goals and page structure',
        'Design and review the interfaces',
        'Build the site and wire up content',
        'Performance and compatibility testing',
        'Deploy, hand over and train',
      ],
      deliverables: [
        'A site published on your domain',
        'Baseline SEO setup and sitemap',
        'A walkthrough of content management',
        'A post-launch support period',
      ],
      faq: [
        {
          q: 'Does the site support Arabic and English?',
          a: 'Yes, we build bilingual sites with separate routes per language and correct text direction.',
        },
        {
          q: 'Can I update content myself?',
          a: 'Yes, we provide a content management approach suited to your project size and explain how to use it.',
        },
        {
          q: 'Do you handle hosting?',
          a: 'We help choose and configure hosting and deploy the site, with recurring costs made clear.',
        },
      ],
    },
  },

  {
    slug: 'mobile-apps',
    icon: 'Smartphone',
    related: ['custom-software', 'ui-ux-design', 'cloud-infrastructure'],
    ar: {
      title: 'تطبيقات الهواتف الذكية',
      short: 'تطبيقات موبايل لمتابعة الأعمال والمندوبين والطلبات.',
      description:
        'نطوّر تطبيقات موبايل مرتبطة بأنظمتك: متابعة مبيعات ومخزون، تطبيقات مندوبين، استلام طلبات، أو واجهة عملاء — مع مراعاة العمل في ظروف شبكة ضعيفة.',
      problem:
        'المدير أو المندوب يحتاج البيانات وهو خارج المكتب، وغالباً لا تتوفر واجهة موبايل حقيقية بل محاولة تصغير شاشة سطح المكتب.',
      solution:
        'نبني تطبيقاً مصمّماً للموبايل من الأساس، بتخزين مؤقت محلي يتحمّل ضعف الشبكة، ومزامنة عند توفر الاتصال، وصلاحيات منفصلة لكل دور.',
      features: [
        'تصميم مخصص للموبايل لا مجرد تصغير',
        'تخزين محلي مؤقت يتحمّل ضعف الشبكة',
        'مزامنة عند عودة الاتصال',
        'صلاحيات لكل دور (مندوب/مدير)',
        'إشعارات للأحداث المهمة',
        'دعم كامل للعربية RTL',
        'ربط بأنظمتك القائمة عبر API',
        'نشر على المتاجر أو توزيع داخلي',
      ],
      steps: [
        'تحديد سيناريوهات الاستخدام الأساسية',
        'تصميم تجربة الاستخدام والشاشات',
        'تطوير التطبيق وربطه بالـ API',
        'اختبار على أجهزة حقيقية',
        'النشر والمتابعة',
      ],
      deliverables: [
        'تطبيق عامل على المنصة المطلوبة',
        'ربط موثّق مع أنظمتك',
        'ملفات النشر أو الرفع على المتجر',
        'دعم بعد الإطلاق',
      ],
      faq: [
        {
          q: 'هل يوجد تطبيق موبايل لـ NEXORA Store؟',
          a: 'تطبيق Android قيد التطوير ولم يُطلق بعد. النسخة المتوفرة حالياً هي نسخة Windows.',
        },
        {
          q: 'هل يعمل التطبيق بدون إنترنت؟',
          a: 'نصمّم التطبيقات لتتحمّل ضعف أو انقطاع الشبكة بتخزين محلي مؤقت ومزامنة لاحقة، بحسب طبيعة الاستخدام.',
        },
        {
          q: 'هل تنشرون التطبيق على المتاجر؟',
          a: 'نعم، ونساعد في تجهيز متطلبات النشر، مع توضيح رسوم المتاجر ومتطلبات الحسابات.',
        },
      ],
    },
    en: {
      title: 'Mobile applications',
      short: 'Mobile apps for tracking business, reps and orders.',
      description:
        'We develop mobile apps connected to your systems: sales and stock tracking, rep apps, order intake, or customer-facing interfaces — designed for weak network conditions.',
      problem:
        'Managers and reps need data while away from the office, and usually there is no real mobile interface — just a shrunken desktop screen.',
      solution:
        'We build an app designed for mobile from the ground up, with local caching that tolerates poor connectivity, sync when a connection is available, and separate permissions per role.',
      features: [
        'Purpose-built mobile design, not a shrunken desktop',
        'Local caching that tolerates poor networks',
        'Sync when connectivity returns',
        'Role-based permissions (rep/manager)',
        'Notifications for important events',
        'Full Arabic RTL support',
        'API integration with your existing systems',
        'Store publishing or internal distribution',
      ],
      steps: [
        'Define the core usage scenarios',
        'Design the experience and screens',
        'Build the app and wire up the API',
        'Test on real devices',
        'Publish and follow up',
      ],
      deliverables: [
        'A working app on the target platform',
        'Documented integration with your systems',
        'Release artifacts or store submission',
        'Post-launch support',
      ],
      faq: [
        {
          q: 'Is there a mobile app for NEXORA Store?',
          a: 'The Android app is in development and has not been released yet. The currently available build is for Windows.',
        },
        {
          q: 'Does the app work offline?',
          a: 'We design apps to tolerate weak or dropped connections using local caching and later sync, depending on the use case.',
        },
        {
          q: 'Do you publish to the app stores?',
          a: 'Yes, and we help prepare publishing requirements, with store fees and account prerequisites made clear.',
        },
      ],
    },
  },

  {
    slug: 'cloud-infrastructure',
    icon: 'Cloud',
    related: ['custom-software', 'support-maintenance', 'web-development'],
    ar: {
      title: 'الاستضافة السحابية والبنية التقنية',
      short: 'إعداد سحابي آمن مع نسخ احتياطي ومزامنة ومراقبة.',
      description:
        'نجهّز البنية التقنية لأنظمتك: استضافة، قواعد بيانات، مزامنة سحابية، نسخ احتياطي تلقائي، وشهادات أمان — بإعداد موثّق يمكنك التحقّق منه.',
      problem:
        'إعدادات سحابية مرتجلة تنتج تكاليف غير متوقعة، وثغرات في الصلاحيات، وغياب نسخ احتياطي حقيقية قابلة للاسترجاع.',
      solution:
        'نضع إعداداً موثّقاً: بيئات منفصلة، صلاحيات بأقل قدر لازم، نسخ احتياطي مُختبَر الاسترجاع، ومراقبة للأخطاء والاستهلاك.',
      features: [
        'إعداد استضافة ونطاقات وشهادات SSL',
        'قواعد بيانات ونسخ احتياطي مجدول',
        'مزامنة سحابية للأنظمة المحلية',
        'قواعد صلاحيات وأمان للبيانات',
        'مراقبة الأخطاء والاستهلاك',
        'خطة استرجاع مُختبَرة',
        'ضبط تكاليف الاستهلاك',
        'توثيق البنية بالكامل',
      ],
      steps: [
        'مراجعة الوضع الحالي والاحتياج',
        'تصميم البنية والبيئات',
        'التنفيذ وضبط الصلاحيات',
        'اختبار النسخ والاسترجاع',
        'تسليم موثّق ومتابعة',
      ],
      deliverables: [
        'بنية سحابية عاملة وموثّقة',
        'جدول نسخ احتياطي واسترجاع مُختبَر',
        'قواعد صلاحيات وأمان مكتوبة',
        'تقدير تكاليف تشغيل شهرية',
      ],
      faq: [
        {
          q: 'أي مزوّد سحابي تستخدمون؟',
          a: 'نختار بحسب الحالة والتكلفة والمنطقة. في منتجاتنا الحالية نستخدم Firebase/Firestore للمزامنة، ويمكن استخدام بدائل عند الحاجة.',
        },
        {
          q: 'هل بياناتي آمنة على السحابة؟',
          a: 'نطبّق صلاحيات بأقل قدر لازم ونقل مشفّر، مع نسخ احتياطي. كما تبقى نسخة محلية في الأنظمة المحلية أولاً.',
        },
        {
          q: 'من يدفع تكاليف الاستضافة؟',
          a: 'التكاليف المتكررة على حسابك مباشرة لتبقى مالكاً للبنية، ونوضّح التقديرات قبل البدء.',
        },
      ],
    },
    en: {
      title: 'Cloud hosting and infrastructure',
      short: 'Secure cloud setup with backups, sync and monitoring.',
      description:
        'We set up the infrastructure behind your systems: hosting, databases, cloud sync, automated backups and security certificates — with a documented setup you can verify.',
      problem:
        'Improvised cloud setups produce unpredictable costs, permission gaps, and no real, restorable backups.',
      solution:
        'We put in place a documented setup: separated environments, least-privilege permissions, restore-tested backups, and monitoring for errors and consumption.',
      features: [
        'Hosting, domain and SSL certificate setup',
        'Databases and scheduled backups',
        'Cloud sync for local systems',
        'Data security and permission rules',
        'Error and consumption monitoring',
        'A restore-tested recovery plan',
        'Consumption cost control',
        'Fully documented infrastructure',
      ],
      steps: [
        'Review the current state and requirements',
        'Design the architecture and environments',
        'Implement and configure permissions',
        'Test backup and restore',
        'Documented handover and follow-up',
      ],
      deliverables: [
        'Working, documented cloud infrastructure',
        'A backup schedule with a tested restore',
        'Written security and permission rules',
        'An estimate of monthly running costs',
      ],
      faq: [
        {
          q: 'Which cloud provider do you use?',
          a: 'We choose based on the case, cost and region. Our current products use Firebase/Firestore for sync, and alternatives can be used when needed.',
        },
        {
          q: 'Is my data safe in the cloud?',
          a: 'We apply least-privilege permissions and encrypted transport, with backups. Local-first systems also keep a local copy.',
        },
        {
          q: 'Who pays for hosting?',
          a: 'Recurring costs go on your own account so you stay the owner of the infrastructure, and we share estimates before starting.',
        },
      ],
    },
  },

  {
    slug: 'ui-ux-design',
    icon: 'Palette',
    related: ['web-development', 'mobile-apps', 'digital-marketing'],
    ar: {
      title: 'تصميم واجهات وتجربة المستخدم',
      short: 'واجهات عربية واضحة تُقلّل الأخطاء وتُسرّع العمل اليومي.',
      description:
        'نصمّم واجهات تركّز على سرعة إتمام المهمة وتقليل الأخطاء: تسلسل شاشات منطقي، عناصر واضحة، وتصميم عربي أصلي بخطوط مقروءة واتجاه صحيح.',
      problem:
        'واجهات مزدحمة أو مترجمة حرفياً تُربك المستخدم، فتزيد أخطاء الإدخال وتحتاج تدريباً طويلاً وتُبطئ العمل في أوقات الذروة.',
      solution:
        'نبني التصميم على مهام حقيقية: نرتّب الشاشات حسب تدفق العمل، ونختبر النماذج مع مستخدمين فعليين قبل التطوير.',
      features: [
        'تصميم عربي RTL أصلي',
        'تسلسل شاشات مبني على تدفق العمل',
        'نماذج تفاعلية قبل التطوير',
        'نظام تصميم موحّد (ألوان، خطوط، مكوّنات)',
        'وضع ليلي وتباين مناسب',
        'مراعاة معايير الوصول الأساسية',
        'تصميم للطباعة والفواتير',
        'تسليم ملفات جاهزة للتطوير',
      ],
      steps: [
        'فهم المستخدمين والمهام الأساسية',
        'هيكلة المعلومات وتدفق الشاشات',
        'تصميم نماذج تفاعلية ومراجعتها',
        'تجربة مع مستخدمين وتعديل',
        'تسليم نظام التصميم للتطوير',
      ],
      deliverables: [
        'نظام تصميم موحّد',
        'نماذج تفاعلية لكل الشاشات الأساسية',
        'ملفات تصميم جاهزة للتطوير',
        'دليل استخدام مكوّنات الواجهة',
      ],
      faq: [
        {
          q: 'هل تصمّمون للعربية بشكل صحيح؟',
          a: 'نعم، التصميم عربي أولاً: اتجاه RTL، خطوط عربية مقروءة، وترتيب عناصر مناسب للقراءة من اليمين.',
        },
        {
          q: 'هل يمكن تصميم واجهة نظام قائم بدون إعادة بنائه؟',
          a: 'نعم، يمكن تحسين الواجهة تدريجياً على نفس النظام، ونحدد أولويات التغيير حسب الأثر.',
        },
        {
          q: 'هل يشمل ذلك الهوية البصرية؟',
          a: 'الهوية البصرية خدمة منفصلة يمكن ضمّها، وتشمل الشعار والألوان والخطوط والتطبيقات.',
        },
      ],
    },
    en: {
      title: 'UI/UX design',
      short: 'Clear Arabic interfaces that reduce errors and speed up daily work.',
      description:
        'We design interfaces focused on task completion speed and error reduction: logical screen flow, clear controls, and native Arabic design with readable type and correct direction.',
      problem:
        'Cluttered or literally translated interfaces confuse users, increasing input errors, requiring long training, and slowing work at peak times.',
      solution:
        'We design around real tasks: order screens by workflow and test prototypes with actual users before development.',
      features: [
        'Native Arabic RTL design',
        'Screen flow driven by the actual workflow',
        'Interactive prototypes before development',
        'A unified design system (colour, type, components)',
        'Dark mode and appropriate contrast',
        'Baseline accessibility considerations',
        'Print and invoice design',
        'Developer-ready handoff files',
      ],
      steps: [
        'Understand users and core tasks',
        'Information architecture and screen flow',
        'Design and review interactive prototypes',
        'Test with users and iterate',
        'Hand the design system to development',
      ],
      deliverables: [
        'A unified design system',
        'Interactive prototypes for all core screens',
        'Developer-ready design files',
        'A component usage guide',
      ],
      faq: [
        {
          q: 'Do you design properly for Arabic?',
          a: 'Yes, design is Arabic-first: RTL direction, readable Arabic type, and element ordering suited to right-to-left reading.',
        },
        {
          q: 'Can you redesign an existing system without rebuilding it?',
          a: 'Yes, the interface can be improved incrementally on the same system, prioritising changes by impact.',
        },
        {
          q: 'Does this include brand identity?',
          a: 'Brand identity is a separate service that can be added, covering logo, colours, type and applications.',
        },
      ],
    },
  },

  {
    slug: 'digital-marketing',
    icon: 'Megaphone',
    related: ['web-development', 'ui-ux-design', 'pos-inventory-systems'],
    ar: {
      title: 'التسويق الرقمي والهوية البصرية',
      short: 'هوية بصرية متّسقة وحضور رقمي مبني على قياس فعلي.',
      description:
        'نساعدك على بناء هوية بصرية متّسقة وحضور رقمي مدروس: تهيئة الموقع لمحركات البحث، محتوى يجيب على أسئلة عملائك، وقياس واضح للنتائج.',
      problem:
        'إنفاق تسويقي بدون قياس، وهوية بصرية غير متّسقة بين المنصات، ومحتوى لا يجيب على ما يسأل عنه العميل فعلاً.',
      solution:
        'نبدأ بتثبيت الأساسيات: هوية موحّدة، صفحات هبوط واضحة، تهيئة تقنية للبحث، ثم قياس ما ينتج عملاء فعليين قبل التوسّع في الإنفاق.',
      features: [
        'هوية بصرية موحّدة (شعار، ألوان، خطوط)',
        'تهيئة تقنية لمحركات البحث',
        'صفحات هبوط موجّهة للتحويل',
        'محتوى تعليمي يجيب أسئلة العملاء',
        'ربط واتساب ونماذج تواصل',
        'قياس الزيارات ومصادرها',
        'تتبّع الطلبات الواردة',
        'تقرير شهري بالنتائج',
      ],
      steps: [
        'تحديد الجمهور والرسالة الأساسية',
        'ضبط الهوية البصرية والأصول',
        'تهيئة الموقع وصفحات الهبوط',
        'إنتاج المحتوى والنشر',
        'قياس وتحسين دوري',
      ],
      deliverables: [
        'دليل هوية بصرية مختصر',
        'أصول جاهزة للمنصات',
        'تهيئة SEO أساسية موثّقة',
        'تقرير قياس دوري',
      ],
      faq: [
        {
          q: 'هل تضمنون نتائج محددة؟',
          a: 'لا نقدّم ضمانات رقمية غير قابلة للتحقّق. نضع أهدافاً قابلة للقياس ونشارك النتائج الفعلية بشفافية.',
        },
        {
          q: 'هل تديرون الحملات المدفوعة؟',
          a: 'نبدأ بتثبيت الأساسيات والقياس، ثم نقيّم معك جدوى الحملات المدفوعة بحسب النشاط.',
        },
        {
          q: 'هل الهوية البصرية تشمل الشعار؟',
          a: 'نعم، تشمل الشعار وتطبيقاته والألوان والخطوط والاستخدامات الأساسية.',
        },
      ],
    },
    en: {
      title: 'Digital marketing and brand identity',
      short: 'A consistent visual identity and a digital presence built on real measurement.',
      description:
        'We help you build a consistent visual identity and a considered digital presence: search-ready site setup, content that answers your customers’ questions, and clear result measurement.',
      problem:
        'Marketing spend without measurement, inconsistent identity across platforms, and content that never answers what the customer actually asks.',
      solution:
        'We start by fixing fundamentals: a unified identity, clear landing pages and technical search setup — then measure what produces real leads before scaling spend.',
      features: [
        'A unified visual identity (logo, colours, type)',
        'Technical search engine setup',
        'Conversion-focused landing pages',
        'Educational content answering customer questions',
        'WhatsApp and contact form integration',
        'Traffic and source measurement',
        'Inbound request tracking',
        'A monthly results report',
      ],
      steps: [
        'Define the audience and core message',
        'Set the visual identity and assets',
        'Prepare the site and landing pages',
        'Produce and publish content',
        'Measure and improve continuously',
      ],
      deliverables: [
        'A concise brand identity guide',
        'Platform-ready assets',
        'Documented baseline SEO setup',
        'A recurring measurement report',
      ],
      faq: [
        {
          q: 'Do you guarantee specific results?',
          a: 'We do not offer unverifiable numeric guarantees. We set measurable goals and share actual results transparently.',
        },
        {
          q: 'Do you run paid campaigns?',
          a: 'We start with fundamentals and measurement, then assess with you whether paid campaigns make sense for your business.',
        },
        {
          q: 'Does brand identity include the logo?',
          a: 'Yes, it covers the logo and its applications, colours, type and core usage rules.',
        },
      ],
    },
  },

  {
    slug: 'support-maintenance',
    icon: 'Headphones',
    related: ['pos-inventory-systems', 'cloud-infrastructure', 'custom-software'],
    ar: {
      title: 'الدعم الفني والصيانة',
      short: 'دعم مستمر وتحديثات ونسخ احتياطي حتى لا يتوقف عملك.',
      description:
        'نوفّر دعماً فنياً بالعربية وصيانة دورية لأنظمتك: متابعة الأعطال، تحديثات الإصدارات، مراجعة النسخ الاحتياطي، وتدريب المستخدمين الجدد.',
      problem:
        'نظام بلا صيانة يتراكم فيه العطل: نسخ احتياطي متوقفة، مستخدمون جدد بلا تدريب، وأخطاء صغيرة تتحول لتوقف كامل في وقت حرج.',
      solution:
        'نتّفق على نطاق دعم واضح: قنوات تواصل، أوقات استجابة، مراجعة دورية للنسخ الاحتياطي، وتحديثات مجدولة بدون إيقاف العمل.',
      features: [
        'قناة دعم مباشرة بالعربية',
        'أوقات استجابة متفق عليها',
        'مراجعة دورية للنسخ الاحتياطي',
        'تحديثات إصدار مجدولة',
        'تدريب المستخدمين الجدد',
        'إصلاح الأعطال ومتابعتها',
        'مراجعة أداء النظام',
        'تقرير دوري بحالة النظام',
      ],
      steps: [
        'مراجعة النظام الحالي وحالته',
        'تحديد نطاق الدعم وأوقات الاستجابة',
        'ضبط النسخ الاحتياطي والمراقبة',
        'دعم تشغيلي دوري',
        'مراجعة دورية وتحسين',
      ],
      deliverables: [
        'اتفاقية دعم بنطاق واضح',
        'خطة نسخ احتياطي مُراجَعة',
        'سجل أعطال ومعالجات',
        'تقرير دوري بحالة النظام',
      ],
      faq: [
        {
          q: 'هل الدعم متوفر بعد ساعات العمل؟',
          a: 'نحدّد أوقات التغطية في اتفاقية الدعم بوضوح قبل البدء، بحسب طبيعة نشاطك.',
        },
        {
          q: 'هل تدعمون أنظمة لم تبنوها؟',
          a: 'ندرس الحالة أولاً؛ إن كان النظام قابلاً للصيانة ولدينا وصول كافٍ للكود أو البيئة، نقدّم الدعم.',
        },
        {
          q: 'ماذا يحدث عند فقدان البيانات؟',
          a: 'نعتمد على نسخ احتياطي مُختبَر الاسترجاع؛ لذلك نراجع النسخ دورياً ولا نكتفي بتشغيلها.',
        },
      ],
    },
    en: {
      title: 'Support and maintenance',
      short: 'Ongoing support, updates and backups so your business never stops.',
      description:
        'We provide Arabic technical support and regular maintenance for your systems: incident handling, version updates, backup review, and training for new users.',
      problem:
        'An unmaintained system accumulates failures: stopped backups, untrained new users, and small errors that turn into a full outage at the worst moment.',
      solution:
        'We agree a clear support scope: communication channels, response times, periodic backup verification, and scheduled updates that do not interrupt operations.',
      features: [
        'A direct Arabic support channel',
        'Agreed response times',
        'Periodic backup verification',
        'Scheduled version updates',
        'Training for new users',
        'Incident fixing and tracking',
        'System performance review',
        'A periodic system health report',
      ],
      steps: [
        'Review the current system and its state',
        'Define support scope and response times',
        'Configure backups and monitoring',
        'Ongoing operational support',
        'Periodic review and improvement',
      ],
      deliverables: [
        'A support agreement with a clear scope',
        'A verified backup plan',
        'An incident and resolution log',
        'A periodic system health report',
      ],
      faq: [
        {
          q: 'Is support available outside working hours?',
          a: 'Coverage windows are defined clearly in the support agreement before we start, based on your business needs.',
        },
        {
          q: 'Do you support systems you did not build?',
          a: 'We assess the case first; if the system is maintainable and we have sufficient access to the code or environment, we provide support.',
        },
        {
          q: 'What happens if data is lost?',
          a: 'We rely on restore-tested backups, which is why we verify them periodically rather than just enabling them.',
        },
      ],
    },
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(slug: string, limit = 3): Service[] {
  const service = getServiceBySlug(slug);
  if (!service) return services.slice(0, limit);

  const related = service.related
    .map((relatedSlug) => getServiceBySlug(relatedSlug))
    .filter((item): item is Service => Boolean(item));

  return related.slice(0, limit);
}

export const serviceSlugs: string[] = services.map((service) => service.slug);
