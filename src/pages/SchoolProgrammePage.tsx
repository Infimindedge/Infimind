import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { ConsultationModalProvider } from '@/context/ConsultationModalContext';
import { schoolProgramme, schoolProgrammeStructuredData } from '@/data/schoolProgramme';
import type { ProgrammeStageId } from '@/types/schoolProgramme';
import { SchoolProgrammeHero } from '@/components/school-programme/SchoolProgrammeHero';
import { ProgrammeJourney } from '@/components/school-programme/ProgrammeJourney';
import { SubjectExplorer } from '@/components/school-programme/SubjectExplorer';
import { CurriculumSupport } from '@/components/school-programme/CurriculumSupport';
import { RealiseFramework } from '@/components/school-programme/RealiseFramework';
import { LearningScienceExplorer } from '@/components/school-programme/LearningScienceExplorer';
import { SchoolProgrammeApproach } from '@/components/school-programme/SchoolProgrammeApproach';
import { LearningTeam } from '@/components/school-programme/LearningTeam';
import { BeyondAcademics } from '@/components/school-programme/BeyondAcademics';
import { LearningCycle } from '@/components/school-programme/LearningCycle';
import { AssessmentPhilosophy } from '@/components/school-programme/AssessmentPhilosophy';
import { SchoolDashboardPreview } from '@/components/school-programme/SchoolDashboardPreview';
import { ParentExperience } from '@/components/school-programme/ParentExperience';
import { ProgrammeComparison } from '@/components/school-programme/ProgrammeComparison';
import { PersonalisationPanel } from '@/components/school-programme/PersonalisationPanel';
import { SchoolProgrammeFaq } from '@/components/school-programme/SchoolProgrammeFaq';
import { SchoolProgrammeCta } from '@/components/school-programme/SchoolProgrammeCta';
import { SchoolProgrammeTopbar } from '@/components/school-programme/SchoolProgrammeTopbar';
import '@/components/school-programme/schoolProgramme.css';

const TITLE = 'Personalised School Programme for Grades 1–12 | Infimind';
const DESCRIPTION = "Explore Infimind's personalised School Programme for Grades 1–12, combining exceptional subject educators, international-curriculum support, learning science, continuous mentoring and individual academic pathways.";
const stageIds = new Set(schoolProgramme.programmeBands.map((band) => band.id));

function useMetadata() {
  useEffect(() => {
    const previousTitle = document.title; document.title = TITLE;
    const entries = [
      { name: 'description', content: DESCRIPTION }, { property: 'og:title', content: TITLE },
      { property: 'og:description', content: DESCRIPTION }, { property: 'og:type', content: 'website' },
      { property: 'og:image', content: '/assets/school-programme/school-programme-social.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ];
    const metas = entries.map((entry) => { const element = document.createElement('meta'); Object.entries(entry).forEach(([key, value]) => element.setAttribute(key, value)); document.head.appendChild(element); return element; });
    const canonical = document.createElement('link'); canonical.rel = 'canonical'; canonical.href = `${window.location.origin}/programs/school`; document.head.appendChild(canonical);
    return () => { document.title = previousTitle; metas.forEach((meta) => meta.remove()); canonical.remove(); };
  }, []);
}

function SchoolProgrammeContent() {
  useMetadata();
  const [params, setParams] = useSearchParams();
  const requestedStage = params.get('stage') as ProgrammeStageId | null;
  const stage = requestedStage && stageIds.has(requestedStage) ? requestedStage : 'discover';
  const band = useMemo(() => schoolProgramme.programmeBands.find((item) => item.id === stage)!, [stage]);
  const subjectNames = useMemo(() => Object.keys(band.subjects), [band]);
  const requestedSubject = params.get('subject');
  const subject = requestedSubject && subjectNames.includes(requestedSubject) ? requestedSubject : subjectNames[0];
  const [frameworkStep, setFrameworkStep] = useState(0);
  const [principle, setPrinciple] = useState(0);

  function update(stageId: ProgrammeStageId, nextSubject?: string) {
    const next = new URLSearchParams(params); next.set('stage', stageId);
    const nextBand = schoolProgramme.programmeBands.find((item) => item.id === stageId)!;
    const safeSubject = nextSubject && Object.keys(nextBand.subjects).includes(nextSubject) ? nextSubject : Object.keys(nextBand.subjects)[0];
    next.set('subject', safeSubject); setParams(next, { replace: true });
  }

  return <><div className="school-programme flex min-h-screen flex-col overflow-x-hidden"><SchoolProgrammeTopbar /><main id="main-content" className="flex-1"><SchoolProgrammeHero /><ProgrammeJourney active={stage} onChange={update} /><div id="subject-support"><SubjectExplorer band={band} subject={subject} onStageChange={update} onSubjectChange={(nextSubject) => update(stage, nextSubject)} /><CurriculumSupport /></div><div id="learning-science"><RealiseFramework active={frameworkStep} onChange={setFrameworkStep} /><LearningScienceExplorer active={principle} onChange={setPrinciple} /></div><div id="school-approach"><SchoolProgrammeApproach /></div><div id="learning-team"><LearningTeam /><BeyondAcademics /><LearningCycle /><AssessmentPhilosophy /><SchoolDashboardPreview /></div><div id="parent-experience"><ParentExperience /><ProgrammeComparison active={stage} onChange={update} /><PersonalisationPanel /></div><div id="school-faq"><SchoolProgrammeFaq /></div><SchoolProgrammeCta /></main><Footer /></div><WhatsAppButton /><script type="application/ld+json">{JSON.stringify(schoolProgrammeStructuredData)}</script></>;
}

export default function SchoolProgrammePage() { return <ConsultationModalProvider><SchoolProgrammeContent /></ConsultationModalProvider>; }
