import { useEffect } from 'react';
import { Mail } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import careersContent from '@/data/careers-content.json';

const PAGE_TITLE = 'Careers | Infimind';
const PAGE_DESCRIPTION = 'Help shape the future of education with Infimind. There are currently no open positions, but we welcome thoughtful educators to reach out.';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
    { '@type': 'ListItem', position: 2, name: 'Careers', item: '/careers' },
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
    canonical.href = `${window.location.origin}/careers`;
    document.head.appendChild(canonical);

    return () => {
      document.title = previousTitle;
      created.forEach((element) => element.remove());
      canonical.remove();
    };
  }, []);
}

export default function Careers() {
  usePageMetadata();

  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden">
        <Navbar />
        <main id="main-content" className="flex-1">
          <section className="section-spacing pt-10 md:pt-14">
            <Container width="content">
              <div className="mx-auto max-w-2xl text-center">
                <p className="eyebrow text-gold">{careersContent.title}</p>
                <h1 className="mt-4 text-[clamp(38px,4.6vw,58px)] leading-[1.05] text-ink">{careersContent.hero}</h1>

                <div className="mt-10 rounded-container border border-dashed border-border-strong bg-paper-soft p-8">
                  <p className="text-base font-medium text-ink">{careersContent.status}</p>
                </div>

                <p className="mt-8 text-[15px] leading-relaxed text-ink-soft">{careersContent.body}</p>

                <a
                  href="mailto:info@infimind.co.in"
                  className="mt-8 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-btn bg-navy px-6 py-3.5 text-sm font-medium text-on-dark shadow-soft transition-shadow hover:shadow-hover"
                >
                  <Mail size={16} aria-hidden="true" />
                  Email Us Your Introduction
                </a>
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
