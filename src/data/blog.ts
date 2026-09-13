export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'note'; text: string };

export type BlogContent = {
  title: string;
  excerpt: string;
  category: string;
  body: BlogBlock[];
};

export type BlogPost = {
  slug: string;
  date: string;
  /** دقائق قراءة تقديرية */
  readMinutes: number;
  ar: BlogContent;
  en: BlogContent;
};

/**
 * مقالات تعليمية أصلية — محتوى عام عن أنظمة الأعمال،
 * وليس أخباراً أو دراسات حالة عن عملاء.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: 'offline-first-pos-why-it-matters',
    date: '2026-08-18',
    readMinutes: 6,
    ar: {
      title: 'لماذا يجب أن يعمل نظام نقاط البيع بدون إنترنت؟',
      excerpt:
        'انقطاع الإنترنت لدقائق قد يوقف البيع في الأنظمة السحابية البحتة. نشرح معمارية «المحلي أولاً» وكيف تحمي مبيعاتك.',
      category: 'أنظمة نقاط البيع',
      body: [
        {
          type: 'p',
          text: 'أغلب أنظمة نقاط البيع الحديثة تُبنى على السحابة بالكامل: كل عملية بيع تُرسل إلى سيرفر بعيد قبل أن تُعتبر مكتملة. هذا التصميم مريح للمطوّر، لكنه يضع نشاطك التجاري رهينة لجودة الإنترنت في موقعك.',
        },
        { type: 'h2', text: 'ماذا يحدث فعلياً عند انقطاع الشبكة؟' },
        {
          type: 'p',
          text: 'في النظام السحابي البحت، انقطاع الإنترنت يعني توقّف شاشة الكاشير عن حفظ الفواتير. النتيجة العملية: طابور انتظار، بيع على ورق يُدخل لاحقاً يدوياً، واحتمال كبير لأخطاء في المخزون والتحصيل.',
        },
        {
          type: 'ul',
          items: [
            'فواتير لا تُحفظ فتُكتب على ورق ثم تُدخل بأرقام غير دقيقة',
            'فرق بين المخزون الفعلي والمخزون المسجّل بعد انتهاء الانقطاع',
            'عدم قدرة الكاشير على معرفة سعر الصنف أو رصيده',
            'خسائر مباشرة في أوقات الذروة وهي أكثر الأوقات ربحاً',
          ],
        },
        { type: 'h2', text: 'ما معنى «المحلي أولاً» (Local-First)؟' },
        {
          type: 'p',
          text: 'المعمارية المحلية أولاً تقلب الترتيب: البيانات تُكتب أولاً في قاعدة بيانات على الجهاز نفسه — مثل SQLite — وتُعتبر العملية مكتملة بمجرد نجاح الكتابة المحلية. المزامنة مع السحابة تحدث بعد ذلك في الخلفية، ومتى توفّر الاتصال.',
        },
        {
          type: 'ul',
          items: [
            'زمن الاستجابة لا يعتمد على سرعة الشبكة، بل على القرص المحلي',
            'العمل لا يتوقف عند الانقطاع لأن مصدر الحقيقة أثناء التشغيل محلي',
            'المزامنة تصبح ميزة إضافية لا شرطاً للعمل',
            'نسخة من بياناتك موجودة دائماً تحت يدك',
          ],
        },
        { type: 'h2', text: 'وماذا عن العمل من أكثر من جهاز؟' },
        {
          type: 'p',
          text: 'هنا يأتي دور طبقة المزامنة. النظام المحلي أولاً لا يعني نظاماً معزولاً: عند توفر الإنترنت تُرفع العمليات الجديدة وتُنزل تغييرات الأجهزة الأخرى. المهم أن يكون هذا التبادل في الخلفية، وأن يتعامل النظام مع التعارضات بقواعد واضحة بدلاً من تجاهلها.',
        },
        { type: 'h2', text: 'أسئلة يجب أن تسألها قبل اختيار نظام' },
        {
          type: 'ol',
          items: [
            'هل يستمر البيع والطباعة بدون إنترنت بشكل كامل؟',
            'أين تُخزّن البيانات أثناء الانقطاع، ومتى تُزامن؟',
            'كيف يتعامل النظام مع تعارض التعديلات بين جهازين؟',
            'هل أستطيع تصدير بياناتي كاملة، ومتى؟',
            'هل النسخ الاحتياطي مُختبَر الاسترجاع أم مجرد ملف؟',
          ],
        },
        {
          type: 'note',
          text: 'الخلاصة: لا تختبر النظام على شبكة مثالية. اطلب تجربة تُفصل فيها الشبكة عن الجهاز وأنت تبيع، وراقب ما يحدث.',
        },
      ],
    },
    en: {
      title: 'Why your POS system must work offline',
      excerpt:
        'A few minutes without internet can stop selling entirely in purely cloud-based systems. Here is how local-first architecture protects your sales.',
      category: 'Point of sale',
      body: [
        {
          type: 'p',
          text: 'Most modern POS systems are built entirely around the cloud: every sale is sent to a remote server before it is considered complete. That design is convenient for the developer, but it makes your business a hostage to the internet quality at your location.',
        },
        { type: 'h2', text: 'What actually happens when the network drops?' },
        {
          type: 'p',
          text: 'In a purely cloud-based system, losing connectivity means the register can no longer save invoices. The practical result: a queue at the counter, sales written on paper and entered manually later, and a high chance of stock and collection errors.',
        },
        {
          type: 'ul',
          items: [
            'Invoices that cannot be saved get written on paper and re-entered inaccurately',
            'A gap between physical and recorded stock once the outage ends',
            'Cashiers unable to check an item’s price or balance',
            'Direct losses during peak hours — your most profitable times',
          ],
        },
        { type: 'h2', text: 'What does “local-first” mean?' },
        {
          type: 'p',
          text: 'Local-first architecture inverts the order: data is written first to a database on the machine itself — such as SQLite — and the operation is considered complete as soon as that local write succeeds. Cloud syncing then happens in the background whenever a connection is available.',
        },
        {
          type: 'ul',
          items: [
            'Response time depends on the local disk, not network speed',
            'Work does not stop during an outage because the operating source of truth is local',
            'Sync becomes an added benefit, not a precondition for working',
            'A copy of your data is always in your own hands',
          ],
        },
        { type: 'h2', text: 'What about working from more than one device?' },
        {
          type: 'p',
          text: 'That is the job of the sync layer. Local-first does not mean isolated: when internet is available, new operations are uploaded and changes from other devices are pulled down. What matters is that this exchange happens in the background and that the system handles conflicts with clear rules rather than ignoring them.',
        },
        { type: 'h2', text: 'Questions to ask before choosing a system' },
        {
          type: 'ol',
          items: [
            'Does selling and printing continue fully without internet?',
            'Where is data stored during an outage, and when does it sync?',
            'How does the system resolve conflicting edits between two devices?',
            'Can I export all of my data, and when?',
            'Is the backup restore-tested, or just a file sitting somewhere?',
          ],
        },
        {
          type: 'note',
          text: 'Bottom line: do not evaluate a system on a perfect network. Ask for a demo where the network is unplugged mid-sale, and watch what happens.',
        },
      ],
    },
  },

  {
    slug: 'inventory-accuracy-checklist',
    date: '2026-08-05',
    readMinutes: 7,
    ar: {
      title: 'قائمة تحقّق: كيف تُقرّب المخزون المسجّل من المخزون الفعلي؟',
      excerpt:
        'فرق الجرد ليس قدراً محتوماً. سبعة إجراءات عملية تقلّل الفارق بين ما في النظام وما على الرفوف.',
      category: 'إدارة المخازن',
      body: [
        {
          type: 'p',
          text: 'كل متجر يعاني من فارق بين رصيد النظام والرصيد الفعلي. المشكلة ليست في وجود الفارق، بل في عدم معرفة سببه. الفارق غير المفسَّر يعني أنك تتّخذ قرارات شراء وتسعير على أرقام غير صحيحة.',
        },
        { type: 'h2', text: 'الأسباب الشائعة للفارق' },
        {
          type: 'ul',
          items: [
            'بيع أصناف بدون تسجيلها (بيع سريع خارج النظام)',
            'استلام مشتريات فعلياً قبل إدخال فاتورة الشراء',
            'مرتجعات تُعاد للرف بدون تسجيل مرتجع',
            'تلف أو هالك لا يُسجّل كخصم مخزون',
            'وحدات قياس غير مضبوطة (كرتونة مقابل قطعة)',
            'تحويلات بين المخازن بدون توثيق',
          ],
        },
        { type: 'h2', text: 'سبعة إجراءات عملية' },
        {
          type: 'ol',
          items: [
            'امنع البيع خارج النظام بقاعدة واضحة: لا سلعة تخرج بدون فاتورة.',
            'اربط استلام المشتريات بإدخال الفاتورة في نفس اليوم.',
            'أنشئ إجراء مرتجع رسمي بدلاً من إعادة السلعة للرف مباشرة.',
            'سجّل التلف والهالك كحركة مخزون مستقلة لها سبب مكتوب.',
            'اضبط وحدات القياس ومعاملات التحويل لكل صنف مرة واحدة بدقة.',
            'وثّق كل تحويل بين المخازن بحركة مخزون لا برسالة شفهية.',
            'اعمل جرداً دورياً جزئياً لأعلى 20% من الأصناف حركةً بدلاً من جرد سنوي شامل فقط.',
          ],
        },
        { type: 'h2', text: 'لماذا الجرد الجزئي الدوري أفضل؟' },
        {
          type: 'p',
          text: 'الجرد السنوي الشامل يكشف الفارق بعد وقوعه بأشهر، فيصعب معرفة سببه. الجرد الجزئي الدوري — أن تجرد مجموعة أصناف كل أسبوع — يقصّر المدة بين وقوع الخطأ واكتشافه، فتصبح معرفة السبب ممكنة ومعالجته مجدية.',
        },
        { type: 'h2', text: 'دور النظام في تقليل الفارق' },
        {
          type: 'p',
          text: 'النظام الجيد لا يمنع الخطأ البشري، لكنه يجعل تتبّعه ممكناً: صلاحيات تمنع التعديل غير المصرّح به، سجل تدقيق يوضّح من نفّذ كل حركة ومتى، وتقارير تُظهر الأصناف ذات الفارق المتكرر. عند توفر هذه العناصر يتحول الفارق من لغز إلى مسألة قابلة للحل.',
        },
        {
          type: 'note',
          text: 'قِس قبل أن تعالج: ابدأ بحساب نسبة الفارق لأعلى 20 صنفاً حركةً، وستعرف من أين تبدأ.',
        },
      ],
    },
    en: {
      title: 'A checklist for closing the gap between recorded and physical stock',
      excerpt:
        'Stocktaking variance is not inevitable. Seven practical measures that reduce the gap between what the system says and what is on the shelf.',
      category: 'Inventory management',
      body: [
        {
          type: 'p',
          text: 'Every shop has some gap between system stock and physical stock. The problem is not that a gap exists — it is not knowing why. An unexplained variance means you are making purchasing and pricing decisions on numbers that are wrong.',
        },
        { type: 'h2', text: 'Common causes of variance' },
        {
          type: 'ul',
          items: [
            'Items sold without being recorded (quick sales outside the system)',
            'Purchases physically received before the purchase invoice is entered',
            'Returns put back on the shelf without a recorded return',
            'Damage and waste not recorded as a stock deduction',
            'Misconfigured units of measure (case versus piece)',
            'Undocumented transfers between warehouses',
          ],
        },
        { type: 'h2', text: 'Seven practical measures' },
        {
          type: 'ol',
          items: [
            'Stop off-system selling with one clear rule: no goods leave without an invoice.',
            'Tie goods receipt to entering the purchase invoice the same day.',
            'Create a formal return procedure instead of putting stock straight back on the shelf.',
            'Record damage and waste as a separate stock movement with a written reason.',
            'Configure units of measure and conversion factors accurately once per item.',
            'Document every inter-warehouse transfer as a stock movement, not a verbal message.',
            'Run rolling partial counts on your top 20% fastest-moving items instead of relying only on an annual full count.',
          ],
        },
        { type: 'h2', text: 'Why rolling partial counts work better' },
        {
          type: 'p',
          text: 'An annual full count reveals variance months after it happened, making the cause almost impossible to trace. Rolling partial counts — auditing a group of items each week — shorten the gap between an error occurring and being found, which makes diagnosing and fixing the cause realistic.',
        },
        { type: 'h2', text: 'The system’s role in reducing variance' },
        {
          type: 'p',
          text: 'A good system does not prevent human error, but it makes it traceable: permissions that block unauthorised edits, an audit log showing who performed each movement and when, and reports that surface items with recurring variance. With those in place, variance shifts from a mystery to a solvable problem.',
        },
        {
          type: 'note',
          text: 'Measure before you fix: start by calculating the variance rate on your 20 fastest-moving items, and you will know where to begin.',
        },
      ],
    },
  },

  {
    slug: 'choosing-business-software-checklist',
    date: '2026-07-21',
    readMinutes: 8,
    ar: {
      title: 'كيف تختار نظاماً برمجياً لعملك بدون أن تدفع مرتين؟',
      excerpt:
        'معايير عملية لتقييم أي نظام قبل الشراء: ملكية البيانات، تكلفة التشغيل الحقيقية، والتوسّع، والخروج.',
      category: 'اختيار البرمجيات',
      body: [
        {
          type: 'p',
          text: 'أغلى قرار تقني ليس النظام الذي تشتريه، بل النظام الذي تُجبر على استبداله بعد سنة. الاستبدال يعني إعادة إدخال بيانات، وإعادة تدريب فريق، وفقدان سجل تاريخي — وكل ذلك مكلف أكثر من الفرق في سعر الترخيص.',
        },
        { type: 'h2', text: 'أولاً: ملكية البيانات' },
        {
          type: 'p',
          text: 'اسأل سؤالاً محدداً: إن أردت إنهاء التعامل غداً، كيف أحصل على بياناتي وبأي صيغة؟ الإجابة المقبولة هي تصدير كامل بصيغة قابلة للقراءة أو قاعدة بيانات محلية تملكها. الإجابة غير المقبولة هي «تواصل مع الدعم».',
        },
        { type: 'h2', text: 'ثانياً: التكلفة الحقيقية للتشغيل' },
        {
          type: 'ul',
          items: [
            'سعر الترخيص أو الاشتراك الشهري',
            'تكلفة الاستضافة والمزامنة السحابية إن وُجدت',
            'تكلفة الأجهزة: طابعات، قارئات باركود، أدراج نقدية',
            'تكلفة التدريب ووقت الفريق خلال التحوّل',
            'تكلفة التخصيص المطلوب لنشاطك',
            'تكلفة الدعم السنوي بعد انتهاء فترة الضمان',
          ],
        },
        { type: 'h2', text: 'ثالثاً: هل يعمل في ظروفك؟' },
        {
          type: 'p',
          text: 'اختبر النظام في أسوأ ظرف لا في أفضله: شبكة ضعيفة، جهاز متوسط المواصفات، وقت ذروة، ومستخدم غير متمرّس. النظام الذي ينجح في هذا الاختبار هو الذي سيعمل عندك فعلاً.',
        },
        { type: 'h2', text: 'رابعاً: الصلاحيات وسجل التدقيق' },
        {
          type: 'p',
          text: 'أي نظام يدير أموالاً ومخزوناً يحتاج صلاحيات دقيقة لكل دور، وسجلاً يوضّح من نفّذ كل عملية حسّاسة ومتى. بدون هذين العنصرين لا يمكنك فحص خلاف داخلي أو تتبّع خطأ.',
        },
        { type: 'h2', text: 'خامساً: مسار التوسّع' },
        {
          type: 'ol',
          items: [
            'ماذا يحدث عند إضافة فرع أو مخزن ثانٍ؟',
            'ما حدود عدد المستخدمين والأصناف عملياً؟',
            'هل يمكن ربط النظام بأنظمة أخرى عبر API؟',
            'كيف تُطبّق التحديثات، وهل تُوقف العمل؟',
          ],
        },
        { type: 'h2', text: 'سادساً: من يدعمك بعد البيع؟' },
        {
          type: 'p',
          text: 'اطلب تحديداً مكتوباً: قنوات الدعم، أوقات التغطية، زمن الاستجابة المتوقع، وما يشمله الدعم وما لا يشمله. الوعود الشفهية بـ«دعم دائم» لا تُختبر إلا في أول عطل حقيقي.',
        },
        {
          type: 'note',
          text: 'قاعدة عملية: اطلب تجربة على بياناتك الحقيقية لأسبوع قبل أي دفعة. النظام الذي يرفض ذلك يخبرك بشيء.',
        },
      ],
    },
    en: {
      title: 'How to choose business software without paying twice',
      excerpt:
        'Practical criteria for evaluating any system before buying: data ownership, true running cost, scaling, and exit.',
      category: 'Choosing software',
      body: [
        {
          type: 'p',
          text: 'The most expensive technical decision is not the system you buy — it is the system you are forced to replace a year later. Replacement means re-entering data, retraining a team and losing historical records, all of which costs far more than any difference in license price.',
        },
        { type: 'h2', text: 'First: data ownership' },
        {
          type: 'p',
          text: 'Ask one specific question: if I want to end the relationship tomorrow, how do I get my data and in what format? An acceptable answer is a full export in a readable format, or a local database you own. An unacceptable answer is “contact support”.',
        },
        { type: 'h2', text: 'Second: the true cost of running it' },
        {
          type: 'ul',
          items: [
            'License price or monthly subscription',
            'Hosting and cloud sync costs, if any',
            'Hardware: printers, barcode scanners, cash drawers',
            'Training cost and your team’s time during the transition',
            'Customisation needed for your specific business',
            'Annual support cost after the warranty period ends',
          ],
        },
        { type: 'h2', text: 'Third: does it work in your conditions?' },
        {
          type: 'p',
          text: 'Test the system in your worst conditions, not your best: a weak network, mid-range hardware, peak hours, and an inexperienced user. The system that survives that test is the one that will actually work for you.',
        },
        { type: 'h2', text: 'Fourth: permissions and audit log' },
        {
          type: 'p',
          text: 'Any system handling money and stock needs granular permissions per role and a log showing who performed each sensitive action and when. Without both, you cannot investigate an internal dispute or trace an error.',
        },
        { type: 'h2', text: 'Fifth: the scaling path' },
        {
          type: 'ol',
          items: [
            'What happens when you add a second branch or warehouse?',
            'What are the practical limits on users and items?',
            'Can the system integrate with other systems via an API?',
            'How are updates applied, and do they interrupt operations?',
          ],
        },
        { type: 'h2', text: 'Sixth: who supports you after the sale?' },
        {
          type: 'p',
          text: 'Ask for it in writing: support channels, coverage hours, expected response time, and what support does and does not include. Verbal promises of “always-on support” are only tested during the first real outage.',
        },
        {
          type: 'note',
          text: 'A practical rule: ask for a one-week trial on your real data before any payment. A vendor who refuses is telling you something.',
        },
      ],
    },
  },
];

export const hasBlogPosts: boolean = blogPosts.length > 0;

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getSortedBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getRelatedPosts(slug: string, limit = 2): BlogPost[] {
  return getSortedBlogPosts()
    .filter((post) => post.slug !== slug)
    .slice(0, limit);
}

export const blogSlugs: string[] = blogPosts.map((post) => post.slug);
