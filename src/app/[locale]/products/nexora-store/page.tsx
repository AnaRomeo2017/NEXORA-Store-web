import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CloudCog,
  Database,
  Download,
  Info,
  Monitor,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ButtonLink } from '@/components/Button';
import { CTASection } from '@/components/CTASection';
import { DownloadCard } from '@/components/DownloadCard';
import { FAQ } from '@/components/FAQ';
import { FeatureGrid } from '@/components/FeatureGrid';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { NexoraMockup } from '@/components/NexoraMockup';
import { ProductSubnav } from '@/components/ProductSubnav';
import { Reveal } from '@/components/Reveal';
import { SectionHeader } from '@/components/SectionHeader';
import type { IconName } from '@/components/Icon';
import { siteConfig, whatsappLink } from '@/config/site';
import { androidDownload, NEXORA_VERSION, windowsDownload } from '@/data/downloads';
import { nexoraFaq } from '@/data/faq';
import { media } from '@/data/media';
import { nexoraFeatureCount } from '@/data/nexora-features';
import { nexoraStore } from '@/data/products';
import { getDictionary, isLocale, localePath, type Locale } from '@/lib/i18n';
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, softwareJsonLd } from '@/lib/seo';

type PageProps = { params: Promise<{ locale: string }> };

const PRODUCT_PATH = 'products/nexora-store';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'ar';
  const dict = getDictionary(locale);

  return buildMetadata({
    locale,
    title: dict.nexora.metaTitle,
    description: dict.nexora.metaDescription,
    path: PRODUCT_PATH,
    keywords:
      locale === 'ar'
        ? ['نقاط بيع', 'كاشير', 'إدارة مخازن', 'برنامج محاسبة', 'NEXORA Store', 'بدون إنترنت']
        : ['POS', 'point of sale', 'inventory management', 'offline POS', 'NEXORA Store'],
  });
}

