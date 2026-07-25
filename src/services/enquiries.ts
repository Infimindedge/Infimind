import type { ProgramId } from '@/types/content';

const endpoint = import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL;
const webAppUrlPattern = /^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/;

export interface EnquirySubmission {
  name: string;
  studentName?: string;
  email: string;
  phone: string;
  country: string;
  program: ProgramId | 'undecided';
  message: string;
  source: 'consultation' | 'contact';
  website?: string;
  formStartedAt: number;
}

export async function submitEnquiry(submission: EnquirySubmission): Promise<void> {
  if (submission.website || Date.now() - submission.formStartedAt < 2_000) {
    throw new Error('Please wait a moment and try again.');
  }

  if (!endpoint || !webAppUrlPattern.test(endpoint)) {
    throw new Error('Online enquiries are not configured yet. Please contact us by email or WhatsApp.');
  }

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      redirect: 'follow',
      body: JSON.stringify({
        ...submission,
        website: undefined,
        submittedAt: new Date().toISOString(),
        siteOrigin: window.location.origin,
      }),
    });
  } catch {
    throw new Error('We could not send your enquiry. Please try again or contact us directly.');
  }

  if (!response.ok) {
    throw new Error('We could not send your enquiry. Please try again or contact us directly.');
  }

  const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (!result?.ok) {
    throw new Error(result?.error || 'We could not send your enquiry. Please try again.');
  }
}
