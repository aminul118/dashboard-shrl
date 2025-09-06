import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import { createBrowserRouter } from 'react-router';
import Verify from '@/pages/auth/Verify';
import generateRoutes from '@/utils/generateRoutes';
import { navMenu } from './adminSidebarItem';
import Home from '@/pages/Home';
import Unauthorized from '@/pages/Unauthorized';
import { withAuth } from '@/utils/withAuth';
import { role } from '@/constants/role';
import type { TRole } from '@/types';
import Layout from '@/components/layouts/Layout';
import Profile from '@/pages/auth/Profile';
import NotFound from '@/pages/NotFound';
import AddTeamMember from '@/pages/Team/AddTeamMember';
import AddUpcomingEvent from '@/pages/Event/AddUpcomingEvent';
import AddEvent from '@/pages/Event/AddEvent';
import Users from '@/pages/Users';

const router = createBrowserRouter([
  {
    path: '',
    Component: withAuth(Layout, (role.admin as TRole) || (role.superAdmin as TRole)),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'profile',
        Component: Profile,
      },
      {
        path: '/add-team-member',
        Component: AddTeamMember,
      },
      {
        path: '/add-event',
        Component: AddEvent,
      },
      {
        path: '/users',
        Component: Users,
      },
      {
        path: '/add-upcoming-event',
        Component: AddUpcomingEvent,
      },
      ...generateRoutes(navMenu),
    ],
  },
  {
    path: 'login',
    Component: Login,
  },
  {
    path: 'register',
    Component: Register,
  },
  {
    path: 'verify',
    Component: Verify,
  },
  {
    path: 'unauthorized',
    Component: Unauthorized,
  },
]);

export default router;
