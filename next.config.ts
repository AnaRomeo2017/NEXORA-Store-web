import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  poweredByHeader: false,
  /** إخفاء مؤشر أدوات التطوير (حرف N) أثناء التطوير */
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // هذا المشروع داخل مستودع أحادي (monorepo) يحتوي أكثر من lockfile،
  // فنحدّد جذر تتبّع الملفات صراحةً لتجنّب اختيار جذر غير صحيح.
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      { source: '/nexora-store', destination: '/ar/products/nexora-store', permanent: false },
      { source: '/download', destination: '/ar/products/nexora-store', permanent: false },
    ];
  },
};

export default nextConfig;
