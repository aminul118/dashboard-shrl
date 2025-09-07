import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import { createBrowserRouter } from 'react-router';
import Verify from '@/pages/auth/Verify';
import generateRoutes from '@/utils/generateRoutes';
import { navMenu } from './adminSidebarItem';
import Home from '@/pages/Home';
import Unauthorized from '@/pages/Unauthorized';
import { role } from '@/constants/role';
import Layout from '@/components/layouts/Layout';
import Profile from '@/pages/auth/Profile';
import NotFound from '@/pages/NotFound';
import AddTeamMember from '@/pages/Team/AddTeamMember';
import AddUpcomingEvent from '@/pages/Event/AddUpcomingEvent';
import AddEvent from '@/pages/Event/AddEvent';
import Users from '@/pages/Users';
import ScrollingText from '@/pages/ScrollingText/ScrollingText';
import AiTrainings from '@/pages/ai/AiTrainings';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '',
    element: (
      <PrivateRoute allowedRoles={[role.admin, role.superAdmin]}>
        <Layout />
      </PrivateRoute>
    ),
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
      {
        path: '/scrolling-texts',
        Component: ScrollingText,
      },
      {
        path: '/ai-training',
        Component: AiTrainings,
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
