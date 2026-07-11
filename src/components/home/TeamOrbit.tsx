import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Compass, HeartPulse } from 'lucide-react';
import { Photo } from '@/components/ui/Photo';
import type { SuccessTeamMember } from '@/types/content';

const ICONS = [BookOpen, Compass, HeartPulse];
const ORBIT_RADIUS = 158;
const ORBIT_DURATION = 28;

interface TeamOrbitProps {
  members: SuccessTeamMember[];
}

/** A slow-revolving ring of team-role badges around a central mentor+student photo. */
export function TeamOrbit({ members }: TeamOrbitProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto h-[320px] w-[320px] sm:h-[380px] sm:w-[380px]">
      <div
        className="absolute inset-0 m-auto rounded-full border border-dashed border-border-strong"
        style={{ width: ORBIT_RADIUS * 2, height: ORBIT_RADIUS * 2 }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 m-auto h-32 w-32 overflow-hidden rounded-full border-4 border-paper-pure shadow-hover sm:h-36 sm:w-36">
        <Photo
          filename="personal-mentor.jpg"
          alt="A mentor and student in conversation"
          ratioLabel="1:1"
          className="h-full w-full"
        />
      </div>

      <motion.div
        className="absolute inset-0"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: 'linear' }}
      >
        {members.map((member, index) => {
          const Icon = ICONS[index % ICONS.length];
          const angle = (360 / members.length) * index;
          return (
            <div
              key={member.id}
              className="absolute left-1/2 top-1/2 h-14 w-14 sm:h-16 sm:w-16"
              style={{
                transform: `rotate(${angle}deg) translate(${ORBIT_RADIUS}px) rotate(${-angle}deg) translate(-50%, -50%)`,
              }}
            >
              <motion.div
                animate={reduceMotion ? undefined : { rotate: -360 }}
                transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: 'linear' }}
                className="flex h-14 w-14 flex-col items-center justify-center gap-0.5 rounded-full border border-border bg-paper-pure text-navy shadow-soft sm:h-16 sm:w-16"
                title={member.role}
              >
                <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      <span className="sr-only">
        Infimind students are supported by: {members.map((member) => member.role).join(', ')}.
      </span>
    </div>
  );
}
