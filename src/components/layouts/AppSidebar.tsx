import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '../ui/sidebar';
import { NavMain } from './NavMain';
import { NavUser } from './NavUser';
import { Link } from 'react-router';
import logo from '../../assets/images/logo-white.png';
import { navMenu } from '@/routes/adminSidebarItem';
import SingleMenu from './NavProject';
import { GalleryHorizontal, User2 } from 'lucide-react';

// This is sample data.
const data = {
  projects: [
    {
      name: 'Registered Users',
      url: '/users',
      icon: User2,
    },
    {
      name: 'Scrolling Text',
      url: '/scrolling-texts',
      icon: GalleryHorizontal,
    },
  ],
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link to="/" className="text-center text-sm mt-2">
          <img className="w-20 mx-auto" src={logo} alt="" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMenu} />
        <SingleMenu menus={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
