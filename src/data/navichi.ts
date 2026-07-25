import {
  BarChart3,
  BookOpenCheck,
  Brain,
  CalendarCheck,
  ClipboardCheck,
  Compass,
  FileText,
  FlaskConical,
  Gauge,
  GraduationCap,
  LineChart,
  MessagesSquare,
  Microscope,
  Network,
  NotebookPen,
  PencilRuler,
  Repeat2,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  UserRoundCheck,
} from 'lucide-react';
import type { ComparisonCard, EcosystemNode, FaqItem, NavichiNavItem, ProcessStep, TitledCopy } from '@/types/navichi';

export const navichiNavItems: NavichiNavItem[] = [
  { id: 'navichi-method', label: 'The Navichi Method' },
  { id: 'learning-science', label: 'Learning Science' },
  { id: 'learning-intelligence-portal', label: 'Learning Intelligence Portal' },
  { id: 'student-journey', label: 'Student Journey' },
  { id: 'parent-partnership', label: 'Parent Partnership' },
  { id: 'faq', label: 'FAQ' },
];

export const comparisonCards: ComparisonCard[] = [
  {
    title: 'Traditional SAT Coaching',
    subtitle: 'One Size Fits All',
    variant: 'traditional',
    items: [
      'Generic teaching',
      'Fixed batches',
      'Same homework',
      'Mock scores',
      'Weekly classes',
      'Limited Personalisation',
    ],
  },
  {
    title: 'Navichi - The Personalised SAT Navigator',
    subtitle: 'Engineered Around You',
    variant: 'navichi',
    items: [
      'Diagnose real gaps',
      'Engineer personalised plan',
      'Observe every detail',
      'Adapt to how you learn',
      'Support beyond classes',
      'Evolve with your progress',
    ],
  },
];

export const ecosystemNodes: EcosystemNode[] = [
  {
    title: 'Personal Mentor',
    description: 'One-to-one guidance and continuous support.',
    side: 'left',
  },
  {
    title: 'Academic Counsellor',
    description: 'Strategic planning and academic direction.',
    side: 'left',
  },
  {
    title: 'Learning Intelligence Portal',
    description: 'Real-time insight into performance and learning behaviour.',
    side: 'left',
  },
  {
    title: 'Personalised Question Engineering',
    description: "Questions created around the student's exact learning needs.",
    side: 'right',
  },
  {
    title: 'Weekly Reviews',
    description: 'Detailed analysis and adaptive planning.',
    side: 'right',
  },
  {
    title: 'Continuous Support',
    description: 'Guidance continues beyond formal sessions.',
    side: 'right',
  },
];

export const deepenSteps: ProcessStep[] = [
  {
    title: 'Diagnose',
    description: 'Identify concepts, habits, reasoning patterns and bottlenecks.',
    icon: Search,
  },
  {
    title: 'Engineer',
    description: 'Build a personalised learning blueprint, practice plan and interventions.',
    icon: PencilRuler,
  },
  {
    title: 'Examine',
    description: 'Analyse answers, rough work, timing, confidence and behaviour.',
    icon: Microscope,
  },
  {
    title: 'Practise',
    description: 'Apply retrieval, spacing, interleaving, deliberate practice and feedback.',
    icon: NotebookPen,
  },
  {
    title: 'Evolve',
    description: 'Adapt continuously as evidence from the student changes.',
    icon: Repeat2,
  },
  {
    title: 'Navigate',
    description: 'Build strategy, decision-making and confident performance under pressure.',
    icon: Compass,
  },
];

