import { redirect } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n';

/** الجذر يعيد التوجيه إلى اللغة الافتراضية (العربية) */
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
