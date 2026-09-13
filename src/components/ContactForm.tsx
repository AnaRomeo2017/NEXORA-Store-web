'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { CheckCircle2, Loader2, Send, TriangleAlert } from 'lucide-react';
import { buttonClasses } from '@/components/Button';
import { submitLead, type LeadTopic } from '@/lib/leads';
import type { Dictionary, Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export type ContactFormProps = {
  locale: Locale;
  dict: Dictionary;
  /** الصفحة التي أُرسل منها الطلب */
  source: string;
  /** نوع الطلب الابتدائي */
  defaultTopic?: LeadTopic;
  className?: string;
};

type FieldErrors = Partial<Record<'name' | 'phone' | 'email' | 'message', string>>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputBase =
  'w-full rounded-xl border bg-background px-4 py-3 text-[0.95rem] text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-[var(--brand-blue-600)]';

export function ContactForm({
  locale,
  dict,
  source,
  defaultTopic = 'consultation',
  className,
}: ContactFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [topic, setTopic] = useState<LeadTopic>(defaultTopic);

  const topicOptions: Array<{ value: LeadTopic; label: string }> = [
    { value: 'consultation', label: dict.form.topicConsultation },
    { value: 'quote', label: dict.form.topicQuote },
    { value: 'nexora-store', label: dict.form.topicNexora },
    { value: 'custom-software', label: dict.form.topicCustom },
    { value: 'support', label: dict.form.topicSupport },
    { value: 'other', label: dict.form.topicOther },
  ];

  const errorMessages: Record<keyof FieldErrors, string> = {
    name: dict.form.errorName,
    phone: dict.form.errorPhone,
    email: dict.form.errorEmail,
    message: dict.form.errorMessage,
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus('submitting');
    setErrors({});

    const result = await submitLead({
      name: String(data.get('name') ?? ''),
      phone: String(data.get('phone') ?? ''),
      email: String(data.get('email') ?? ''),
      company: String(data.get('company') ?? ''),
      topic,
      message: String(data.get('message') ?? ''),
      locale,
      source,
    });

    if (result.ok) {
      setStatus('success');
      form.reset();
      setTopic(defaultTopic);
      return;
    }

    if (result.error === 'validation' && result.fields) {
      const nextErrors: FieldErrors = {};
      for (const key of ['name', 'phone', 'email', 'message'] as const) {
        if (result.fields[key]) nextErrors[key] = errorMessages[key];
      }
      setErrors(nextErrors);
      setStatus('idle');
      return;
    }

    setStatus('error');
  }

  if (status === 'success') {
    return (
      <div
        className={cn(
          'flex flex-col items-center gap-4 rounded-2xl border border-[var(--success)]/35 bg-[var(--success)]/8 p-8 text-center',
          className,
        )}
        role="status"
      >
        <CheckCircle2 size={44} strokeWidth={1.8} className="text-[var(--success)]" aria-hidden />
        <h3 className="text-xl font-bold">{dict.form.successTitle}</h3>
        <p className="text-sm leading-relaxed text-muted">{dict.form.successBody}</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className={buttonClasses('outline', 'md')}
        >
          {dict.form.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        'flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8',
        className,
      )}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-semibold">
            {dict.form.name} <span className="text-[var(--brand-blue-600)]">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={dict.form.namePlaceholder}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={cn(inputBase, errors.name ? 'border-red-500' : 'border-border')}
          />
          {errors.name ? (
            <p id="name-error" className="text-xs font-semibold text-red-500">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-semibold">
            {dict.form.phone} <span className="text-[var(--brand-blue-600)]">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            dir="ltr"
            autoComplete="tel"
            placeholder={dict.form.phonePlaceholder}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={cn(inputBase, 'nums', errors.phone ? 'border-red-500' : 'border-border')}
          />
          {errors.phone ? (
            <p id="phone-error" className="text-xs font-semibold text-red-500">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold">
            {dict.form.email}{' '}
            <span className="text-xs font-normal text-muted">({dict.common.optional})</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            placeholder={dict.form.emailPlaceholder}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={cn(inputBase, errors.email ? 'border-red-500' : 'border-border')}
          />
          {errors.email ? (
            <p id="email-error" className="text-xs font-semibold text-red-500">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="company" className="text-sm font-semibold">
            {dict.form.company}{' '}
            <span className="text-xs font-normal text-muted">({dict.common.optional})</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder={dict.form.companyPlaceholder}
            className={cn(inputBase, 'border-border')}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="topic" className="text-sm font-semibold">
          {dict.form.topic}
        </label>
        <select
          id="topic"
          name="topic"
          value={topic}
          onChange={(event) => setTopic(event.target.value as LeadTopic)}
          className={cn(inputBase, 'border-border')}
        >
          {topicOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-semibold">
          {dict.form.message} <span className="text-[var(--brand-blue-600)]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={dict.form.messagePlaceholder}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={cn(inputBase, 'resize-y', errors.message ? 'border-red-500' : 'border-border')}
        />
        {errors.message ? (
          <p id="message-error" className="text-xs font-semibold text-red-500">
            {errors.message}
          </p>
        ) : null}
      </div>

      {status === 'error' ? (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-red-500/40 bg-red-500/8 p-4 text-sm"
        >
          <TriangleAlert size={18} className="mt-0.5 shrink-0 text-red-500" aria-hidden />
          <span>
            <strong className="font-bold">{dict.form.errorTitle}</strong>
            <span className="block text-muted">{dict.form.errorBody}</span>
          </span>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className={buttonClasses('primary', 'lg', 'w-full')}
      >
        {status === 'submitting' ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden />
            {dict.form.submitting}
          </>
        ) : (
          <>
            <Send size={17} strokeWidth={2} aria-hidden />
            {dict.form.submit}
          </>
        )}
      </button>

      <p className="text-xs leading-relaxed text-muted">{dict.form.privacyNote}</p>
    </form>
  );
}

export default ContactForm;
