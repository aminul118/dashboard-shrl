export type TRole = 'SUPER_ADMIN' | 'ADMIN' | 'USER';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: TRole;
  isDeleted: boolean;
  isActive: 'ACTIVE' | 'INACTIVE';
  isVerified: boolean;
  photo?: string;
  auths: string[];
  createdAt: string;
  updatedAt: string;
}
