import { z } from 'zod';

export const challengeSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  challengeTitle: z.string().optional(),
  challengeDescription: z.string().optional(),
  approach: z.array(z.object({ value: z.string().min(1, 'Cannot be empty') })),
  outcomes: z.array(z.object({ value: z.string().min(1, 'Cannot be empty') })),
  challengeImageFilename: z.string().optional(),
  outcomeImageFilename: z.string().optional(),
  sortOrder: z.number().int(),
});

export type ChallengeFormValues = z.infer<typeof challengeSchema>;
