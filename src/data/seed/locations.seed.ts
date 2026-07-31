import type { LocationItem } from '@/types/content';

/**
 * Homepage locations paired with short, location-matched excerpts from the
 * parent testimonials supplied for publication.
 */
export const locationsSeed: LocationItem[] = [
  {
    id: 'loc-london', country: 'United Kingdom', city: 'London', isoCode: 'GB',
    active: true, sortOrder: 1, program: 'school', mapPosition: { x: 50, y: 21 },
    storyLabel: 'Parent voice',
    quote: 'Our daughter actually began enjoying learning again. The mentors took time to understand how she learns.',
    attribution: 'Emily Johnson, Parent',
  },
  {
    id: 'loc-dubai', country: 'United Arab Emirates', city: 'Dubai', isoCode: 'AE',
    active: true, sortOrder: 2, program: 'school', mapPosition: { x: 65, y: 36 },
    storyLabel: 'Parent voice',
    quote: 'The mentors genuinely cared, and the regular progress reports gave us complete confidence in the journey.',
    attribution: 'Priya Mehta, Parent',
  },
  {
    id: 'loc-toronto', country: 'Canada', city: 'Toronto', isoCode: 'CA',
    active: true, sortOrder: 3, program: 'school', mapPosition: { x: 28, y: 26 },
    storyLabel: 'Parent voice',
    quote: 'The level of professionalism is outstanding. Scheduling is seamless, communication is prompt, and every mentor has been patient and knowledgeable.',
    attribution: 'Michael Carter, Parent',
  },
  {
    id: 'loc-singapore', country: 'Singapore', city: 'Singapore', isoCode: 'SG',
    active: true, sortOrder: 4, program: 'school', mapPosition: { x: 79, y: 49 },
    storyLabel: 'Parent voice',
    quote: 'The communication was excellent, lessons were extremely well planned, and our son became much more confident.',
    attribution: 'David Thompson, Parent',
  },
  {
    id: 'loc-melbourne', country: 'Australia', city: 'Melbourne', isoCode: 'AU',
    active: true, sortOrder: 5, program: 'school', mapPosition: { x: 90, y: 71 },
    storyLabel: 'Parent voice',
    quote: 'The sessions are engaging, structured, and surprisingly enjoyable. His confidence has improved just as much as his grades.',
    attribution: 'Sarah Williams, Parent',
  },
  {
    id: 'loc-new-delhi', country: 'India', city: 'New Delhi', isoCode: 'IN',
    active: true, sortOrder: 6, program: 'school', mapPosition: { x: 70, y: 39 },
    storyLabel: 'Parent voice',
    quote: 'Today she approaches exams much more calmly because she understands concepts instead of memorising them.',
    attribution: 'Anjali Kapoor, Parent',
  },
  {
    id: 'loc-doha', country: 'Qatar', city: 'Doha', isoCode: 'QA',
    active: true, sortOrder: 7, program: 'school', mapPosition: { x: 64, y: 36 },
    storyLabel: 'Parent voice',
    quote: 'Every lesson feels tailored to my son’s strengths and weaknesses. He now studies independently.',
    attribution: 'Omar Hassan, Parent',
  },
  {
    id: 'loc-california', country: 'United States', city: 'California', isoCode: 'US',
    active: true, sortOrder: 8, program: 'school', mapPosition: { x: 16, y: 34 },
    storyLabel: 'Parent voice',
    quote: 'She now manages her schoolwork independently and has developed much stronger study habits.',
    attribution: 'Jennifer Collins, Parent',
  },
];
