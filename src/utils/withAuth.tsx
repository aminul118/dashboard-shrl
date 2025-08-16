import { useUserInfoQuery } from '@/redux/features/auth/auth.api';
import type { TRole } from '@/types';
import { Navigate } from 'react-router';

export const withAuth = (Component: React.ComponentType, allowedRoles?: TRole[]) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);
    const user = data?.data;

    if (!isLoading && !user?.email) return <Navigate to="/login" />;

    if (!isLoading && allowedRoles && !allowedRoles.includes(user?.role as TRole)) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};
