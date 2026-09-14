# منظومة للبرمجيات — الموقع التعريفي

موقع تعريفي وتسويقي لشركة **منظومة للبرمجيات** (Menzoma Software)، مبني باستخدام
Next.js 15 (App Router) و React 19 و Tailwind CSS 4 و TypeScript.

## المزايا

- **عربي أولاً (RTL)** مع دعم كامل للإنجليزية (LTR) عبر مسارات `/ar` و `/en`.
- **الوضع الليلي** مع تخزين التفضيل في `localStorage`.
- خط **Cairo** عبر `next/font/google`.
- صفحة منتج كاملة لـ **NEXORA Store** مع مركز تحميل.
- محتوى مركزي قابل للتعديل من `src/config/site.ts` و `src/data/*`.

## التشغيل

```bash
npm install
npm run dev      # http://localhost:3000  (يعيد التوجيه إلى /ar)
npm run build    # بناء الإنتاج
npm run start    # تشغيل نسخة الإنتاج
npm run typecheck
```

## الإعدادات

1. انسخ `.env.example` إلى `.env.local`.
2. عدّل بيانات التواصل (`NEXT_PUBLIC_PHONE` / `NEXT_PUBLIC_WHATSAPP` / `NEXT_PUBLIC_EMAIL`).
   > القيم الافتراضية في `src/config/site.ts` **مبدئية (placeholder)** ولا تظهر في الموقع
   > إلا بعد ضبطها فعلياً.
3. اضبط `NEXT_PUBLIC_NEXORA_WINDOWS_URL` برابط المثبّت، أو ضع الملف في
   `public/downloads/NEXORA-Store-Setup-0.1.0.exe`.
   الإصدار الرسمي: [NEXORA Store 0.1.0](https://github.com/AnaRomeo2017/NEXORA-Store-web/releases/tag/v0.1.0).

## بنية المشروع

```
src/
  app/                 App Router — صفحات [locale]
  components/          مكوّنات واجهة قابلة لإعادة الاستخدام
  config/site.ts       الإعدادات المركزية للموقع
  data/                المحتوى (خدمات، منتجات، مقالات، أسئلة شائعة…)
  data/i18n/           قواميس الترجمة ar / en
  lib/                 أدوات مساعدة (i18n، SEO، leads، analytics)
```

## ملاحظات على المحتوى

- **لا توجد** شهادات عملاء أو مشاريع أو تقييمات وهمية: المصفوفات
  `testimonials` و `portfolio` فارغة، والأقسام المرتبطة بها **تُخفى تلقائياً**.
- مزايا NEXORA Store المذكورة في الموقع هي المزايا المتحققة فعلياً في الإصدار `0.1.0` فقط.
- تطبيق Android **غير متوفر** حالياً ويظهر بحالة «قريباً».
- لا توجد لقطات شاشة حقيقية في المستودع، لذا تُستخدم رسوم توضيحية CSS/SVG.