export const differenceTiles: TitledCopy[] = [
  {
    title: 'Learning Intelligence Portal',
    description: 'Real-time insight beyond scores.',
    icon: LineChart,
  },
  {
    title: 'Personalised Question Engineering',
    description: 'Every question is selected, adapted or created for a reason.',
    icon: Target,
  },
  {
    title: 'Rough-Work Analysis',
    description: 'We examine how the student thinks - not only what they answer.',
    icon: FileText,
  },
  {
    title: 'Qualitative Progress',
    description: 'We measure effort, consistency, strategy and improvement.',
    icon: BarChart3,
  },
  {
    title: 'Scientific Learning',
    description: 'Built on established principles from cognitive science and educational psychology.',
    icon: Brain,
  },
  {
    title: 'Continuous Mentorship',
    description: 'Support does not end when the lesson ends.',
    icon: MessagesSquare,
  },
];

export const weeklySteps: ProcessStep[] = [
  { title: 'Review', description: 'Previous week', icon: ClipboardCheck },
  { title: 'New Questions', description: 'Targeted sets', icon: BookOpenCheck },
  { title: 'Revision', description: 'Retrieval and spaced review', icon: Repeat2 },
  { title: 'Feedback', description: 'Reasoning and strategy guidance', icon: MessagesSquare },
  { title: 'Better Plan', description: 'Rebuild next week around updated evidence', icon: Route },
];

export const journeySteps: ProcessStep[] = [
  {
    title: 'Day 1 Diagnostic',
    description: 'We understand current ability, reasoning style and learning barriers.',
    icon: Search,
  },
  {
    title: 'Personalised Plan',
    description: 'A unique roadmap is created around the student.',
    icon: Route,
  },
  {
    title: 'Learning',
    description: 'Concepts and strategies are taught in the most effective way.',
    icon: GraduationCap,
  },
  {
    title: 'Practice',
    description: 'Deliberate practice with engineered question sets.',
    icon: NotebookPen,
  },
  {
    title: 'Mentor Review',
    description: 'In-depth analysis and improvement interventions.',
    icon: UserRoundCheck,
  },
  {
    title: 'Learning Portal',
    description: 'Progress, effort and growth are tracked in real time.',
    icon: LineChart,
  },
  {
    title: 'Mock Tests',
    description: 'Real examination simulation with detailed analysis.',
    icon: Gauge,
  },
  {
    title: 'University Goals',
    description: 'A stronger score, profile and future direction.',
    icon: Sparkles,
  },
];

export const scienceCards: TitledCopy[] = [
  {
    title: 'Retrieval Practice',
    description: 'Strengthens memory by asking students to recall and apply learning.',
    icon: Brain,
  },
  {
    title: 'Spaced Learning',
    description: 'Revisits important concepts over time to support retention.',
    icon: CalendarCheck,
  },
  {
    title: 'Interleaved Practice',
    description: 'Prepares students to recognise methods in mixed question sets.',
    icon: Network,
  },
  {
    title: 'Deliberate Practice',
    description: 'Targets specific observed barriers with clear feedback.',
    icon: Target,
  },
  {
    title: 'Metacognition',
    description: 'Helps students monitor confidence, strategy and understanding.',
    icon: FlaskConical,
  },
  {
    title: 'Worked Examples',
    description: 'Uses guided models before gradually increasing independence.',
    icon: BookOpenCheck,
  },
];

export const portalPoints: TitledCopy[] = [
  { title: 'Performance intelligence', description: 'Score, section and topic-level patterns.' },
  { title: 'Learning behaviour intelligence', description: 'Consistency, feedback use and independence.' },
  { title: 'Qualitative effort analysis', description: 'Productive effort rather than hours alone.' },
  { title: 'Confidence calibration', description: 'Whether confidence aligns with accuracy.' },
  { title: 'Error-pattern tracking', description: 'Recurring reasoning and strategy barriers.' },
  { title: 'Increasing independence', description: 'How support reduces as competence grows.' },
];

