import type { Locale } from '@/lib/i18n';

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDoc = {
  slug: 'privacy' | 'terms';
  title: string;
  metaTitle: string;
  metaDescription: string;
  updatedLabel: string;
  intro: string;
  sections: LegalSection[];
};

const PRIVACY_AR: LegalDoc = {
  slug: 'privacy',
  title: 'سياسة الخصوصية',
  metaTitle: 'سياسة الخصوصية',
  metaDescription:
    'سياسة خصوصية عامة لتطبيق وموقع NEXORA Store توضّح كيف نجمع البيانات وكيف نستخدم خدمات Google وGoogle Drive وFirebase.',
  updatedLabel: 'آخر تحديث: 14 سبتمبر 2026',
  intro:
    'هذه سياسة خصوصية عامة ومتاحة للجميع على نطاق nexora-store.blog. تنطبق على موقع منظومة للبرمجيات وعلى تطبيق NEXORA Store لسطح المكتب. نكتبها بوضوح لأن التطبيق قد يطلب منك ربط حساب Google لاستخدام النسخ الاحتياطي والمزامنة الاختيارية.',
  sections: [
    {
      heading: '1. من نحن',
      paragraphs: [
        'المشغّل: منظومة للبرمجيات (Menzoma Software). المنتج: NEXORA Store، نظام نقاط بيع وإدارة مخازن يعمل محلياً على Windows.',
        'للتواصل بشأن الخصوصية أو بيانات Google: واتساب 201111096380 أو هاتف 01111096380، أو عبر صفحة تواصل معنا على هذا الموقع.',
      ],
    },
    {
      heading: '2. البيانات التي يعالجها التطبيق محلياً',
      paragraphs: [
        'NEXORA Store يعمل أولاً على جهازك. المبيعات والأصناف والعملاء والتقارير تُحفظ في قاعدة بيانات SQLite محلية على حاسوب ويندوز الخاص بك. هذه البيانات ملكك، ولا تُرسل إلى خوادمنا إلا إذا فعّلت ميزة سحابية اختيارية.',
      ],
      bullets: [
        'بيانات التشغيل: منتجات، مخزون، فواتير، عملاء، مستخدمون وصلاحيات داخل المتجر.',
        'ملفات النسخ الاحتياطي المحلية التي ينشئها التطبيق على الجهاز.',
        'إعدادات التطبيق على الجهاز (لغة الواجهة، الطابعة، الترخيص المحلي).',
      ],
    },
    {
      heading: '3. كيف يستخدم التطبيق بيانات Google',
      paragraphs: [
        'إذا اخترت ربط حساب Google، يطلب NEXORA Store أذونات Google OAuth اللازمة لتقديم ميزات النسخ الاحتياطي والمزامنة التي تظهر داخل التطبيق. لا نستخدم بيانات Google في الإعلانات، ولا نبيعها، ولا نستخدمها لتطوير نماذج ذكاء اصطناعي عامة.',
        'استخدام المعلومات المستلمة من واجهات Google البرمجية يلتزم بسياسة بيانات مستخدم خدمات Google API، بما في ذلك متطلبات الاستخدام المحدود (Limited Use).',
      ],
      bullets: [
        'تسجيل الدخول بحساب Google: للتعرّف على الحساب الذي تخوّله بالنسخ الاحتياطي أو المزامنة (مثل البريد واسم العرض ومعرّف الحساب). لا نطلب جهات الاتصال ولا نقرأ بريدك.',
        'Google Drive: بعد موافقتك، ينشئ التطبيق أو يحدّث ملفات نسخ احتياطي لبيانات NEXORA Store الخاصة بك (مثل تصدير قاعدة البيانات أو أرشيف الاسترجاع) داخل مساحة Drive التي صرّحت بها. نقرأ هذه الملفات فقط لاسترجاع نسختك عندما تطلب ذلك من داخل التطبيق. لا نتصفح ملفاتك الأخرى ولا نستخدم Drive لتخزين محتوى لا علاقة له بالنسخ الاحتياطي.',
        'Firebase / Cloud Firestore: عند تفعيل المزامنة السحابية الاختيارية، تُزامَن بيانات التشغيل التي أدخلتها في التطبيق (وليس ملفات Drive الشخصية) عبر بنية Google Firebase لتوفير نسخة سحابية بين الأجهزة أو كنسخة احتياطية تشغيلية. يمكنك إبقاء العمل محلياً بالكامل دون تفعيل هذه الميزة.',
        'لا نشارك بيانات Google User Data مع أطراف ثالثة إلا إذا كان ذلك لازماً تشغيلياً لخدمة Google نفسها (مثل استضافة Firebase/Drive) أو إذا ألزمنا القانون بذلك.',
      ],
    },
    {
      heading: '4. الاستخدام المحدود لبيانات Google',
      paragraphs: [
        'بيانات المستخدم القادمة من Google تُستخدم فقط لتوفير أو تحسين الميزات الظاهرة للمستخدم داخل NEXORA Store: الربط بالحساب، النسخ الاحتياطي على Drive، والاسترجاع، والمزامنة الاختيارية عبر Firestore.',
        'لا ننقل بيانات Google إلى آخرين مقابل المال أو الإعلانات أو خدمات التصنيف الائتماني. لا نسمح لموظفين بشريين بقراءة بيانات Google الخاصة بك إلا بموافقتك، أو لأمن أو قانون، أو إذا كانت البيانات مجمّعة ومجهولة الهوية ولم يعد بالإمكان ربطها بك.',
      ],
    },
    {
      heading: '5. موقع منظومة للبرمجيات على الويب',
      paragraphs: [
        'الموقع التعريفي على nexora-store.blog قد يحفظ تفضيل المظهر (فاتح/داكن) ولغة الواجهة في المتصفح (localStorage أو ملف تعريف ارتباط اللغة). لا نستخدم ذلك لتتبع إعلاني.',
        'روابط التحميل قد تفتح مجلد Google Drive عاماً لملف المثبّت. ذلك المجلد منفصل عن حساب Google الخاص بك داخل التطبيق.',
      ],
    },
    {
      heading: '6. الاحتفاظ والحذف وإلغاء الربط',
      paragraphs: [
        'البيانات المحلية تبقى على جهازك إلى أن تحذفها أو تزيل التطبيق.',
        'يمكنك إلغاء وصول التطبيق إلى حساب Google من إعدادات حساب Google (التطبيقات المتصلة). بعد الإلغاء يتوقف التطبيق عن الوصول إلى Drive أو المزامنة السحابية حتى تربط الحساب مجدداً.',
        'ملفات النسخ الاحتياطي التي أُنشئت في Google Drive تبقى في حسابك إلى أن تحذفها أنت من Drive.',
      ],
    },
    {
      heading: '7. الأمان والأطفال',
      paragraphs: [
        'نوصي بحماية جهاز الكاشير بكلمة مرور وبتقييد صلاحيات المستخدمين داخل التطبيق. الاتصال بخدمات Google يتم عبر قنوات مشفّرة تعتمدها Google.',
        'NEXORA Store موجّه للاستخدام التجاري وليس موجّهاً للأطفال دون 13 عاماً.',
      ],
    },
    {
      heading: '8. التعديلات',
      paragraphs: [
        'قد نحدّث هذه السياسة عند تغيّر المنتج أو المتطلبات القانونية. ننشر النسخة المحدّثة على هذه الصفحة على النطاق نفسه nexora-store.blog مع تاريخ آخر تحديث.',
      ],
    },
  ],
};

