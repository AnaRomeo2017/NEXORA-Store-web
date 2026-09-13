export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'menzoma-theme';

/**
 * سكربت يُنفّذ قبل الرسم لتطبيق المظهر المحفوظ ومنع وميض الشاشة.
 * يوضع في `<head>` داخل التخطيط الجذري.
 */
export const themeInitScript = `(function(){try{var k='${THEME_STORAGE_KEY}';var s=localStorage.getItem(k);var d=s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;if(d){r.classList.add('dark');r.style.colorScheme='dark';}else{r.classList.remove('dark');r.style.colorScheme='light';}}catch(e){}})();`;

/** سكربت يضبط lang/dir على عنصر html بحسب لغة الصفحة قبل الرسم */
export function htmlLangScript(locale: string, dir: 'rtl' | 'ltr'): string {
  return `document.documentElement.lang='${locale}';document.documentElement.dir='${dir}';`;
}