export const parentItems: TitledCopy[] = [
  {
    title: 'Weekly Reports',
    description: 'Detailed updates on progress and focus areas.',
    icon: FileText,
  },
  {
    title: 'Monthly Review Calls',
    description: 'Strategic discussions with the academic counsellor.',
    icon: CalendarCheck,
  },
  {
    title: 'Parent Visibility',
    description: 'Stay informed anytime with real-time visibility.',
    icon: ShieldCheck,
  },
  {
    title: 'Open Communication',
    description: 'We are available when parents need us.',
    icon: MessagesSquare,
  },
];

export const outcomes: TitledCopy[] = [
  { title: 'Academic Mastery', description: 'Stronger concept knowledge and application.' },
  { title: 'Strategic Efficiency', description: 'More reliable methods under time pressure.' },
  { title: 'Error Recovery', description: 'Clearer correction after mistakes.' },
  { title: 'Test Readiness', description: 'Practice that prepares students for the real examination.' },
  { title: 'Learning Independence', description: 'Better judgement, reflection and ownership.' },
  { title: 'Productive Effort', description: 'Study habits connected to genuine improvement.' },
];

export const faqs: FaqItem[] = [
  {
    question: 'How is Navichi different from a standard SAT programme?',
    answer:
      'A standard programme usually follows a fixed sequence. Navichi begins with diagnosis, then adapts the plan, practice and support around how the student is actually learning and performing.',
  },
  {
    question: 'Is Navichi one-to-one?',
    answer:
      'Yes. Navichi is built as a one-to-one, personalised SAT preparation journey with individual mentor support and adaptive planning.',
  },
  {
    question: 'What happens during the diagnostic?',
    answer:
      'The diagnostic looks beyond the score. It reviews concepts, reasoning, timing, rough work, confidence, study habits and recurring bottlenecks.',
  },
  {
    question: 'How is personalised practice created?',
    answer:
      'Questions are selected, adapted or created around observed needs, such as a recurring concept gap, strategy issue, timing problem or error pattern.',
  },
  {
    question: 'Are mock tests included?',
    answer:
      'Mock tests are used diagnostically. The result is analysed for score, section performance, timing, reasoning quality and the changes needed next.',
  },
  {
    question: 'What does the Learning Intelligence Portal measure?',
    answer:
      'The portal is designed to track performance patterns, learning behaviour, qualitative effort, confidence calibration, error patterns and increasing independence.',
  },
  {
    question: 'How are parents updated?',
    answer:
      'Parents receive visibility through reports, review conversations and communication around the student journey.',
  },
  {
    question: 'Does Navichi follow a fixed syllabus?',
    answer:
      'No. Navichi uses the SAT requirements as the target, but the route is adapted around the student rather than delivered as one fixed syllabus.',
  },
  {
    question: 'Can mentor support change as the student develops?',
    answer:
      'Yes. The programme is designed to evolve as the student builds competence, confidence and independence.',
  },
  {
    question: 'What is the learning-science basis?',
    answer:
      'Navichi is informed by principles such as retrieval practice, spaced learning, interleaving, worked examples, metacognition, formative feedback and deliberate practice. Programme structure is finalised after the initial diagnostic and consultation.',
  },
];

export const researchNotes = [
  'Roediger and Karpicke on retrieval practice and testing effects.',
  'Cepeda and colleagues on distributed, spaced practice.',
  'Sweller and Cooper on worked examples and cognitive load.',
  'Wisniewski, Zierer and Hattie on feedback research.',
  'Mueller and Dweck on process-focused praise and productive effort.',
];

export const scientificDisclaimer =
  "Infimind's methodology is informed by research in learning science and educational psychology. The effectiveness of individual techniques may vary according to the learner, subject, implementation and context. The programme adapts these principles to each student rather than applying a single method uniformly.";

export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Navichi by Infimind',
  description:
    "Infimind's one-to-one personalised SAT preparation system combining diagnostic analysis, learning science, adaptive practice, continuous mentoring and progress intelligence.",
  brand: {
    '@type': 'Brand',
    name: 'Infimind',
  },
  category: 'Personalised SAT preparation',
};