export default async function NexoraStorePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);
  const product = nexoraStore[locale];
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;
  const nx = dict.nexora;

  const subnavItems = [
    { id: 'overview', label: nx.subnav.overview },
    { id: 'download', label: nx.subnav.download },
    { id: 'why', label: nx.subnav.why },
    { id: 'offline', label: nx.subnav.offline },
    { id: 'features', label: nx.subnav.features },
    { id: 'screens', label: nx.subnav.screens },
    { id: 'how', label: nx.subnav.how },
    { id: 'requirements', label: nx.subnav.requirements },
    { id: 'faq', label: nx.subnav.faq },
    { id: 'support', label: nx.subnav.support },
  ];

  const whyItems: Array<{ icon: IconName; title: string; desc: string }> = [
    { icon: 'WifiOff', title: nx.why.item1Title, desc: nx.why.item1Desc },
    { icon: 'Gauge', title: nx.why.item2Title, desc: nx.why.item2Desc },
    { icon: 'ShieldCheck', title: nx.why.item3Title, desc: nx.why.item3Desc },
    { icon: 'BarChart3', title: nx.why.item4Title, desc: nx.why.item4Desc },
  ];

  const howSteps = [
    { title: nx.how.step1Title, desc: nx.how.step1Desc },
    { title: nx.how.step2Title, desc: nx.how.step2Desc },
    { title: nx.how.step3Title, desc: nx.how.step3Desc },
    { title: nx.how.step4Title, desc: nx.how.step4Desc },
  ];

  const requirements: Array<{ icon: IconName; title: string; value: string }> = [
    { icon: 'Monitor', title: nx.requirements.osTitle, value: nx.requirements.osValue },
    { icon: 'Database', title: nx.requirements.ramTitle, value: nx.requirements.ramValue },
    { icon: 'HardDrive', title: nx.requirements.diskTitle, value: nx.requirements.diskValue },
    { icon: 'Wifi', title: nx.requirements.netTitle, value: nx.requirements.netValue },
    { icon: 'Printer', title: nx.requirements.printerTitle, value: nx.requirements.printerValue },
    { icon: 'ScanBarcode', title: nx.requirements.scannerTitle, value: nx.requirements.scannerValue },
  ];

  const supportItems: Array<{ icon: IconName; title: string; desc: string }> = [
    { icon: 'Wrench', title: nx.support.item1Title, desc: nx.support.item1Desc },
    { icon: 'Users', title: nx.support.item2Title, desc: nx.support.item2Desc },
    { icon: 'RefreshCw', title: nx.support.item3Title, desc: nx.support.item3Desc },
    { icon: 'HardDrive', title: nx.support.item4Title, desc: nx.support.item4Desc },
  ];

  const architectureLayers = [
    { icon: Monitor, title: nx.offline.layer1Title, desc: nx.offline.layer1Desc },
    { icon: Database, title: nx.offline.layer2Title, desc: nx.offline.layer2Desc },
    { icon: RefreshCw, title: nx.offline.layer3Title, desc: nx.offline.layer3Desc },
    { icon: CloudCog, title: nx.offline.layer4Title, desc: nx.offline.layer4Desc },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale, [
            { name: dict.nav.home, path: '' },
            { name: dict.solutions.metaTitle, path: 'solutions' },
            { name: 'NEXORA Store', path: PRODUCT_PATH },
          ]),
          softwareJsonLd({
            locale,
            name: 'NEXORA Store',
            description: nx.metaDescription,
            version: NEXORA_VERSION,
            path: PRODUCT_PATH,
            operatingSystem: 'Windows',
          }),
          faqJsonLd(nexoraFaq.map((item) => ({ q: item[locale].q, a: item[locale].a }))),
        ]}
      />

      {/* ===== Hero ===== */}
      <section id="overview" className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute inset-0 grid-pattern opacity-50" />
          <div className="absolute -top-28 h-96 w-96 rounded-full bg-[var(--brand-blue-600)]/18 blur-[120px] ltr:-left-20 rtl:-right-20" />
          <div className="absolute top-16 h-80 w-80 rounded-full bg-[var(--brand-cyan-400)]/16 blur-[120px] ltr:right-0 rtl:left-0" />
        </div>

        <div className="container-page flex flex-col gap-8 py-10 lg:py-14">
          <Breadcrumbs
            locale={locale}
            label={dict.common.breadcrumb}
            items={[
              { label: dict.nav.home, href: '' },
              { label: dict.solutions.metaTitle, href: 'solutions' },
              { label: 'NEXORA Store' },
            ]}
          />

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
            <div className="flex flex-col items-start gap-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-blue-600)]/25 bg-[var(--brand-blue-600)]/8 px-4 py-2 text-xs font-bold text-[var(--brand-blue-600)] dark:border-[var(--brand-cyan-400)]/25 dark:text-[var(--brand-cyan-400)]">
                <Monitor size={14} strokeWidth={2.2} aria-hidden />
                {nx.hero.badge}
              </span>

              <div className="flex items-center gap-4">
                <Image
                  src={media.nexoraIcon.src}
                  alt={media.nexoraIcon.alt[locale]}
                  width={media.nexoraIcon.width}
                  height={media.nexoraIcon.height}
                  priority
                  sizes="72px"
                  className="h-16 w-16 rounded-2xl object-contain shadow-lift sm:h-18 sm:w-18"
                />
                <div className="flex flex-col">
                  <h1 className="text-4xl font-black leading-none tracking-tight sm:text-5xl">
                    {nx.hero.title}
                  </h1>
                  <span className="nums mt-1.5 text-xs font-bold text-muted">
                    v{NEXORA_VERSION} · Windows · {nexoraFeatureCount}+{' '}
                    {locale === 'ar' ? 'ميزة' : 'features'}
                  </span>
                </div>
              </div>

              <p className="max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
                {nx.hero.subtitle}
              </p>

              <ul className="flex flex-col gap-2.5">
                {[nx.hero.point1, nx.hero.point2, nx.hero.point3].map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm sm:text-base">
                    <CheckCircle2
                      size={19}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-[var(--brand-cyan-500)] dark:text-[var(--brand-cyan-400)]"
                      aria-hidden
                    />
                    <span className="text-foreground/85">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-1 flex flex-wrap gap-3">
                <ButtonLink href="#download" variant="primary" size="lg">
                  <Download size={18} strokeWidth={2.1} aria-hidden />
                  {dict.cta.downloadWindows}
                </ButtonLink>
                <ButtonLink
                  href={
                    whatsappLink(
                      locale === 'ar'
                        ? `مرحباً ${siteConfig.siteName}، أريد عرض سعر لنظام NEXORA Store.`
                        : `Hello ${siteConfig.siteNameEn}, I would like a quote for NEXORA Store.`,
                      locale,
                    ) ?? localePath(locale, 'contact')
                  }
                  external
                  variant="outline"
                  size="lg"
                >
                  {dict.cta.quote}
                  <Arrow size={17} strokeWidth={2.2} aria-hidden />
                </ButtonLink>
              </div>

              <p className="nums text-xs font-semibold text-muted">{nx.hero.trialNote}</p>
            </div>

            <div className="relative">
              <div
                className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-[var(--brand-blue-600)]/14 to-[var(--brand-cyan-400)]/16 blur-2xl"
                aria-hidden
              />
              <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-lift">
                <Image
                  src={media.nexoraHeroDashboard.src}
                  alt={media.nexoraHeroDashboard.alt[locale]}
                  width={media.nexoraHeroDashboard.width}
                  height={media.nexoraHeroDashboard.height}
                  priority
                  sizes="(max-width: 1024px) 100vw, 620px"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* شريط تنقّل داخلي ثابت (سطح المكتب) */}
      <ProductSubnav items={subnavItems} />

      {/* ===== مركز التحميل ===== */}
      <section id="download" className="section">
        <div className="container-page flex flex-col gap-10">
          <SectionHeader
            badge={nx.download.badge}
            title={nx.download.title}
            subtitle={nx.download.subtitle}
          />

          <div className="mx-auto grid w-full max-w-4xl gap-6 md:grid-cols-2">
            <Reveal className="h-full">
              <DownloadCard item={windowsDownload} locale={locale} dict={dict} />
            </Reveal>
            <Reveal delay={100} className="h-full">
              <DownloadCard item={androidDownload} locale={locale} dict={dict} />
            </Reveal>
          </div>

          <Reveal className="mx-auto w-full max-w-4xl">
            <div className="flex flex-col gap-5 rounded-2xl border border-border bg-background-subtle p-6 sm:p-8">
              <h3 className="text-base font-extrabold">{nx.download.stepsTitle}</h3>
              <ol className="grid gap-3 sm:grid-cols-2">
                {[nx.download.step1, nx.download.step2, nx.download.step3, nx.download.step4].map(
                  (step, index) => (
                    <li
                      key={step}
                      className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                    >
                      <span className="nums inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-blue-600)] text-xs font-black text-white">
                        {index + 1}
                      </span>
                      <span className="pt-1 text-sm leading-relaxed">{step}</span>
                    </li>
                  ),
                )}
              </ol>

              <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-start sm:gap-6">
                <div className="flex flex-1 items-start gap-2.5">
                  <Info size={17} className="mt-0.5 shrink-0 text-muted" aria-hidden />
                  <p className="text-xs leading-relaxed text-muted">{nx.download.installerNote}</p>
                </div>
                <div className="flex flex-1 items-start gap-2.5">
                  <ShieldCheck size={17} className="mt-0.5 shrink-0 text-muted" aria-hidden />
                  <p className="text-xs leading-relaxed text-muted">
                    <strong className="font-bold text-foreground">
                      {nx.download.checksumTitle}:
                    </strong>{' '}
                    {nx.download.checksumNote}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== لماذا NEXORA ===== */}
      <section id="why" className="border-y border-border bg-background-subtle section">
        <div className="container-page flex flex-col gap-10">
          <SectionHeader badge={nx.why.badge} title={nx.why.title} subtitle={nx.why.subtitle} />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 70} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-soft transition-colors hover:border-[var(--brand-blue-600)]/40">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-blue-600)]/10 text-[var(--brand-blue-600)] dark:text-[var(--brand-cyan-400)]">
                    <Icon name={item.icon} size={22} />
                  </span>
                  <h3 className="text-base font-bold leading-snug">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== العمل بدون إنترنت (المعمارية) ===== */}
      <section id="offline" className="section">
        <div className="container-page flex flex-col gap-10">
          <SectionHeader
            badge={nx.offline.badge}
            title={nx.offline.title}
            subtitle={nx.offline.subtitle}
          />

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal className="overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-lift">
              <Image
                src={media.nexoraOffline.src}
                alt={media.nexoraOffline.alt[locale]}
                width={media.nexoraOffline.width}
                height={media.nexoraOffline.height}
                sizes="(max-width: 1024px) 100vw, 560px"
                className="h-auto w-full object-cover"
              />
            </Reveal>

            <Reveal delay={100}>
              {/* مخطط الطبقات */}
              <ol className="relative flex flex-col gap-3">
                {architectureLayers.map((layer, index) => {
                  const LayerIcon = layer.icon;
                  const isLast = index === architectureLayers.length - 1;

                  return (
                    <li key={layer.title} className="relative flex gap-4">
                      <div className="flex flex-col items-center">
                        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-[var(--brand-blue-600)] shadow-soft dark:text-[var(--brand-cyan-400)]">
                          <LayerIcon size={20} strokeWidth={2} aria-hidden />
                        </span>
                        {!isLast ? (
                          <span
                            className="my-1 w-px flex-1 bg-gradient-to-b from-[var(--brand-blue-600)]/45 to-[var(--brand-cyan-400)]/25"
                            aria-hidden
                          />
                        ) : null}
                      </div>

                      <div className="flex flex-col gap-1 pb-4">
                        <h3 className="text-sm font-extrabold">{layer.title}</h3>
                        <p className="text-sm leading-relaxed text-muted">{layer.desc}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {[
                  nx.offline.benefit1,
                  nx.offline.benefit2,
                  nx.offline.benefit3,
                  nx.offline.benefit4,
                ].map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2 rounded-xl border border-border bg-background-subtle p-3 text-sm"
                  >
                    <CheckCircle2
                      size={16}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-[var(--success)]"
                      aria-hidden
                    />
                    <span className="leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== المزايا ===== */}
      <section id="features" className="border-y border-border bg-background-subtle section">
        <div className="container-page flex flex-col gap-10">
          <SectionHeader
            badge={nx.features.badge}
            title={nx.features.title}
            subtitle={nx.features.subtitle}
          />
          <FeatureGrid locale={locale} dict={dict} />
        </div>
      </section>

      {/* ===== الشاشات ===== */}
      <section id="screens" className="section">
        <div className="container-page flex flex-col gap-10">
          <SectionHeader
            badge={nx.screens.badge}
            title={nx.screens.title}
            subtitle={nx.screens.subtitle}
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal className="flex flex-col gap-3">
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lift">
                <Image
                  src={media.nexoraPosScreen.src}
                  alt={media.nexoraPosScreen.alt[locale]}
                  width={media.nexoraPosScreen.width}
                  height={media.nexoraPosScreen.height}
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="h-auto w-full object-cover"
                />
              </div>
              <h3 className="text-base font-extrabold">{nx.screens.posTitle}</h3>
              <p className="text-sm leading-relaxed text-muted">{nx.screens.posDesc}</p>
            </Reveal>

            <Reveal delay={100} className="flex flex-col gap-3">
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lift">
                <Image
                  src={media.nexoraHeroDashboard.src}
                  alt={media.nexoraHeroDashboard.alt[locale]}
                  width={media.nexoraHeroDashboard.width}
                  height={media.nexoraHeroDashboard.height}
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="h-auto w-full object-cover"
                />
              </div>
              <h3 className="text-base font-extrabold">{nx.screens.dashboardTitle}</h3>
              <p className="text-sm leading-relaxed text-muted">{nx.screens.dashboardDesc}</p>
            </Reveal>

            {/* رسوم توضيحية CSS/SVG بجانب الصور الفعلية */}
            <Reveal delay={60} className="flex flex-col gap-3">
              <NexoraMockup locale={locale} variant="pos" />
              <p className="text-xs leading-relaxed text-muted">{nx.screens.note}</p>
            </Reveal>

            <Reveal delay={140} className="flex flex-col gap-3">
              <NexoraMockup locale={locale} variant="dashboard" />
              <h3 className="text-base font-extrabold">{nx.screens.offlineTitle}</h3>
              <p className="text-sm leading-relaxed text-muted">{nx.screens.offlineDesc}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== طريقة العمل ===== */}
      <section id="how" className="border-y border-border bg-background-subtle section">
        <div className="container-page flex flex-col gap-10">
          <SectionHeader badge={nx.how.badge} title={nx.how.title} subtitle={nx.how.subtitle} />

          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {howSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 80} as="li" className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <span className="nums inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-navy-700)] text-lg font-black text-white dark:bg-[var(--brand-blue-600)]">
                    {index + 1}
                  </span>
                  <h3 className="text-base font-bold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== المتطلبات + معلومات الإصدار ===== */}
      <section id="requirements" className="section">
        <div className="container-page flex flex-col gap-10">
          <SectionHeader
            badge={nx.requirements.badge}
            title={nx.requirements.title}
            subtitle={nx.requirements.subtitle}
          />

          <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr]">
            <div className="flex flex-col gap-4">
              <dl className="grid gap-4 sm:grid-cols-2">
                {requirements.map((requirement, index) => (
                  <Reveal key={requirement.title} delay={index * 50} className="h-full">
                    <div className="flex h-full gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-blue-600)]/10 text-[var(--brand-blue-600)] dark:text-[var(--brand-cyan-400)]">
                        <Icon name={requirement.icon} size={19} />
                      </span>
                      <div className="flex flex-col gap-1">
                        <dt className="text-xs font-bold text-muted">{requirement.title}</dt>
                        <dd className="text-sm font-semibold leading-relaxed">
                          {requirement.value}
                        </dd>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </dl>

              <p className="flex items-start gap-2 text-xs leading-relaxed text-muted">
                <Info size={15} className="mt-0.5 shrink-0" aria-hidden />
                {nx.requirements.note}
              </p>
            </div>

            {/* معلومات الإصدار */}
            <Reveal delay={120}>
              <div className="flex flex-col gap-4 rounded-2xl border border-[var(--brand-blue-600)]/30 bg-card p-6 shadow-soft">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[var(--brand-blue-600)]/12 px-3 py-1 text-xs font-bold text-[var(--brand-blue-600)] dark:text-[var(--brand-cyan-400)]">
                    {nx.version.badge}
                  </span>
                  <h3 className="text-lg font-extrabold">{nx.version.title}</h3>
                </div>

                <dl className="flex flex-col gap-3 text-sm">
                  {[
                    { label: nx.version.current, value: `v${NEXORA_VERSION}` },
                    { label: nx.version.channel, value: nx.version.channelValue },
                    { label: nx.version.platform, value: nx.version.platformValue },
                    { label: nx.version.licenseTitle, value: nx.version.licenseValue },
                    { label: dict.common.size, value: windowsDownload.size },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between gap-3 border-b border-border pb-2.5 last:border-0 last:pb-0"
                    >
                      <dt className="font-semibold text-muted">{row.label}</dt>
                      <dd className="nums text-end font-bold">{row.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="flex flex-col gap-2 rounded-xl border border-border bg-background-subtle p-4">
                  <h4 className="text-xs font-extrabold">{nx.version.notesTitle}</h4>
                  <ul className="flex flex-col gap-1.5">
                    {[nx.version.note1, nx.version.note2, nx.version.note3].map((note) => (
                      <li key={note} className="flex items-start gap-2 text-xs leading-relaxed text-muted">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-cyan-500)] dark:bg-[var(--brand-cyan-400)]"
                          aria-hidden
                        />
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>

                <ButtonLink href="#download" variant="primary" size="md" className="w-full">
                  <Download size={17} strokeWidth={2.1} aria-hidden />
                  {dict.cta.download}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== الأسئلة الشائعة ===== */}
      <section id="faq" className="border-y border-border bg-background-subtle section">
        <div className="container-page flex flex-col gap-8">
          <SectionHeader badge={nx.faq.badge} title={nx.faq.title} subtitle={nx.faq.subtitle} />
          <div className="mx-auto w-full max-w-3xl">
            <FAQ
              items={nexoraFaq.map((item) => ({
                id: item.id,
                q: item[locale].q,
                a: item[locale].a,
              }))}
            />
          </div>
        </div>
      </section>

      {/* ===== الدعم ===== */}
      <section id="support" className="section">
        <div className="container-page flex flex-col gap-10">
          <SectionHeader
            badge={nx.support.badge}
            title={nx.support.title}
            subtitle={nx.support.subtitle}
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {supportItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 70} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-cyan-400)]/16 text-[var(--brand-cyan-600)] dark:text-[var(--brand-cyan-400)]">
                    <Icon name={item.icon} size={20} />
                  </span>
                  <h3 className="text-base font-bold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mx-auto w-full max-w-3xl">
            <div className="flex flex-col gap-2 rounded-2xl border border-border bg-background-subtle p-6">
              <h3 className="text-sm font-extrabold">{product.name}</h3>
              <p className="text-sm leading-relaxed text-muted">{product.summary}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA نهائي ===== */}
      <CTASection
        locale={locale}
        dict={dict}
        title={nx.finalCta.title}
        subtitle={nx.finalCta.subtitle}
        primaryHref="#download"
        primaryLabel={dict.cta.downloadWindows}
        secondaryHref={
          whatsappLink(
            locale === 'ar'
              ? `مرحباً ${siteConfig.siteName}، أريد الاستفسار عن NEXORA Store.`
              : `Hello ${siteConfig.siteNameEn}, I would like to ask about NEXORA Store.`,
            locale,
          ) ?? undefined
        }
        secondaryLabel={dict.cta.whatsapp}
      />
    </>
  );
}