const PRIVACY_EN: LegalDoc = {
  slug: 'privacy',
  title: 'Privacy Policy',
  metaTitle: 'Privacy Policy',
  metaDescription:
    'Public privacy policy for the NEXORA Store app and website, including how the app uses Google user data, Google Drive, and Firebase.',
  updatedLabel: 'Last updated: 14 September 2026',
  intro:
    'This is a public privacy policy, available to everyone on nexora-store.blog. It covers the Menzoma Software website and the NEXORA Store Windows app. We state it clearly because the app may ask you to connect a Google account for optional backup and sync.',
  sections: [
    {
      heading: '1. Who we are',
      paragraphs: [
        'Operator: Menzoma Software (منظومة للبرمجيات). Product: NEXORA Store, a Windows point-of-sale and inventory system that runs locally.',
        'Privacy or Google-data requests: WhatsApp +201111096380, phone 01111096380, or the Contact page on this website.',
      ],
    },
    {
      heading: '2. Data the app processes locally',
      paragraphs: [
        'NEXORA Store is local-first. Sales, items, customers and reports are stored in an SQLite database on your Windows PC. That data is yours. It is not sent to our servers unless you turn on an optional cloud feature.',
      ],
      bullets: [
        'Operational data: products, stock, invoices, customers, in-store users and roles.',
        'Local backup files created by the app on the device.',
        'App settings on the device (UI language, printer, local license).',
      ],
    },
    {
      heading: '3. How the app uses Google user data',
      paragraphs: [
        'If you choose to connect Google, NEXORA Store requests the Google OAuth permissions needed to provide the backup and sync features shown in the app. We do not use Google data for advertising, we do not sell it, and we do not use it to train general-purpose AI models.',
        'NEXORA Store’s use of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.',
      ],
      bullets: [
        'Google Sign-In: to identify the account you authorize for backup or sync (such as email, display name and account id). We do not request your contacts and we do not read your Gmail.',
        'Google Drive: after you consent, the app creates or updates NEXORA Store backup files (for example a database export or restore archive) in the Drive location you authorize. We read those files only to restore your copy when you ask from inside the app. We do not browse your other Drive files and we do not use Drive to store unrelated content.',
        'Firebase / Cloud Firestore: if you enable optional cloud sync, operational data you entered in the app (not your personal Drive files) is synced through Google Firebase so you can keep a cloud copy across devices or as an operational backup. You can keep the app fully offline without enabling this.',
        'We do not share Google user data with third parties except as required to operate Google’s own services (such as Firebase/Drive hosting) or if the law requires it.',
      ],
    },
    {
      heading: '4. Limited Use of Google data',
      paragraphs: [
        'Google user data is used only to provide or improve user-facing features in NEXORA Store: account linking, Drive backup, restore, and optional Firestore sync.',
        'We do not transfer Google data to others for money, ads, or credit services. Human staff do not read your Google data unless you agree, or for security or legal reasons, or if data is aggregated and can no longer be tied to you.',
      ],
    },
    {
      heading: '5. This website',
      paragraphs: [
        'The marketing site at nexora-store.blog may store theme (light/dark) and language preference in the browser (localStorage or a locale cookie). We do not use that for advertising.',
        'Download links may open a public Google Drive folder that hosts the Windows installer. That folder is separate from the Google account you connect inside the app.',
      ],
    },
    {
      heading: '6. Retention, deletion and disconnect',
      paragraphs: [
        'Local data stays on your PC until you delete it or uninstall the app.',
        'You can revoke the app’s access to Google from your Google Account settings (third-party apps). After that the app cannot reach Drive or cloud sync until you connect again.',
        'Backup files already written to Google Drive remain in your account until you delete them in Drive.',
      ],
    },
    {
      heading: '7. Security and children',
      paragraphs: [
        'Protect the till PC with a password and restrict in-app roles. Connections to Google services use Google’s encrypted channels.',
        'NEXORA Store is a business product and is not directed at children under 13.',
      ],
    },
    {
      heading: '8. Changes',
      paragraphs: [
        'We may update this policy when the product or the law changes. The current version is published on this page on the same domain, nexora-store.blog, with the last-updated date.',
      ],
    },
  ],
};

