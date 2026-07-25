import { useEffect, useId, useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import flags from 'react-phone-number-input/flags';
import type { Country } from 'react-phone-number-input';
import {
  ArrowRight,
  BookOpenCheck,
  CalendarCheck,
  Check,
  ChevronDown,
  CircleX,
  ClipboardCheck,
  ExternalLink,
  FileText,
  Info,
  MessagesSquare,
  Plus,
  Target,
  UserRoundCheck,
  type LucideIcon,
} from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { NavichiImage } from '@/components/navichi/NavichiImage';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { WhatsAppButton, WHATSAPP_URL } from '@/components/ui/WhatsAppButton';
import { ConsultationModalProvider } from '@/context/ConsultationModalContext';
import { getActiveLocations, locationRepository, LOCATIONS_STORAGE_KEY } from '@/data/repositories/locationRepository';
import { useConsultationModal } from '@/hooks/useConsultationModal';
import {
  comparisonCards,
  deepenSteps,
  differenceTiles,
  ecosystemNodes,
  faqs,
  journeySteps,
  navichiNavItems,
  outcomes,
  parentItems,
  portalPoints,
  researchNotes,
  scienceCards,
  scientificDisclaimer,
  structuredData,
  weeklySteps,
} from '@/data/navichi';
import { useCollection } from '@/hooks/useCollection';
import type { LocationItem } from '@/types/content';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

function CountryChip({ location }: { location: LocationItem }) {
  const Flag = flags[location.isoCode.toUpperCase() as Country];

  return (
    <span className="navichi-country-chip" title={`${location.city}, ${location.country}`}>
      <span className="navichi-country-chip__flag">
        {location.flagImageUrl ? (
          <img src={location.flagImageUrl} alt="" />
        ) : Flag ? (
          <Flag title={`${location.country} flag`} />
        ) : (
          <span aria-hidden="true">🌐</span>
        )}
      </span>
      <span className="sr-only">{location.country}</span>
    </span>
  );
}

function usePageMetadata() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Navichi by Infimind | The Personalised SAT Navigator';

    const metaEntries = [
      {
        name: 'description',
        content:
          "Navichi is Infimind's one-to-one personalised SAT preparation system, combining diagnostic analysis, learning science, adaptive practice, continuous mentoring and progress intelligence.",
      },
      { property: 'og:title', content: 'Navichi by Infimind | The Personalised SAT Navigator' },
      {
        property: 'og:description',
        content:
          "Infimind's one-to-one personalised SAT preparation system for diagnostic analysis, adaptive practice and progress intelligence.",
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Navichi by Infimind | The Personalised SAT Navigator' },
    ];

    const created = metaEntries.map((entry) => {
      const element = document.createElement('meta');
      Object.entries(entry).forEach(([key, value]) => element.setAttribute(key, value));
      document.head.appendChild(element);
      return element;
    });

    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = `${window.location.origin}/navichi`;
    document.head.appendChild(canonical);

    return () => {
      document.title = previousTitle;
      created.forEach((element) => element.remove());
      canonical.remove();
    };
  }, []);
}

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  children,
  align = 'center',
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  align?: 'center' | 'left';
}) {
  return (
    <div className={align === 'center' ? 'navichi-section-intro' : 'navichi-section-intro navichi-section-intro--left'}>
      {eyebrow ? <p className="eyebrow text-gold">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {children ? <div className="navichi-section-intro__body">{children}</div> : null}
    </div>
  );
}

function NavichiHero() {
  const reduceMotion = useReducedMotion();
  const { openConsultation } = useConsultationModal();
  const [showAllCountries, setShowAllCountries] = useState(false);
  useCollection(locationRepository, LOCATIONS_STORAGE_KEY);
  const activeLocations = getActiveLocations();
  const visibleLocations = activeLocations.slice(0, 7);
  const hiddenLocations = activeLocations.slice(7);
  const copyVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
  };

  return (
    <section id="navichi-overview" className="navichi-hero" aria-labelledby="navichi-title">
      <header className="navichi-topbar" aria-label="Navichi page navigation">
        <a href="/" className="navichi-topbar__infimind" aria-label="Infimind home">
          <img src="/assets/brand/infimind-logo.jpg" alt="" />
        </a>
        <nav className="navichi-topbar__links" aria-label="Navichi sections">
          {navichiNavItems.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#navichi-overview" className="navichi-topbar__brand" aria-label="Back to Navichi top">
          <img src="/assets/navichi/navichi-logo.png" alt="Navichi" />
        </a>
      </header>
      <Container width="max" className="navichi-hero__inner">
        <motion.div variants={copyVariants} initial="hidden" animate="visible" className="navichi-hero__copy">
          <motion.p variants={itemVariants} className="eyebrow text-gold">
            NAVICHI
          </motion.p>
          <motion.h1 id="navichi-title" variants={itemVariants} aria-label="The Personalised SAT Navigator.">
            <span aria-hidden="true">The Personalised</span>
            {' '}
            <span aria-hidden="true">SAT Navigator.</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="navichi-hero__line">
            SAT Preparation, Engineered Around You.
          </motion.p>
          <motion.p variants={itemVariants} className="navichi-hero__body">
            Navichi is a one-to-one, personalised SAT programme built around how each student learns, thinks and
            performs. We do not follow a syllabus. We build a system around the student.
          </motion.p>
          <motion.div variants={itemVariants} className="navichi-hero__actions">
            <Button href="#navichi-method" icon={<ArrowRight size={16} aria-hidden="true" />}>
              Explore Navichi
            </Button>
            <button type="button" onClick={openConsultation} className="navichi-button-secondary">
              Begin Your Diagnostic
            </button>
          </motion.div>
          <motion.div variants={itemVariants} className="navichi-hero__trust" aria-label="Trusted presence">
            <span>
              Trusted by ambitious families in <strong>12+ Countries Worldwide</strong>
            </span>
            <span className="navichi-flag-strip" aria-label="Active Infimind countries">
              {visibleLocations.map((location) => (
                <CountryChip key={location.id} location={location} />
              ))}
              {hiddenLocations.length ? (
                <span className="navichi-country-more">
                  <button
                    type="button"
                    className="navichi-country-more__button"
                    aria-expanded={showAllCountries}
                    aria-controls="navichi-extra-countries"
                    onClick={() => setShowAllCountries((current) => !current)}
                  >
                    <Plus size={12} aria-hidden="true" />
                    <span className="sr-only">Show more countries</span>
                  </button>
                  {showAllCountries ? (
                    <span id="navichi-extra-countries" className="navichi-country-more__panel">
                      {hiddenLocations.map((location) => (
                        <CountryChip key={location.id} location={location} />
                      ))}
                    </span>
                  ) : null}
                </span>
              ) : null}
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.015 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
          className="navichi-hero__visual"
        >
          <NavichiImage
            filename="navichi-hero.jpg"
            alt="Student working through SAT preparation with a laptop and books"
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>
      </Container>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section id="traditional-vs-navichi" className="navichi-section navichi-section--tight" aria-labelledby="compare-title">
      <Container>
        <Reveal>
          <SectionIntro title="Why Most SAT Programmes Stop Too Soon" />
        </Reveal>
        <div className="navichi-compare-stage">
          <Reveal className="navichi-compare-orbit navichi-compare-orbit--left">
            <div className="navichi-compare-orbit__ring" aria-hidden="true">
              <BookOpenCheck size={44} strokeWidth={1.65} />
            </div>
          </Reveal>
          <div className="navichi-compare">
            {comparisonCards.map((card, index) => (
              <Reveal key={card.title} className="navichi-compare__card-wrap">
                <article className={`navichi-compare__card navichi-compare__card--${card.variant}`}>
                  <p>{card.title}</p>
                  <h3>{card.subtitle}</h3>
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>
                        {card.variant === 'navichi' ? (
                          <Check size={15} aria-hidden="true" />
                        ) : (
                          <CircleX size={15} aria-hidden="true" />
                        )}
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
                {index === 0 ? <div className="navichi-vs" aria-label="Versus">VS</div> : null}
              </Reveal>
            ))}
          </div>
          <Reveal className="navichi-compare-orbit navichi-compare-orbit--right">
            <div className="navichi-compare-orbit__ring" aria-hidden="true">
              <UserRoundCheck size={44} strokeWidth={1.65} />
            </div>
          </Reveal>
        </div>
        <p className="navichi-closing-line">
          We do not place students into a programme. We build the programme around the student.
        </p>
      </Container>
    </section>
  );
}

function EcosystemSection() {
  return (
    <section id="navichi-ecosystem" className="navichi-section" aria-labelledby="ecosystem-title">
      <Container>
        <Reveal>
          <SectionIntro title="Meet Navichi">
            <p>A complete ecosystem working together for one outcome - your success.</p>
          </SectionIntro>
        </Reveal>
        <div className="navichi-ecosystem">
          <div className="navichi-ecosystem__column navichi-ecosystem__column--left">
            {ecosystemNodes
              .filter((node) => node.side === 'left')
              .map((node) => (
                <EcosystemNodeItem key={node.title} node={node} />
              ))}
          </div>
          <div className="navichi-ecosystem__core" aria-label="Navichi ecosystem centre">
            <div className="navichi-ecosystem__connectors" aria-hidden="true">
              <span className="navichi-ecosystem__connector navichi-ecosystem__connector--left-top" />
              <span className="navichi-ecosystem__connector navichi-ecosystem__connector--left-mid" />
              <span className="navichi-ecosystem__connector navichi-ecosystem__connector--left-bottom" />
              <span className="navichi-ecosystem__connector navichi-ecosystem__connector--right-top" />
              <span className="navichi-ecosystem__connector navichi-ecosystem__connector--right-mid" />
              <span className="navichi-ecosystem__connector navichi-ecosystem__connector--right-bottom" />
            </div>
            <div className="navichi-compass">
              <img src="/assets/navichi/navichi-logo.png" alt="Navichi" />
            </div>
          </div>
          <div className="navichi-ecosystem__column navichi-ecosystem__column--right">
            {ecosystemNodes
              .filter((node) => node.side === 'right')
              .map((node) => (
                <EcosystemNodeItem key={node.title} node={node} />
              ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

const ecosystemIcons: Record<string, LucideIcon> = {
  'Personal Mentor': UserRoundCheck,
  'Academic Counsellor': Target,
  'Learning Intelligence Portal': FileText,
  'Personalised Question Engineering': ClipboardCheck,
  'Weekly Reviews': CalendarCheck,
  'Continuous Support': MessagesSquare,
};

function EcosystemNodeItem({ node }: { node: (typeof ecosystemNodes)[number] }) {
  const Icon = ecosystemIcons[node.title] ?? Target;

  return (
    <article className="navichi-node">
      <span aria-hidden="true">
        <Icon size={22} />
      </span>
      <strong>{node.title}</strong>
      <small>{node.description}</small>
    </article>
  );
}

function DeepenSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="navichi-method" className="navichi-section navichi-section--soft" aria-labelledby="deepen-title">
      <Container>
        <Reveal>
          <SectionIntro title="The DEEPEN™ Framework">
            <p>Our proprietary framework that powers every Navichi journey.</p>
          </SectionIntro>
        </Reveal>
        <div className="navichi-process navichi-process--deepen" aria-label="DEEPEN framework steps">
          {deepenSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <button
                type="button"
                key={step.title}
                aria-expanded={activeStep === index}
                onClick={() => setActiveStep(index)}
                onFocus={() => setActiveStep(index)}
                className={activeStep === index ? 'navichi-step navichi-step--active' : 'navichi-step'}
              >
                <span className="navichi-step__icon">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <strong>{step.title}</strong>
                <small>{step.description}</small>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function DifferenceSection() {
  return (
    <section id="navichi-difference" className="navichi-section navichi-section--tight" aria-labelledby="difference-title">
      <Container>
        <Reveal>
          <SectionIntro title="What Makes Navichi Different?" />
        </Reveal>
        <div className="navichi-tile-grid">
          {differenceTiles.map((tile) => {
            const Icon = tile.icon!;
            return (
              <Reveal key={tile.title}>
                <article className="navichi-tile">
                  <Icon size={24} aria-hidden="true" />
                  <h3>{tile.title}</h3>
                  <p>{tile.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function WeeklyEvolutionSection() {
  return (
    <section id="weekly-evolution" className="navichi-section navichi-section--split" aria-labelledby="weekly-title">
      <Container>
        <div className="navichi-weekly">
          <Reveal>
            <SectionIntro title="Every Week Evolves" align="left">
              <p>
                We do not follow a fixed plan.
                <br />
                We build, review, adapt
                <br />
                and improve - every week.
              </p>
            </SectionIntro>
          </Reveal>
          <div className="navichi-flow" role="list" aria-label="Weekly evolution sequence">
            {weeklySteps.map((step) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title}>
                  <article className="navichi-flow__item" role="listitem">
                    <span>
                      <Icon size={24} aria-hidden="true" />
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function StudentJourneySection() {
  return (
    <section id="student-journey" className="navichi-section navichi-section--tight" aria-labelledby="journey-title">
      <Container>
        <Reveal>
          <SectionIntro title="The Navichi Student Journey" />
        </Reveal>
        <div className="navichi-ribbon" role="list" aria-label="Navichi student journey">
          {journeySteps.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="navichi-ribbon__item" role="listitem">
                <span>
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function LearningScienceSection() {
  const [open, setOpen] = useState(false);

  return (
    <section id="learning-science" className="navichi-section navichi-section--science" aria-labelledby="science-title">
      <Container>
        <div className="navichi-science">
          <Reveal>
            <div className="navichi-science__intro">
              <p className="eyebrow text-gold">Built on Learning Science</p>
              <h2 id="science-title">Built on Learning Science</h2>
              <p>
                Navichi applies established principles from cognitive science, educational psychology and instructional
                design to the specific demands of SAT preparation.
              </p>
              <button type="button" className="navichi-dark-button" onClick={() => setOpen((current) => !current)}>
                Explore the Science
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </Reveal>
          <div className="navichi-science__cards">
            {scienceCards.map((card) => {
              const Icon = card.icon!;
              return (
                <Reveal key={card.title}>
                  <article className="navichi-science-card">
                    <Icon size={22} aria-hidden="true" />
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
        {open ? (
          <div className="navichi-research" role="region" aria-label="Learning science research notes">
            <div>
              <h3>Grounded in the Science of Learning</h3>
              <p>
                Infimind's SAT methodology draws on established research in cognitive science, educational psychology
                and instructional design. These principles inform how we schedule revision, select questions, review
                rough work, analyse mistakes and adjust each student's learning plan.
              </p>
            </div>
            <ul>
              {researchNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            <p className="navichi-disclaimer">
              <Info size={16} aria-hidden="true" />
              {scientificDisclaimer}
            </p>
          </div>
        ) : null}
      </Container>
    </section>
  );
}

function PortalSection() {
  return (
    <section id="learning-intelligence-portal" className="navichi-section" aria-labelledby="portal-title">
      <Container>
        <div className="navichi-portal">
          <Reveal>
            <div className="navichi-portal__copy">
              <p className="eyebrow text-gold">The Learning Intelligence Portal</p>
              <h2 id="portal-title">The Learning Intelligence Portal</h2>
              <p className="navichi-lead">Real-time insight beyond marks. We track what matters most.</p>
              <p>Scores tell us what happened. Navichi helps explain why - and what should happen next.</p>
              <ul>
                {portalPoints.map((point) => (
                  <li key={point.title}>
                    <Check size={16} aria-hidden="true" />
                    <span>
                      <strong>{point.title}</strong>
                      {point.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal>
            <div className="navichi-portal__visual">
              <NavichiImage filename="navichi-portal.png" alt="Navichi Learning Intelligence Portal dashboard preview" />
              <span className="navichi-hotspot navichi-hotspot--one">Performance</span>
              <span className="navichi-hotspot navichi-hotspot--two">Behaviour</span>
              <span className="navichi-hotspot navichi-hotspot--three">Progress</span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function ParentPartnershipSection() {
  return (
    <section id="parent-partnership" className="navichi-section navichi-section--tight" aria-labelledby="parent-title">
      <Container>
        <div className="navichi-parent">
          <Reveal>
            <SectionIntro title="Partnering with Parents, Every Step" align="left">
              <p>Because your child's journey is our shared mission.</p>
            </SectionIntro>
          </Reveal>
          <div className="navichi-parent__items">
            {parentItems.map((item) => {
              const Icon = item.icon!;
              return (
                <article key={item.title} className="navichi-parent-card">
                  <Icon size={24} aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function OutcomesSection() {
  return (
    <section id="outcomes" className="navichi-section navichi-section--soft" aria-labelledby="outcomes-title">
      <Container>
        <Reveal>
          <SectionIntro title="Your SAT Score Is the Outcome. Your Learning System Is What Produces It.">
            <p>
              Navichi develops the academic mastery, strategic efficiency, confidence and independence that make
              reliable performance possible.
            </p>
          </SectionIntro>
        </Reveal>
        <div className="navichi-outcomes">
          {outcomes.map((outcome) => (
            <article key={outcome.title}>
              <h3>{outcome.title}</h3>
              <p>{outcome.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="navichi-section" aria-labelledby="faq-title">
      <Container>
        <Reveal>
          <SectionIntro title="FAQ" />
        </Reveal>
        <div className="navichi-faq">
          {faqs.map((faq) => (
            <FaqDisclosure key={faq.question} item={faq} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function FaqDisclosure({ item }: { item: (typeof faqs)[number] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="navichi-faq__item">
      <button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((current) => !current)}>
        <span>{item.question}</span>
        <ChevronDown size={18} aria-hidden="true" />
      </button>
      {open ? (
        <div id={panelId} className="navichi-faq__panel">
          <p>{item.answer}</p>
        </div>
      ) : null}
    </div>
  );
}

function FinalCtaSection() {
  const { openConsultation } = useConsultationModal();

  return (
    <section id="begin-diagnostic" className="navichi-final-cta" aria-labelledby="diagnostic-title">
      <Container width="max">
        <div className="navichi-final-cta__inner">
          <div>
            <h2 id="diagnostic-title">Ready to Build Your Child's SAT Journey?</h2>
            <p>The first step is understanding how the student currently learns, reasons and performs.</p>
            <div className="navichi-final-cta__actions">
              <button type="button" onClick={openConsultation} className="navichi-gold-button">
                Begin Your Diagnostic
                <ArrowRight size={16} aria-hidden="true" />
              </button>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="navichi-cta-link">
                Speak With the Infimind Team
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
          <NavichiImage
            filename="navichi-cta-student.jpg"
            alt="Student ready to begin a personalised SAT journey"
            className="navichi-final-cta__image"
          />
        </div>
      </Container>
    </section>
  );
}

function NavichiPageContent() {
  usePageMetadata();

  return (
    <div className="navichi-page flex min-h-screen flex-col overflow-x-hidden">
      <main id="main-content" className="flex-1">
        <NavichiHero />
        <ComparisonSection />
        <EcosystemSection />
        <DeepenSection />
        <DifferenceSection />
        <WeeklyEvolutionSection />
        <StudentJourneySection />
        <LearningScienceSection />
        <PortalSection />
        <ParentPartnershipSection />
        <OutcomesSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </div>
  );
}

export default function NavichiPage() {
  return (
    <ConsultationModalProvider>
      <NavichiPageContent />
      <WhatsAppButton />
    </ConsultationModalProvider>
  );
}
