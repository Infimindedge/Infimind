import type { JourneyStep } from '@/types/content';

export const journeySeed: JourneyStep[] = [
  {
    id: 'consultation',
    step: 1,
    title: 'Private Consultation',
    description: "We understand your child's goals, strengths and challenges.",
  },
  {
    id: 'assessment',
    step: 2,
    title: 'Student Assessment',
    description: 'In-depth diagnostic assessment to identify gaps and opportunities.',
  },
  {
    id: 'blueprint',
    step: 3,
    title: 'Personal Learning Blueprint',
    description: "A customised plan designed for your child's unique needs.",
  },
  {
    id: 'sessions',
    step: 4,
    title: 'Weekly Learning Sessions',
    description: 'Focused learning with mentors, practice and feedback.',
  },
  {
    id: 'reviews',
    step: 5,
    title: 'Mentorship & Progress Reviews',
    description: 'Regular reviews to track progress and adjust the plan.',
  },
  {
    id: 'growth',
    step: 6,
    title: 'Growth & Achievement',
    description: 'Stronger academics, confidence and long-term success.',
  },
];
