import type { SuccessTeamMember } from '@/types/content';

export const successTeamSeed: SuccessTeamMember[] = [
  {
    id: 'personal-mentor',
    role: 'Personal Academic Mentor',
    imageFilename: 'personal-mentor.jpg',
    points: [
      'Weekly accountability and study planning',
      'Progress reviews and parent communication',
      'Motivation, consistency and habit building',
    ],
  },
  {
    id: 'academic-counsellor',
    role: 'Academic Counsellor',
    imageFilename: 'academic-counsellor.jpg',
    points: [
      'Subject selection and learning strategy',
      'Goal setting and milestone planning',
      'School and university pathway guidance',
    ],
  },
  {
    id: 'wellbeing-counsellor',
    role: 'Health & Wellbeing Counsellor',
    imageFilename: 'wellbeing-counsellor.jpg',
    points: [
      'Exam stress and anxiety management',
      'Healthy study routines',
      'Emotional wellbeing and resilience',
    ],
  },
];
