import type { LucideIcon } from 'lucide-react';
import type { ComponentType } from 'react';

export type { IChildren } from './react.type';
export type { TRole, IUser } from './auth.type';

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface INavMenu {
  title: string;
  url: string;
  icon: LucideIcon;
  items: { title: string; url: string; Component: ComponentType }[];
}
