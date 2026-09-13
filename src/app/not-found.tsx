import Link from 'next/link';
import { ar } from '@/data/i18n/ar';
import { defaultLocale, localePath } from '@/lib/i18n';

/** 404 على مستوى الجذر (خارج نطاق اللغة) */
export default function RootNotFound() {
  const dict = ar;

  return (
    <div
      dir="rtl"
      lang="ar"
      className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center"
    >
      <span className="nums text-gradient-brand text-6xl font-black">{dict.notFound.code}</span>
      <h1 className="text-2xl font-extrabold">{dict.notFound.title}</h1>
      <p className="max-w-md leading-relaxed text-muted">{dict.notFound.body}</p>
      <Link
        href={localePath(defaultLocale)}
        className="inline-flex h-12 items-center rounded-xl bg-[var(--brand-blue-600)] px-6 font-bold text-white"
      >
        {dict.cta.backHome}
      </Link>
    </div>
  );
}
