import { z } from 'zod';

export const challengeSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  challengeTitle: z.string().optional(),
  challengeDescription: z.string().optional(),
  // Rows are intentionally allowed to be blank here — a fresh form starts
  // with one empty row, and admins may leave stray empty rows while
  // editing. Blank rows are filtered out on submit (see ChallengesAdmin).
  approach: z.array(z.object({ value: z.string() })),
  outcomes: z.array(z.object({ value: z.string() })),
  challengeImageFilename: z.string().optional(),
  outcomeImageFilename: z.string().optional(),
  sortOrder: z.number().int(),
});

export type ChallengeFormValues = z.infer<typeof challengeSchema>;
