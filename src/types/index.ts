import type { LucideIcon } from 'lucide-react';
import type { ComponentType } from 'react';

export type { IChildren } from './react.type';

export interface INavMenu {
  title: string;
  url: string;
  icon: LucideIcon;
  items: { title: string; url: string; Component: ComponentType }[];
}
