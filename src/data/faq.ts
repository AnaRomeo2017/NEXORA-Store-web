export type FaqItem = {
  id: string;
  ar: { q: string; a: string };
  en: { q: string; a: string };
};

/** أسئلة عامة عن الشركة وطريقة العمل */
export const generalFaq: FaqItem[] = [
  {
    id: 'start',
    ar: {
      q: 'كيف نبدأ العمل معكم؟',
      a: 'تبدأ بمحادثة قصيرة عبر النموذج أو واتساب نفهم فيها نشاطك ومشكلتك. بعدها نرسل نطاق عمل مكتوباً وتقديراً زمنياً وسعرياً، ولا يبدأ التنفيذ قبل موافقتك عليه.',
    },
    en: {
      q: 'How do we start working together?',
      a: 'It starts with a short conversation via the form or WhatsApp so we understand your business and problem. We then send a written scope with a time and cost estimate, and nothing starts before you approve it.',
    },
  },
  {
    id: 'pricing',
    ar: {
      q: 'كيف تُحدّد الأسعار؟',
      a: 'السعر يعتمد على النطاق: عدد الشاشات، التكامل المطلوب، ومدة الدعم. نقدّم تقديراً بعد جلسة التحليل، ولا نضع سعراً قبل فهم الاحتياج.',
    },
    en: {
      q: 'How is pricing determined?',
      a: 'Price depends on scope: number of screens, required integrations, and support duration. We provide an estimate after the analysis session and never quote before understanding the requirement.',
    },
  },
  {
    id: 'timeline',
    ar: {
      q: 'كم يستغرق تنفيذ المشروع؟',
      a: 'يختلف حسب النوع. تركيب نظام جاهز مثل NEXORA Store وإعداده وتدريب الفريق أسرع بكثير من بناء نظام مخصص. تحصل على جدول زمني بمراحل قبل البدء.',
    },
    en: {
      q: 'How long does a project take?',
      a: 'It varies by type. Installing and configuring a ready product like NEXORA Store with team training is far quicker than building a custom system. You receive a milestone schedule before we start.',
    },
  },
  {
    id: 'data-ownership',
    ar: {
      q: 'من يملك البيانات والكود؟',
      a: 'بياناتك ملكك دائماً، ومتاحة للتصدير. أما حقوق الكود في المشاريع المخصصة فتُحدّد كتابةً في العقد قبل البدء.',
    },
    en: {
      q: 'Who owns the data and the code?',
      a: 'Your data is always yours and available for export. Code rights on custom projects are defined in writing in the contract before we start.',
    },
  },
  {
    id: 'support-after',
    ar: {
      q: 'هل يوجد دعم بعد التسليم؟',
      a: 'نعم. كل مشروع يشمل فترة دعم مكتوبة في الاتفاقية، ويمكن تمديدها باتفاق صيانة دوري يشمل التحديثات ومراجعة النسخ الاحتياطي.',
    },
    en: {
      q: 'Is there support after delivery?',
      a: 'Yes. Every project includes a support period written into the agreement, extendable with a recurring maintenance agreement covering updates and backup verification.',
    },
  },
  {
    id: 'existing-system',
    ar: {
      q: 'عندي نظام قائم — هل تستطيعون تطويره؟',
      a: 'ندرس الحالة أولاً. إن كان النظام قابلاً للصيانة ولدينا وصول كافٍ للكود أو البيئة، نقدّم خطة تطوير أو صيانة. وإن لم يكن مجدياً نقول ذلك بصراحة.',
    },
    en: {
      q: 'I have an existing system — can you improve it?',
      a: 'We assess it first. If the system is maintainable and we have sufficient access to the code or environment, we propose a development or maintenance plan. If it is not viable, we say so plainly.',
    },
  },
];

