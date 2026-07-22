import type { BlogCategory } from '@/types/blog';

/** From the approved blog builder pack's category list (minus the "All" UI filter). */
export const blogCategoriesSeed: BlogCategory[] = [
  { id: 'learning-science', name: 'Learning Science', active: true, sortOrder: 1 },
  { id: 'study-skills', name: 'Study Skills', active: true, sortOrder: 2 },
  { id: 'student-wellbeing', name: 'Student Wellbeing', active: true, sortOrder: 3 },
  { id: 'university-admissions', name: 'University Admissions', active: true, sortOrder: 4 },
  { id: 'sat-insights', name: 'SAT Insights', active: true, sortOrder: 5 },
  { id: 'parent-guide', name: 'Parent Guide', active: true, sortOrder: 6 },
];
