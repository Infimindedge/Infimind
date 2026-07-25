import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';
import PhoneInput, { type Country } from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import countryLabels from 'react-phone-number-input/locale/en';
import { contactSchema, type ContactFormValues } from './contactSchema';
import { submitEnquiry } from '@/services/enquiries';

const inputClass =
  'w-full rounded-btn border border-border-strong bg-paper-pure px-3.5 py-2.5 text-sm text-ink outline-none focus-visible:border-blue';
const labelClass = 'mb-1.5 block text-sm font-medium text-ink';
const errorClass = 'mt-1 text-xs text-error';

/**
 * Client-side validation only, per the builder pack — no repository or admin
 * wiring, unlike the homepage's ConsultationForm. Submitting just confirms
 * success locally.
 */
export function ContactForm() {
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
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      parentName: '',
      studentName: '',
      email: '',
      phone: '',
      country: '',
      programme: 'undecided',
      message: '',
    },
  });

  function handleCountryChange(country?: Country) {
    setValue('country', country ? countryLabels[country] : '', {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  async function onSubmit(values: ContactFormValues) {
    setSubmitError(null);
    try {
      await submitEnquiry({
        name: values.parentName,
        studentName: values.studentName,
        email: values.email,
        phone: values.phone,
        country: values.country,
        program: values.programme,
        message: values.message,
        source: 'contact',
        website,
        formStartedAt,
      });
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to send your message.');
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-container border border-border bg-paper-pure p-10 text-center shadow-soft">
        <CheckCircle2 size={40} className="text-success" aria-hidden="true" />
        <h3 className="font-display text-2xl text-ink">Thank you</h3>
        <p className="max-w-sm text-sm text-ink-soft">
          We&rsquo;ve received your message. Our team will reach out to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-parent-name" className={labelClass}>
            Parent / Guardian Name
          </label>
          <input
            id="contact-parent-name"
            className={inputClass}
            {...register('parentName')}
            aria-invalid={Boolean(errors.parentName)}
          />
          {errors.parentName ? <p className={errorClass}>{errors.parentName.message}</p> : null}
        </div>
        <div>
          <label htmlFor="contact-student-name" className={labelClass}>
            Student Name (Optional)
          </label>
          <input id="contact-student-name" className={inputClass} {...register('studentName')} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            className={inputClass}
            {...register('email')}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <p className={errorClass}>{errors.email.message}</p> : null}
        </div>
        <div>
          <label htmlFor="contact-programme" className={labelClass}>
            Programme of Interest
          </label>
          <select id="contact-programme" className={inputClass} {...register('programme')}>
            <option value="undecided">Not sure yet</option>
            <option value="school">School Programme</option>
            <option value="sat">SAT Programme</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-phone" className={labelClass}>
          Country and phone number
        </label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              id="contact-phone"
              className="infimind-phone-input"
              flags={flags}
              labels={countryLabels}
              international
              countryCallingCodeEditable={false}
              value={field.value || undefined}
              onChange={(value) => field.onChange(value ?? '')}
              onBlur={field.onBlur}
              onCountryChange={handleCountryChange}
              placeholder="Select a country, then enter the number"
              aria-invalid={Boolean(errors.phone)}
            />
          )}
        />
        {errors.country ? <p className={errorClass}>{errors.country.message}</p> : null}
        {errors.phone ? <p className={errorClass}>{errors.phone.message}</p> : null}
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
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
        Send Message
      </button>
      {submitError ? <p role="alert" className={errorClass}>{submitError}</p> : null}
    </form>
  );
}