/** أسئلة خاصة بمنتج NEXORA Store */
export const nexoraFaq: FaqItem[] = [
  {
    id: 'offline',
    ar: {
      q: 'هل يعمل NEXORA Store بدون إنترنت؟',
      a: 'نعم، يعمل بشكل كامل بدون إنترنت. البيانات تُخزّن في قاعدة بيانات SQLite محلية على جهازك، والمزامنة السحابية اختيارية وتحدث في الخلفية عند توفر الاتصال.',
    },
    en: {
      q: 'Does NEXORA Store work without internet?',
      a: 'Yes, it works fully offline. Data is stored in a local SQLite database on your machine, and cloud sync is optional and runs in the background when a connection is available.',
    },
  },
  {
    id: 'platforms',
    ar: {
      q: 'ما المنصات المدعومة؟',
      a: 'النسخة المتوفرة حالياً تعمل على Windows 10 أو أحدث (64-bit). تطبيق Android قيد التطوير ولم يُطلق بعد.',
    },
    en: {
      q: 'Which platforms are supported?',
      a: 'The currently available build runs on Windows 10 or newer (64-bit). The Android app is in development and has not been released yet.',
    },
  },
  {
    id: 'trial',
    ar: {
      q: 'كيف تعمل التجربة المجانية؟',
      a: 'تحصل على تجربة مجانية مدتها 3 أيام بعد التثبيت بدون بطاقة بنكية. بعد انتهائها يُطلب تنشيط النظام بترخيص للاستمرار.',
    },
    en: {
      q: 'How does the free trial work?',
      a: 'You get a 3-day free trial after installation with no credit card required. When it ends, license activation is required to continue.',
    },
  },
  {
    id: 'branches',
    ar: {
      q: 'هل يدعم أكثر من مخزن أو فرع؟',
      a: 'نعم، يدعم مخازن متعددة وتحويلات بينها، ويمكن إعداده لأكثر من نقطة بيع. المزامنة السحابية تساعد في ربط الأجهزة عند توفر الإنترنت.',
    },
    en: {
      q: 'Does it support multiple warehouses or branches?',
      a: 'Yes, it supports multiple warehouses with transfers between them, and can be configured for more than one register. Cloud sync helps link devices when internet is available.',
    },
  },
  {
    id: 'backup',
    ar: {
      q: 'كيف أحمي بياناتي من الفقدان؟',
      a: 'النظام يوفّر نسخاً احتياطياً محلياً ونسخاً على Google Drive. نوصي بجدولة النسخ واختبار الاسترجاع دورياً، ونساعدك في ذلك خلال فترة الدعم.',
    },
    en: {
      q: 'How do I protect my data from loss?',
      a: 'The system provides local backups and Google Drive backups. We recommend scheduling backups and testing restores periodically, and we help with that during the support period.',
    },
  },
  {
    id: 'hardware',
    ar: {
      q: 'ما الأجهزة التي أحتاجها؟',
      a: 'جهاز Windows بذاكرة 4 جيجابايت أو أكثر، وطابعة فواتير (حرارية أو A4) مدعومة من Windows، وقارئ باركود يعمل بنمط لوحة المفاتيح. تواصل معنا للتأكد من ملاءمة أجهزتك.',
    },
    en: {
      q: 'What hardware do I need?',
      a: 'A Windows machine with 4 GB RAM or more, a receipt printer (thermal or A4) supported by Windows, and a keyboard-emulation barcode scanner. Contact us to confirm your hardware is suitable.',
    },
  },
  {
    id: 'restaurants',
    ar: {
      q: 'هل يصلح للمطاعم؟',
      a: 'يوجد دعم لطاولات المطاعم كميزة اختيارية تُفعّل حسب النشاط. تواصل معنا لنوضّح ما يغطّيه الإصدار الحالي لحالتك تحديداً.',
    },
    en: {
      q: 'Is it suitable for restaurants?',
      a: 'Restaurant table support exists as an optional feature enabled per business type. Contact us so we can clarify exactly what the current release covers for your case.',
    },
  },
  {
    id: 'training',
    ar: {
      q: 'هل تساعدون في التثبيت والتدريب؟',
      a: 'نعم. الدعم يشمل المساعدة في التثبيت والإعداد الأساسي وجلسة تدريب للفريق على الكاشير والمخزن والتقارير.',
    },
    en: {
      q: 'Do you help with installation and training?',
      a: 'Yes. Support includes help with installation and initial setup, plus a team training session covering the register, inventory and reports.',
    },
  },
];

export function faqToPairs(
  items: FaqItem[],
  locale: 'ar' | 'en',
): Array<{ q: string; a: string }> {
  return items.map((item) => ({ q: item[locale].q, a: item[locale].a }));
}
