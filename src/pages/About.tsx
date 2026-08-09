import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutSections } from '@/components/about/AboutSections';
import { AboutCta } from '@/components/about/AboutCta';
import { usePageMetadata } from '@/hooks/usePageMetadata';

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

export default function About() {
  usePageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    canonicalUrl: `${window.location.origin}/about`,
  });


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
