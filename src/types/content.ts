export type ProgramId = 'school' | 'sat';

export interface Testimonial {
  id: string;
  /** Full display name, or a privacy-safe label if the family prefers not to share a name. */
  displayName: string;
  /** Privacy-safe fallback shown publicly, e.g. "Parent, London". */
  privacyLabel: string;
  city: string;
  country: string;
  program: ProgramId;
  quote: string;
  photoUrl?: string;
  videoUrl?: string;
  sortOrder: number;
  published: boolean;
}

export interface LocationItem {
  id: string;
  country: string;
  /** Display location, usually a city. */
  city: string;
  /** ISO 3166-1 alpha-2 code, used to render the flag emoji. */
  isoCode: string;
  /** Optional uploaded flag image; falls back to the emoji derived from isoCode. */
  flagImageUrl?: string;
  active: boolean;
  sortOrder: number;
  program?: ProgramId;
  /** Optional short family quote shown on the map story card. */
  quote?: string;
  /** Optional attribution for the quote, e.g. "Parent, Singapore". */
  attribution?: string;
  /** Optional short caption shown above the story card quote, e.g. "School Excellence Program". */
  storyLabel?: string;
  /** Approximate position on the abstract dot map, as a percentage (0-100) of the map's width/height. */
  mapPosition: { x: number; y: number };
}

export interface ChallengeItem {
  id: string;
  label: string;
  challengeTitle?: string;
  challengeDescription?: string;
  approach: string[];
  outcomes: string[];
  /** Photo shown under "The Challenge" column. */
  challengeImageFilename?: string;
  /** Photo shown under "Expected Outcome" column. */
  outcomeImageFilename?: string;
  sortOrder: number;
}

export interface ProgramSummary {
  id: ProgramId;
  name: string;
  description: string;
  imageFilename: string;
}

export interface JourneyStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface SuccessTeamMember {
  id: string;
  role: string;
  imageFilename: string;
  points: string[];
}

export interface ConsultationEnquiry {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  country: string;
  program: ProgramId;
  message: string;
  /** ISO timestamp of submission. */
  createdAt: string;
  /** Has the team followed up with this family yet? */
  contacted: boolean;
}
