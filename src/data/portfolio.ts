export type PortfolioItem = {
  slug: string;
  /** اسم المشروع — يُنشر فقط بموافقة كتابية من صاحبه */
  ar: { title: string; summary: string; sector: string; scope: string[] };
  en: { title: string; summary: string; sector: string; scope: string[] };
  year: string;
  /** صورة من public/images — اختيارية */
  image?: string;
  url?: string;
};

/**
 * فارغة بشكل مقصود.
 *
 * سياسة المحتوى: لا يُنشر أي مشروع أو اسم عميل بدون موافقة كتابية.
 * القسم المرتبط بهذه المصفوفة يُخفى تلقائياً عندما تكون فارغة.
 */
export const portfolio: PortfolioItem[] = [];

export const hasPortfolio: boolean = portfolio.length > 0;

export function getPortfolioItem(slug: string): PortfolioItem | undefined {
  return portfolio.find((item) => item.slug === slug);
}
