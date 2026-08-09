import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { ContactForm } from '@/components/contact/ContactForm';
import contactContent from '@/data/contact-content.json';
import { usePageMetadata } from '@/hooks/usePageMetadata';

const PAGE_TITLE = 'Contact Us | Infimind';
const PAGE_DESCRIPTION = "Get in touch with Infimind by phone, email or our enquiry form. Let's start the conversation about your child's learning journey.";

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: '/contact' },
  ],
};

export default function Contact() {
  usePageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    canonicalUrl: `${window.location.origin}/contact`,
  });


  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden">
        <Navbar />
        <main id="main-content" className="flex-1">
          <section className="section-spacing pt-10 md:pt-14">
            <Container width="max">
              <div className="mx-auto max-w-2xl text-center">
                <p className="eyebrow text-gold">{contactContent.title}</p>
                <h1 className="mt-4 text-[clamp(38px,4.6vw,58px)] leading-[1.05] text-ink">{contactContent.hero}</h1>
              </div>

              <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr]">
                <ContactInfo />
                <ContactForm />
              </div>
            </Container>
          </section>
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </>
  );
}
