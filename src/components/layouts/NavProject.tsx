import { type LucideIcon } from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link } from 'react-router';

interface NavProjectsProps {
  menus: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
  menuTitle?: string; // optional title
}

const SingleMenu = ({ menus, menuTitle }: NavProjectsProps) => {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden my-0 py-0">
      {menuTitle && <SidebarGroupLabel>{menuTitle}</SidebarGroupLabel>}
      <SidebarMenu>
        {menus.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link to={item.url}>
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default SingleMenu;
