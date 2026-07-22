import { useEffect } from 'react';
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

function usePageMetadata() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;

    const metaEntries = [
      { name: 'description', content: PAGE_DESCRIPTION },
      { property: 'og:title', content: PAGE_TITLE },
      { property: 'og:description', content: PAGE_DESCRIPTION },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: '/assets/philosophy/philosophy-hero.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: PAGE_TITLE },
      { name: 'twitter:description', content: PAGE_DESCRIPTION },
    ];

    const created = metaEntries.map((entry) => {
      const element = document.createElement('meta');
      Object.entries(entry).forEach(([key, value]) => element.setAttribute(key, value));
      document.head.appendChild(element);
      return element;
    });

    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = `${window.location.origin}/philosophy`;
    document.head.appendChild(canonical);

    return () => {
      document.title = previousTitle;
      created.forEach((element) => element.remove());
      canonical.remove();
    };
  }, []);
}

export default function Philosophy() {
  usePageMetadata();

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
