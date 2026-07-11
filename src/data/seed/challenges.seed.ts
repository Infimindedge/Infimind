import type { ChallengeItem } from '@/types/content';

/**
 * All six challenges have supplied content (client-provided, 2026-07-12).
 * Admins can add further challenges or edit these from /admin.
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
    challengeImageFilename: 'weak-fundamentals.jpg',
    outcomeImageFilename: 'weak-fundamentals-outcome.jpg',
    sortOrder: 1,
  },
  {
    id: 'study-discipline',
    label: 'Study Discipline',
    challengeTitle: 'Study Discipline',
    challengeDescription:
      'Students often struggle to build consistent study habits, making it difficult to stay organised and perform at their best.',
    approach: [
      'Personalised Study Planner',
      'Dedicated Mentor Accountability',
      'Weekly Progress Tracking',
      'Parent Progress Updates',
      'Habit & Routine Building',
    ],
    outcomes: [
      'Better study discipline',
      'Stronger time management',
      'Consistent academic performance',
      'Greater self-motivation',
    ],
    challengeImageFilename: 'study-discipline.jpg',
    outcomeImageFilename: 'study-discipline-outcome.jpg',
    sortOrder: 2,
  },
  {
    id: 'lack-of-confidence',
    label: 'Lack of Confidence',
    challengeTitle: 'Lack of Confidence',
    challengeDescription:
      'Many students hesitate to ask questions or tackle difficult problems because they lack confidence in their abilities.',
    approach: [
      'Personal Academic Mentoring',
      'Supportive Learning Environment',
      'Confidence Building Activities',
      'Regular Positive Feedback',
      'Goal-Based Learning',
    ],
    outcomes: [
      'Increased academic confidence',
      'Independent problem solving',
      'Greater classroom participation',
      'Positive learning mindset',
    ],
    challengeImageFilename: 'lack-of-confidence.jpg',
    outcomeImageFilename: 'lack-of-confidence-outcome.jpg',
    sortOrder: 3,
  },
  {
    id: 'sat-strategy',
    label: 'SAT Strategy',
    challengeTitle: 'SAT Strategy',
    challengeDescription:
      "Strong subject knowledge alone isn't enough—students also need the right strategy to perform under exam conditions.",
    approach: [
      'Personalised SAT Roadmap',
      'Section-wise Test Strategy',
      'Timed Mock Assessments',
      'Performance Analytics',
      'Continuous Mentor Support',
    ],
    outcomes: [
      'Smarter test-taking strategies',
      'Better time management',
      'Improved confidence',
      'Higher SAT performance',
    ],
    challengeImageFilename: 'sat-strategy.jpg',
    outcomeImageFilename: 'sat-strategy-outcome.jpg',
    sortOrder: 4,
  },
  {
    id: 'exam-anxiety',
    label: 'Exam Anxiety',
    challengeTitle: 'Exam Anxiety',
    challengeDescription: 'Stress and pressure can prevent students from demonstrating the knowledge they already possess.',
    approach: [
      'Wellbeing Counsellor Support',
      'Stress Management Techniques',
      'Balanced Study Planning',
      'Mentor Check-ins',
      'Parent Guidance',
    ],
    outcomes: [
      'Reduced exam stress',
      'Improved emotional wellbeing',
      'Better focus',
      'Consistent performance',
    ],
    challengeImageFilename: 'exam-anxiety.jpg',
    outcomeImageFilename: 'exam-anxiety-outcome.jpg',
    sortOrder: 5,
  },
  {
    id: 'university-planning',
    label: 'University Planning',
    challengeTitle: 'University Planning',
    challengeDescription:
      'Planning the right academic pathway can feel overwhelming without clear guidance and long-term direction.',
    approach: [
      'Academic Counselling',
      'University Planning Support',
      'Personal Goal Mapping',
      'Milestone Reviews',
      'Parent Collaboration',
    ],
    outcomes: [
      'Clear academic direction',
      'Better decision-making',
      'University readiness',
      'Confidence in future planning',
    ],
    challengeImageFilename: 'university-planning.jpg',
    outcomeImageFilename: 'university-planning-outcome.jpg',
    sortOrder: 6,
  },
];
