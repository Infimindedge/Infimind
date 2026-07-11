import type { ChallengeItem } from '@/types/content';

/**
 * Only "Weak Fundamentals" has supplied content. The rest are intentionally
 * left empty per the build spec — do not invent copy. See CONTENT_GAPS.md.
 */
export const challengesSeed: ChallengeItem[] = [
  {
    id: 'weak-fundamentals',
    label: 'Weak Fundamentals',
    challengeTitle: 'Weak Fundamentals',
    challengeDescription:
      "The student memorises but doesn't truly understand concepts, leading to gaps and low confidence.",
    approach: [
      'Personal Learning Plan',
      'One-to-one Mentor Support',
      'Concept Reinforcement',
      'Practice & Feedback',
      'Parent Progress Updates',
    ],
    outcomes: [
      'Stronger conceptual clarity',
      'Improved grades',
      'Confidence in problem solving',
      'Consistent academic growth',
    ],
    imageFilename: 'weak-fundamentals.jpg',
  },
  {
    id: 'study-discipline',
    label: 'Study Discipline',
    approach: [],
    outcomes: [],
  },
  {
    id: 'lack-of-confidence',
    label: 'Lack of Confidence',
    approach: [],
    outcomes: [],
  },
  {
    id: 'sat-strategy',
    label: 'SAT Strategy',
    approach: [],
    outcomes: [],
  },
  {
    id: 'exam-anxiety',
    label: 'Exam Anxiety',
    approach: [],
    outcomes: [],
  },
  {
    id: 'university-planning',
    label: 'University Planning',
    approach: [],
    outcomes: [],
  },
];
