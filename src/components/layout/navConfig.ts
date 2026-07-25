export interface NavLinkItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href?: string;
  dropdown?: NavLinkItem[];
}

/**
 * Centre nav structure. Programmes/Resources are dropdowns; the other items
 * link to future Phase 2 routes (currently resolve to the 404 page) so the
 * information architecture doesn't need to change when those pages ship.
 */
export const navItems: NavItem[] = [
  {
    label: 'Programmes',
    dropdown: [
      { label: 'School Programme', href: '/programs/school' },
      { label: 'SAT Programme', href: '/navichi' },
    ],
  },
  { label: 'Our Philosophy', href: '/philosophy' },
  {
    label: 'Resources',
    dropdown: [{ label: 'Blogs', href: '/blog' }],
  },
  { label: 'About Us', href: '/about' },
];