const TERMS_AR: LegalDoc = {
  slug: 'terms',
  title: 'شروط الخدمة',
  metaTitle: 'شروط الخدمة',
  metaDescription:
    'شروط خدمة عامة لاستخدام موقع منظومة للبرمجيات وتطبيق NEXORA Store، بما في ذلك الترخيص والتجربة المجانية وخدمات Google الاختيارية.',
  updatedLabel: 'آخر تحديث: 14 سبتمبر 2026',
  intro:
    'باستخدامك موقع nexora-store.blog أو تحميل أو تشغيل NEXORA Store فإنك توافق على هذه الشروط. إن لم توافق فلا تستخدم التطبيق ولا تربط حساب Google.',
  sections: [
    {
      heading: '1. الخدمة',
      paragraphs: [
        'NEXORA Store برنامج ويندوز لنقاط البيع وإدارة المخازن. الموقع يعرّف بالمنتج ويوفّر روابط التحميل. التشغيل الأساسي محلي على جهازك.',
      ],
    },
    {
      heading: '2. الترخيص والتجربة',
      paragraphs: [
        'قد تحصل على تجربة مجانية لمدة 3 أيام وفق ما يظهر في التطبيق. بعد انتهائها يلزم ترخيص صادر عن منظومة للبرمجيات للاستمرار في الاستخدام التجاري.',
        'لا يُنسخ البرنامج أو يُعاد توزيعه أو يُؤجَّر إلا بإذن مكتوب.',
      ],
    },
    {
      heading: '3. مسؤوليتك عن البيانات',
      paragraphs: [
        'أنت المسؤول عن صحة بيانات متجرك وعن النسخ الاحتياطي. نوصي بتفعيل النسخ المحلي و/أو Google Drive واختبار الاسترجاع.',
      ],
    },
    {
      heading: '4. خدمات Google الاختيارية',
      paragraphs: [
        'ربط Google Drive أو Firebase اختياري. عند تفعيله تنطبق أيضاً سياسة الخصوصية على هذا الموقع وشروط Google الخاصة بالحساب وDrive وFirebase.',
        'انقطاع خدمة Google أو إلغاء الأذونات من حسابك يوقف النسخ السحابي دون أن يمنع البيع المحلي على الجهاز.',
      ],
    },
    {
      heading: '5. إخلاء المسؤولية',
      paragraphs: [
        'يُقدَّم البرنامج «كما هو». لا نضمن عدم انقطاع الخدمات السحابية التابعة لطرف ثالث. في حدود القانون لا نتحمل خسائر غير مباشرة أو فوات ربح ناتجة عن استخدامك للتطبيق أو عن انقطاع الإنترنت أو خدمات Google.',
      ],
    },
    {
      heading: '6. القانون والتواصل',
      paragraphs: [
        'تُفسَّر هذه الشروط وفق الأنظمة المعمول بها في جمهورية مصر العربية، ما لم يمنع نص ملزم خلاف ذلك.',
        'للتواصل: واتساب 201111096380 أو هاتف 01111096380 أو صفحة تواصل معنا.',
      ],
    },
  ],
};

