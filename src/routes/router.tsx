import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import { createBrowserRouter } from 'react-router';
import Verify from '@/pages/auth/Verify';
import AdminLayout from './AdminLayout';
import generateRoutes from '@/utils/generateRoutes';
import { navMenu } from './adminSidebarItem';
import Home from '@/pages/Home';

const router = createBrowserRouter([
  {
    path: '',
    Component: AdminLayout,
    children: [
      {
        path: '',
        Component: Home,
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
]);

export default router;
