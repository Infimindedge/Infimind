export type ProgrammeStageId = 'discover' | 'explorer' | 'pathfinder' | 'scholar';

export interface ProgrammeBand {
  id: ProgrammeStageId;
  name: string;
  grades: string;
  strapline: string;
  focus: string;
  subjects: Record<string, string[]>;
  outcomes: string[];
}

export interface Curriculum {
  name: string;
  short: string;
  coverage: string[];
  note: string;
}

export interface SciencePrinciple {
  name: string;
  summary: string;
  application: string;
}

export interface SchoolProgrammeContent {
  page: {
    route: string;
    title: string;
    hero: {
      eyebrow: string;
      headlineLine1: string;
      headlineAccent: string;
      body: string;
      primaryCta: string;
      secondaryCta: string;
      proofPoints: string[];
    };
    programmeBands: ProgrammeBand[];
    curricula: Curriculum[];
    science: {
      frameworkName: string;
      frameworkExpansion: string[];
      statement: string;
      principles: SciencePrinciple[];
      disclaimer: string;
    };
    learningTeam: { role: string; description: string }[];
    approach: { name: string; description: string }[];
    beyondAcademics: string[];
    assessment: string[];
    parentExperience: string[];
    finalCta: { headline: string; body: string; button: string };
  };
  guardrails: {
    doNotUse: string[];
    preferredTutorLanguage: string[];
    replacementForBlueSalesBox: {
      title: string;
      body: string;
      items: string[];
      noNumbers: boolean;
    };
  };
}

export interface SchoolProgrammeFaqItem {
  question: string;
  answer: string;
}
