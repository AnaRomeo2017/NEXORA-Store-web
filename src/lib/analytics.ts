import { siteConfig } from '@/config/site';

export type AnalyticsEventName =
  | 'cta_click'
  | 'download_click'
  | 'lead_submit'
  | 'lead_error'
  | 'whatsapp_click'
  | 'language_switch'
  | 'theme_toggle'
  | 'faq_open'
  | 'nav_click';

export type AnalyticsPayload = Record<string, string | number | boolean | null>;

type Sink = (name: AnalyticsEventName, payload: AnalyticsPayload) => void;

/**
 * طبقة تجريد للتحليلات. لا مزوّد فعلي حالياً (no-op)،
 * ويمكن توصيلها لاحقاً بأي مزوّد عبر `setAnalyticsSink`.
 */
let sink: Sink | null = null;

export function setAnalyticsSink(next: Sink | null): void {
  sink = next;
}

export function trackEvent(name: AnalyticsEventName, payload: AnalyticsPayload = {}): void {
  if (!siteConfig.analyticsEnabled) return;

  if (sink) {
    sink(name, payload);
    return;
  }

  if (process.env.NODE_ENV === 'development') {
    console.debug('[analytics]', name, payload);
  }
}

export function trackPageView(path: string, locale: string): void {
  trackEvent('nav_click', { path, locale });
}