const TERMS_EN: LegalDoc = {
  slug: 'terms',
  title: 'Terms of Service',
  metaTitle: 'Terms of Service',
  metaDescription:
    'Public terms of service for the Menzoma Software website and the NEXORA Store app, including licensing, the free trial, and optional Google services.',
  updatedLabel: 'Last updated: 14 September 2026',
  intro:
    'By using nexora-store.blog or by downloading or running NEXORA Store you agree to these terms. If you do not agree, do not use the app and do not connect a Google account.',
  sections: [
    {
      heading: '1. The service',
      paragraphs: [
        'NEXORA Store is a Windows point-of-sale and inventory application. This website describes the product and provides download links. Core operation is local on your PC.',
      ],
    },
    {
      heading: '2. License and trial',
      paragraphs: [
        'You may receive a 3-day free trial as shown in the app. After that a license issued by Menzoma Software is required for continued commercial use.',
        'You may not copy, redistribute or rent the software without written permission.',
      ],
    },
    {
      heading: '3. Your data',
      paragraphs: [
        'You are responsible for the accuracy of your shop data and for backups. We recommend local backups and/or Google Drive backups, and testing restore.',
      ],
    },
    {
      heading: '4. Optional Google services',
      paragraphs: [
        'Connecting Google Drive or Firebase is optional. If you enable it, this site’s Privacy Policy and Google’s own account, Drive and Firebase terms also apply.',
        'An outage of Google services, or you revoking access, stops cloud backup; local selling on the PC can continue.',
      ],
    },
    {
      heading: '5. Disclaimer',
      paragraphs: [
        'The software is provided “as is”. We do not warrant that third-party cloud services will be uninterrupted. To the extent allowed by law we are not liable for indirect loss or lost profits from your use of the app or from internet or Google outages.',
      ],
    },
    {
      heading: '6. Law and contact',
      paragraphs: [
        'These terms are interpreted under the laws of the Arab Republic of Egypt, unless a mandatory rule says otherwise.',
        'Contact: WhatsApp +201111096380, phone 01111096380, or the Contact page.',
      ],
    },
  ],
};

export function getLegalDoc(kind: 'privacy' | 'terms', locale: Locale): LegalDoc {
  if (kind === 'privacy') return locale === 'ar' ? PRIVACY_AR : PRIVACY_EN;
  return locale === 'ar' ? TERMS_AR : TERMS_EN;
}
