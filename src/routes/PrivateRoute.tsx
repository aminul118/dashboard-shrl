import { useUserInfoQuery } from '@/redux/features/auth/auth.api';
import type { IChildren } from '@/types';
import { Navigate } from 'react-router';
import PrivateRouteSkeleton from '../components/skeleton/PrivateRouteSkeleton';

interface PrivateRouteProps extends IChildren {
  allowedRoles?: string[];
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { data, isLoading } = useUserInfoQuery(undefined);

  if (isLoading) {
    return <PrivateRouteSkeleton />;
  }

  const user = data?.data;

  // not logged in
  if (!user?.email) {
    return <Navigate to="/login" replace />;
  }

  // role not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
