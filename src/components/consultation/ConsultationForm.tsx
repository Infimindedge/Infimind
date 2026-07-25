import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Clock, CheckCircle2 } from 'lucide-react';
import PhoneInput, { type Country } from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import countryLabels from 'react-phone-number-input/locale/en';
import { consultationSchema, type ConsultationFormValues } from './consultationSchema';
import { CountryFlagSelect } from '@/components/ui/CountryFlagSelect';
import { submitEnquiry } from '@/services/enquiries';

const inputClass =
  'w-full rounded-btn border border-border-strong bg-paper-pure px-3.5 py-2.5 text-sm text-ink outline-none focus-visible:border-blue';
const labelClass = 'mb-1.5 block text-sm font-medium text-ink';
const errorClass = 'mt-1 text-xs text-error';

interface ConsultationFormProps {
  onSubmitted?: () => void;
}

export function ConsultationForm({ onSubmitted }: ConsultationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formStartedAt] = useState(() => Date.now());
  const [website, setWebsite] = useState('');
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      name: '',
      email: '',
      whatsapp: '',
      country: '',
      countryOther: '',
      program: 'school',
      message: '',
    },
  });

  function handleCountryChange(country?: Country) {
    setValue('country', country ? countryLabels[country] : '', {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  async function onSubmit(values: ConsultationFormValues) {
    setSubmitError(null);
    try {
      await submitEnquiry({
      name: values.name,
      email: values.email,
      phone: values.whatsapp,
      country: values.country === 'Other' ? (values.countryOther?.trim() ?? 'Other') : values.country,
      program: values.program,
      message: values.message,
      source: 'consultation',
      website,
      formStartedAt,
      });
      setSubmitted(true);
      onSubmitted?.();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to send your enquiry.');
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <CheckCircle2 size={40} className="text-success" aria-hidden="true" />
        <h3 className="font-display text-2xl text-ink">Thank you</h3>
        <p className="max-w-sm text-sm text-ink-soft">
          We&rsquo;ve received your enquiry. Our team will reach out within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="consult-website">Website</label>
        <input
          id="consult-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>
      <div className="flex items-start gap-2.5 rounded-lg border border-border bg-paper-soft p-3.5 text-xs text-ink-soft">
        <Clock size={16} className="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" />
        <p>Share a few details below and our team will reach out within 24 hours.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="consult-name" className={labelClass}>
            Name
          </label>
          <input id="consult-name" className={inputClass} {...register('name')} aria-invalid={Boolean(errors.name)} />
          {errors.name ? <p className={errorClass}>{errors.name.message}</p> : null}
        </div>
        <div>
          <label htmlFor="consult-email" className={labelClass}>
            Email
          </label>
          <input
            id="consult-email"
            type="email"
            className={inputClass}
            {...register('email')}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <p className={errorClass}>{errors.email.message}</p> : null}
        </div>
      </div>

      <div>
        <label htmlFor="consult-whatsapp" className={labelClass}>
          Country and WhatsApp number
        </label>
        <Controller
          name="whatsapp"
          control={control}
          render={({ field }) => (
            <PhoneInput
              id="consult-whatsapp"
              className="infimind-phone-input"
              flags={flags}
              labels={countryLabels}
              countrySelectComponent={CountryFlagSelect}
              international
              countryCallingCodeEditable={false}
              value={field.value || undefined}
              onChange={(value) => field.onChange(value ?? '')}
              onBlur={field.onBlur}
              onCountryChange={handleCountryChange}
              placeholder="Select a country, then enter the number"
              aria-invalid={Boolean(errors.whatsapp)}
            />
          )}
        />
        {errors.country ? <p className={errorClass}>{errors.country.message}</p> : null}
        {errors.whatsapp ? <p className={errorClass}>{errors.whatsapp.message}</p> : null}
      </div>

      <div>
        <span className={labelClass}>Programme</span>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="radio" value="school" className="h-4 w-4" {...register('program')} />
            School Programme
          </label>
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="radio" value="sat" className="h-4 w-4" {...register('program')} />
            SAT Programme
          </label>
        </div>
        {errors.program ? <p className={errorClass}>{errors.program.message}</p> : null}
      </div>

      <div>
        <label htmlFor="consult-message" className={labelClass}>
          What are you looking for?
        </label>
        <textarea
          id="consult-message"
          rows={4}
          placeholder="Tell us a little about your child's goals and challenges…"
          className={inputClass}
          {...register('message')}
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message ? <p className={errorClass}>{errors.message.message}</p> : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 min-h-[44px] rounded-btn bg-navy px-6 py-3.5 text-sm font-medium text-on-dark shadow-soft transition-shadow hover:shadow-hover disabled:opacity-60"
      >
        Request a Consultation
      </button>
      {submitError ? <p role="alert" className={errorClass}>{submitError}</p> : null}
    </form>
  );
}
