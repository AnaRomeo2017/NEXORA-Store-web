import { siteConfig } from '@/config/site';
import { trackEvent } from '@/lib/analytics';

export type LeadTopic =
  | 'consultation'
  | 'quote'
  | 'nexora-store'
  | 'custom-software'
  | 'support'
  | 'other';

export type Lead = {
  name: string;
  phone: string;
  email?: string;
  company?: string;
  topic: LeadTopic;
  message: string;
  /** اللغة التي عُبّئ بها النموذج */
  locale: string;
  /** الصفحة التي أُرسل منها الطلب */
  source: string;
  createdAt: string;
};

export type LeadInput = Omit<Lead, 'createdAt'>;

export type LeadResult =
  | { ok: true; id: string }
  | { ok: false; error: 'validation' | 'network' | 'unknown'; fields?: Partial<Record<keyof LeadInput, string>> };

const PHONE_RE = /^[+\d][\d\s()-]{6,}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateLead(input: LeadInput): Partial<Record<keyof LeadInput, string>> {
  const errors: Partial<Record<keyof LeadInput, string>> = {};

  if (input.name.trim().length < 2) errors.name = 'name';
  if (!PHONE_RE.test(input.phone.trim())) errors.phone = 'phone';
  if (input.email && input.email.trim().length > 0 && !EMAIL_RE.test(input.email.trim())) {
    errors.email = 'email';
  }
  if (input.message.trim().length < 5) errors.message = 'message';

  return errors;
}

function createId(): string {
  const random = Math.random().toString(36).slice(2, 8);
  return `lead_${Date.now().toString(36)}_${random}`;
}

/**
 * إرسال طلب تواصل.
 *
 * - إذا ضُبط `NEXT_PUBLIC_LEADS_ENDPOINT` يتم الإرسال إليه عبر POST.
 * - وإلا يُسجّل الطلب في الـ console ويُعاد نجاح — الواجهة جاهزة للتوصيل بأي API لاحقاً.
 */
export async function submitLead(input: LeadInput): Promise<LeadResult> {
  const fields = validateLead(input);
  if (Object.keys(fields).length > 0) {
    return { ok: false, error: 'validation', fields };
  }

  const lead: Lead = {
    ...input,
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email?.trim() || undefined,
    company: input.company?.trim() || undefined,
    message: input.message.trim(),
    createdAt: new Date().toISOString(),
  };

  const endpoint = siteConfig.leadsEndpoint;

  if (endpoint.length > 0) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });

      if (!response.ok) {
        trackEvent('lead_error', { status: response.status, topic: lead.topic });
        return { ok: false, error: 'network' };
      }

      trackEvent('lead_submit', { topic: lead.topic, source: lead.source });
      return { ok: true, id: createId() };
    } catch {
      trackEvent('lead_error', { topic: lead.topic, source: lead.source });
      return { ok: false, error: 'network' };
    }
  }

  // لا توجد نقطة استقبال مضبوطة — نسجّل الطلب فقط
  console.info('[lead] لم تُضبط نقطة استقبال الطلبات؛ الطلب المسجّل:', lead);
  trackEvent('lead_submit', { topic: lead.topic, source: lead.source, transport: 'console' });

  return { ok: true, id: createId() };
}
