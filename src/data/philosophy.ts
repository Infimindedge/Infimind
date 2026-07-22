import {
  BarChart3,
  Handshake,
  HeartHandshake,
  Infinity as InfinityIcon,
  Search,
  SlidersHorizontal,
  Star,
  Target,
  UserRound,
  Users,
  type LucideIcon,
} from 'lucide-react';

export interface PhilosophyBelief {
  title: string;
  body: string;
  icon: LucideIcon;
}

export interface PhilosophyStep {
  step: number;
  title: string;
  body: string;
  icon: LucideIcon;
}

export const philosophyHero = {
  eyebrow: 'OUR PHILOSOPHY',
  headline: 'Every Child Learns Differently.',
  subheadline: 'So why should every child be taught the same way?',
  paragraphs: [
    'Education has long been built around standardisation. Standard lessons. Standard pacing. Standard assessments. Standard expectations.',
    'We believe meaningful learning begins when education adapts to the individual—not when the individual is expected to adapt to the system.',
  ],
};

export const betterSystems = {
  headlineLine1: 'We Don’t Build Better Students.',
  headlineLine2: 'We Build Better Learning Systems.',
  paragraphs: [
    'Achievement is rarely limited by intelligence.',
    'More often, it is limited by how a student learns, how consistently they practise, how confidently they approach challenges, and whether someone truly understands their individual journey.',
    'Our responsibility is not simply to teach.',
  ],
  emphasis: 'It is to engineer an environment where meaningful learning becomes possible.',
};

export const philosophyBeliefs: PhilosophyBelief[] = [
  {
    title: 'Learning is Personal',
    body: 'No two students think, learn or progress in exactly the same way.',
    icon: UserRound,
  },
  {
    title: 'Progress is Measured Beyond Scores',
    body: 'Grades tell us what happened. Understanding explains why.',
    icon: BarChart3,
  },
  {
    title: 'Mentorship Changes Outcomes',
    body: 'Every student deserves someone who knows their journey—not just their marks.',
    icon: Users,
  },
  {
    title: 'Parents Are Partners',
    body: 'Meaningful progress happens when educators and families move together.',
    icon: Handshake,
  },
  {
    title: 'Learning Never Stops',
    body: 'Confidence, curiosity and independence matter long after examinations are over.',
    icon: InfinityIcon,
  },
];

export const learningPhilosophySteps: PhilosophyStep[] = [
  {
    step: 1,
    title: 'Understand',
    body: 'We begin by understanding the learner before designing the same way.',
    icon: Search,
  },
  {
    step: 2,
    title: 'Personalise',
    body: 'Every roadmap is built around individual strengths, gaps and ambitions.',
    icon: Target,
  },
  {
    step: 3,
    title: 'Support',
    body: 'Continuous mentorship creates accountability, confidence and resilience.',
    icon: HeartHandshake,
  },
  {
    step: 4,
    title: 'Refine',
    body: 'Every review becomes an opportunity to improve the journey.',
    icon: SlidersHorizontal,
  },
  {
    step: 5,
    title: 'Flourish',
    body: 'Success becomes the outcome of a stronger learning system.',
    icon: Star,
  },
];

export const beyondCoaching = {
  headline: 'Beyond Coaching',
  lead: 'We have never believed that education should end when a class finishes.',
  body: 'Great education continues in conversations, reflections, mentorship, encouragement and thoughtful guidance. It is present in every question a student asks, every setback they overcome and every milestone they celebrate.',
};

export const researchDriven = {
  headline: 'Built on Research. Driven by People.',
  body: 'Our methods are shaped by evidence. Our relationships are built on trust. Together, they create meaningful outcomes.',
  points: ['Learning Science', 'Educational Psychology', 'Cognitive Research', 'Continuous Observation', 'Personalised Learning Design'],
};

export const philosophyPromise = {
  headline: 'The Promise We Make',
  body1: 'We cannot promise that every student will follow the same path.',
  body2: 'We can promise that every student will receive the attention, guidance and learning experience they deserve.',
};

export const philosophyQuote =
  'Education should never ask a child to fit the system. The system should be built around the child.';

export const philosophyCta = {
  headline: 'Discover the Programmes Built Around This Philosophy',
  button: 'Explore Our Programmes',
  target: '/#programs',
};
