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

export default function Home() {
  return (
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
  );
}
