import type { IconName } from '@/components/Icon';

export type TechCategory = {
  id: string;
  icon: IconName;
  ar: { title: string; desc: string };
  en: { title: string; desc: string };
  /** أسماء تقنيات فعلية نستخدمها */
  items: string[];
};

export const technologies: TechCategory[] = [
  {
    id: 'frontend',
    icon: 'Monitor',
    ar: { title: 'واجهات المستخدم', desc: 'واجهات سريعة ومتجاوبة مع دعم عربي RTL.' },
    en: { title: 'Front-end', desc: 'Fast, responsive interfaces with Arabic RTL support.' },
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'desktop',
    icon: 'Store',
    ar: { title: 'تطبيقات سطح المكتب', desc: 'تطبيقات Windows تعمل محلياً بدون إنترنت.' },
    en: { title: 'Desktop apps', desc: 'Windows applications that run locally without internet.' },
    items: ['Electron', 'Node.js', 'SQLite'],
  },
  {
    id: 'backend',
    icon: 'Server',
    ar: { title: 'الخدمات الخلفية', desc: 'واجهات برمجية وخدمات موثوقة وقابلة للتوسّع.' },
    en: { title: 'Back-end', desc: 'Reliable, scalable APIs and services.' },
    items: ['Node.js', 'TypeScript', 'REST APIs'],
  },
  {
    id: 'data',
    icon: 'Database',
    ar: { title: 'قواعد البيانات', desc: 'تخزين محلي وسحابي بحسب طبيعة النظام.' },
    en: { title: 'Databases', desc: 'Local and cloud storage depending on the system.' },
    items: ['SQLite', 'Firestore', 'PostgreSQL'],
  },
  {
    id: 'cloud',
    icon: 'Cloud',
    ar: { title: 'السحابة والمزامنة', desc: 'مزامنة ونسخ احتياطي واستضافة.' },
    en: { title: 'Cloud & sync', desc: 'Sync, backup and hosting.' },
    items: ['Firebase', 'Google Drive API', 'Vercel'],
  },
  {
    id: 'tooling',
    icon: 'Settings',
    ar: { title: 'أدوات التطوير', desc: 'إدارة نسخ وبناء وفحص جودة الكود.' },
    en: { title: 'Tooling', desc: 'Version control, builds and code quality checks.' },
    items: ['Git', 'GitHub', 'ESLint', 'electron-builder'],
  },
];

/** مراحل العمل — تُستخدم في مكوّن Process */
export type ProcessStep = {
  id: string;
  icon: IconName;
  ar: { title: string; desc: string };
  en: { title: string; desc: string };
};

export const processSteps: ProcessStep[] = [
  {
    id: 'discover',
    icon: 'Search',
    ar: {
      title: 'التحليل والفهم',
      desc: 'جلسة نفهم فيها دورة عملك ومشكلتك الفعلية قبل أي حديث تقني.',
    },
    en: {
      title: 'Discovery',
      desc: 'A session to understand your workflow and real problem before any technical talk.',
    },
  },
  {
    id: 'scope',
    icon: 'FileText',
    ar: {
      title: 'النطاق والتقدير',
      desc: 'نطاق مكتوب ومخرجات ومراحل وتقدير زمني وسعري واضح.',
    },
    en: {
      title: 'Scope & estimate',
      desc: 'A written scope with deliverables, milestones and a clear time and cost estimate.',
    },
  },
  {
    id: 'design',
    icon: 'Palette',
    ar: {
      title: 'التصميم',
      desc: 'تصميم الشاشات وتدفق العمل ومراجعتها معك قبل التطوير.',
    },
    en: {
      title: 'Design',
      desc: 'Screen and workflow design, reviewed with you before development.',
    },
  },
  {
    id: 'build',
    icon: 'Code2',
    ar: {
      title: 'التطوير والاختبار',
      desc: 'تطوير تدريجي بمراجعات دورية واختبار على بيانات واقعية.',
    },
    en: {
      title: 'Build & test',
      desc: 'Incremental development with regular reviews and testing on realistic data.',
    },
  },
  {
    id: 'launch',
    icon: 'Rocket',
    ar: {
      title: 'التشغيل والدعم',
      desc: 'تثبيت وتدريب وتشغيل فعلي، ثم دعم ومتابعة بعد الإطلاق.',
    },
    en: {
      title: 'Launch & support',
      desc: 'Installation, training and production rollout, followed by ongoing support.',
    },
  },
];
