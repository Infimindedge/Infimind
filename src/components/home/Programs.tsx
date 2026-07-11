import { BookOpen, GraduationCap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Photo } from '@/components/ui/Photo';
import { programsSeed } from '@/data/seed/programs.seed';
import type { ProgramId } from '@/types/content';

const ICONS: Record<ProgramId, typeof BookOpen> = {
  school: BookOpen,
  sat: GraduationCap,
};

const IMAGE_RATIOS: Record<ProgramId, string> = {
  school: '3:2',
  sat: '3:2',
};

const LINKS: Record<ProgramId, string> = {
  school: '/programs/school',
  sat: '/programs/sat',
};

export function Programs() {
  return (
    <section id="programs" className="section-spacing">
      <Container width="max">
        <SectionHeading
          title="Programs Designed Around Every Stage of Growth"
          body="Tailored learning experiences designed to meet students where they are—and help them achieve where they aspire to be."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {programsSeed.map((program) => {
            const Icon = ICONS[program.id];
            return (
              <Link
                key={program.id}
                to={LINKS[program.id]}
                className="group flex h-full flex-col overflow-hidden rounded-container border border-border bg-paper-pure shadow-soft transition-all duration-300 hover:border-gold-soft hover:shadow-hover"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <Photo
                    filename={program.imageFilename}
                    alt={`${program.name} — students learning`}
                    ratioLabel={IMAGE_RATIOS[program.id]}
                    className="transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-paper-soft text-navy">
                      <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-[26px] leading-tight text-ink transition-transform duration-300 group-hover:translate-x-1">
                      {program.name}
                    </h3>
                  </div>
                  <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-soft">{program.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold-dark transition-transform duration-300 group-hover:translate-x-1">
                    Explore {program.name}
                    <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
