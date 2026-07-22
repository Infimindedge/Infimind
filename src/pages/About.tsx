import { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutSections } from '@/components/about/AboutSections';
import { AboutCta } from '@/components/about/AboutCta';

const PAGE_TITLE = 'About Infimind | Infimind';
const PAGE_DESCRIPTION =
  'Infimind believes every child learns differently. Discover how we design personalised learning journeys through mentoring, academic guidance, wellbeing support and learning science.';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
    { '@type': 'ListItem', position: 2, name: 'About', item: '/about' },
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
      { name: 'twitter:card', content: 'summary_large_image' },
    ];

    const created = metaEntries.map((entry) => {
      const element = document.createElement('meta');
      Object.entries(entry).forEach(([key, value]) => element.setAttribute(key, value));
      document.head.appendChild(element);
      return element;
    });

    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = `${window.location.origin}/about`;
    document.head.appendChild(canonical);

    return () => {
      document.title = previousTitle;
      created.forEach((element) => element.remove());
      canonical.remove();
    };
  }, []);
}

export default function About() {
  usePageMetadata();

  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden">
        <Navbar />
        <main id="main-content" className="flex-1">
          <AboutHero />
          <AboutSections />
          <AboutCta />
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </>
  );
}
