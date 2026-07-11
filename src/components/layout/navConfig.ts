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
 * Centre nav structure. Programs/Resources are dropdowns; the other items
 * link to future Phase 2 routes (currently resolve to the 404 page) so the
 * information architecture doesn't need to change when those pages ship.
 */
export const navItems: NavItem[] = [
  {
    label: 'Programs',
    dropdown: [
      { label: 'School Program', href: '/programs/school' },
      { label: 'SAT Program', href: '/programs/sat' },
    ],
  },
  { label: 'Our Philosophy', href: '/philosophy' },
  { label: 'Success Stories', href: '/success-stories' },
  {
    label: 'Resources',
    dropdown: [
      { label: 'Blog', href: '/resources/blog' },
      { label: 'Guides', href: '/resources/guides' },
    ],
  },
  { label: 'About Us', href: '/about' },
];
