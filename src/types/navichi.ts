import type { LucideIcon } from 'lucide-react';

export interface NavichiNavItem {
  id: string;
  label: string;
}

export interface ComparisonCard {
  title: string;
  subtitle: string;
  items: string[];
  variant: 'traditional' | 'navichi';
}

export interface EcosystemNode {
  title: string;
  description: string;
  side: 'left' | 'right';
}

export interface ProcessStep {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface TitledCopy {
  title: string;
  description: string;
  icon?: LucideIcon;
}

export interface FaqItem {
  question: string;
  answer: string;
}
