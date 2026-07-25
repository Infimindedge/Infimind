import rawContent from '../../Infimind_School_Programme_Codex_Builder_Pack/content/school-programme-content.json';
import type { SchoolProgrammeContent, SchoolProgrammeFaqItem } from '@/types/schoolProgramme';

export const schoolProgrammeContent = rawContent as unknown as SchoolProgrammeContent;
export const { page: schoolProgramme, guardrails: schoolProgrammeGuardrails } = schoolProgrammeContent;

export const programmeImages: Record<string, string> = {
  discover: 'discover.jpg',
  explorer: 'explorer.jpg',
  pathfinder: 'Pathfinder.jpg',
  scholar: 'scholar.jpg',
};

export const learningCycle = [
  ['Diagnose', 'Identify priorities, strengths and gaps.'],
  ['Learn', 'Build understanding with guided subject teaching.'],
  ['Practise', 'Use retrieval, mixed questions and application.'],
  ['Review', 'Examine progress, errors and retention.'],
  ['Reflect', 'Consider confidence, strategy and independence.'],
  ['Adapt', 'Adjust the next cycle around the learner.'],
] as const;

export const assessmentDimensions = ['Retention', 'Reasoning', 'Error recovery', 'Confidence', 'Strategy', 'Independence'];

export const dashboardWidgets = [
  ['Current Goals', 'On Track'],
  ['Concept Progress', 'Developing'],
  ['Revision Consistency', 'Secure'],
  ['Feedback Applied', 'On Track'],
  ['Learning Habits', 'Developing'],
  ['Upcoming Reviews', 'Review Due'],
] as const;

const flexibleStructure =
  "The exact programme structure is agreed after understanding the student's curriculum, subjects, goals and support needs.";

export const schoolProgrammeFaqs: SchoolProgrammeFaqItem[] = [
  { question: 'Which grades does the School Programme support?', answer: 'The School Programme supports learners from Grades 1–12 through Discover, Explorer, Pathfinder and Scholar.' },
  { question: 'Which subjects are available?', answer: 'The subject mix is selected from the age-appropriate subjects shown for each programme stage and can evolve with the learner.' },
  { question: 'Which curricula can Infimind support?', answer: "Support can be adapted for IB, Cambridge International, British, American, CBSE and ICSE / ISC curricula according to the student's school requirements." },
  { question: 'Is the programme personalised?', answer: schoolProgrammeGuardrails.replacementForBlueSalesBox.body },
  { question: 'How are educators selected?', answer: 'Students learn with carefully selected educators who bring strong subject knowledge and experience explaining ideas clearly.' },
  { question: 'How does the REALISE™ Framework work?', answer: 'Students Retrieve, Explain, Apply, Link, Inspect, Space and Evolve their learning through a research-informed, personalised system.' },
  { question: 'How is progress reviewed?', answer: 'Progress is reviewed through ongoing observation, low-stakes diagnostics, projects, mentor reviews, error and retention analysis, reflection and personalised goals.' },
  { question: 'How are parents kept informed?', answer: 'Families receive clear learning updates, structured reviews and visibility into strengths, barriers and next steps.' },
  { question: 'Can the subject mix change?', answer: 'Yes. The subject mix, pace, practice and support can evolve around the learner.' },
  { question: 'Is this a group or one-to-one programme?', answer: flexibleStructure },
];

export const schoolProgrammeStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Infimind School Programme',
      provider: { '@type': 'Organization', name: 'Infimind' },
      audience: { '@type': 'EducationalAudience', educationalRole: 'student' },
      description: schoolProgramme.hero.body,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Infimind', item: '/' },
        { '@type': 'ListItem', position: 2, name: 'School Programme', item: '/programs/school' },
      ],
    },
  ],
};
