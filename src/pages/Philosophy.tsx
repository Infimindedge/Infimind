import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { PhilosophyHero } from '@/components/philosophy/PhilosophyHero';
import { BetterLearningSystems } from '@/components/philosophy/BetterLearningSystems';
import { PhilosophyBeliefs } from '@/components/philosophy/PhilosophyBeliefs';
import { LearningPhilosophyTimeline } from '@/components/philosophy/LearningPhilosophyTimeline';
import { BeyondCoaching } from '@/components/philosophy/BeyondCoaching';
import { ResearchDriven } from '@/components/philosophy/ResearchDriven';
import { PhilosophyPromise } from '@/components/philosophy/PhilosophyPromise';
import { PhilosophyManifesto } from '@/components/philosophy/PhilosophyManifesto';
import { PhilosophyFinalCta } from '@/components/philosophy/PhilosophyFinalCta';
import { usePageMetadata } from '@/hooks/usePageMetadata';

const PAGE_TITLE = 'Our Philosophy | Infimind';
const PAGE_DESCRIPTION =
  'Discover Infimind’s philosophy of personalised learning, meaningful mentorship, parent partnership and learning systems built around the individual student.';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
    { '@type': 'ListItem', position: 2, name: 'Our Philosophy', item: '/philosophy' },
  ],
};

export default function Philosophy() {
  usePageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    canonicalUrl: `${window.location.origin}/philosophy`,
    image: '/assets/philosophy/philosophy-hero.jpg',
  });


  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden">
        <Navbar />
        <main id="main-content" className="flex-1">
          <PhilosophyHero />
          <BetterLearningSystems />
          <PhilosophyBeliefs />
          <LearningPhilosophyTimeline />
          <BeyondCoaching />
          <ResearchDriven />
          <PhilosophyPromise />
          <PhilosophyManifesto />
          <PhilosophyFinalCta />
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </>
  );
}
