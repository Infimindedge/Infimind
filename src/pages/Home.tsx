import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { GlobalPresence } from '@/components/home/GlobalPresence';
import { Programs } from '@/components/home/Programs';
import { Challenges } from '@/components/home/Challenges';
import { SuccessTeam } from '@/components/home/SuccessTeam';
import { Testimonials } from '@/components/home/Testimonials';
import { LearningJourney } from '@/components/home/LearningJourney';
import { FinalCta } from '@/components/home/FinalCta';
import { ConsultationModalProvider } from '@/context/ConsultationModalContext';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { usePageMetadata } from '@/hooks/usePageMetadata';

const PAGE_TITLE = 'Infimind | Private Learning Programs for Ambitious Students';
const PAGE_DESCRIPTION =
  'Infimind partners with ambitious families through personalised school and SAT learning programs, mentorship and structured student support.';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Infimind',
  url: 'https://infimind.co.in/',
  logo: '/assets/brand/infimind-logo.jpg',
  description: PAGE_DESCRIPTION,
};

export default function Home() {
  usePageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    structuredData,
  });

  return (
    <ConsultationModalProvider>
      <div className="flex min-h-screen flex-col overflow-x-hidden">
        <Navbar />
        <main id="main-content" className="flex-1">
          <Hero />
          <GlobalPresence />
          <Programs />
          <Challenges />
          <SuccessTeam />
          <Testimonials />
          <LearningJourney />
          <FinalCta />
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
    </ConsultationModalProvider>
  );
}
