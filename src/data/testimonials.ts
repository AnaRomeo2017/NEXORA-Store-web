export type Testimonial = {
  id: string;
  /** اسم حقيقي فقط، وبموافقة كتابية */
  author: string;
  role: { ar: string; en: string };
  quote: { ar: string; en: string };
};

/**
 * فارغة بشكل مقصود.
 *
 * سياسة المحتوى: لا تُنشر أي شهادة أو تقييم غير حقيقي وموثّق بموافقة صاحبه.
 * قسم شهادات العملاء يُخفى تلقائياً عندما تكون هذه المصفوفة فارغة.
 */
export const testimonials: Testimonial[] = [];

export const hasTestimonials: boolean = testimonials.length > 0;
