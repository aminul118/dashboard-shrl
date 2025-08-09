import {
  Calendar,
  GalleryHorizontal,
  User,
  UserPlus,
  UserStar,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../ui/sidebar";
import { NavMain } from "./NavMain";
import { NavProjects } from "./NavProject";
import { NavUser } from "./NavUser";
import { Link } from "react-router";
import logo from "../../assets/images/logo-white.png";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Events",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "Add Upcoming Event",
          url: "/add-upcoming-event",
        },
        {
          title: "Manage Upcoming Event",
          url: "/manage-upcoming-event",
        },
        {
          title: "Add Event",
          url: "/add-event",
        },
        {
          title: "Manage Event",
          url: "/manage-event",
        },
      ],
    },
    {
      title: "Team Members",
      url: "#",
      icon: User,
      items: [
        {
          title: "Add Team Member",
          url: "/add-team-member",
        },
        {
          title: "Manage Team Member",
          url: "/manage-team-member",
        },
      ],
    },
    {
      title: "Scrolling Text",
      url: "#",
      icon: GalleryHorizontal,
      items: [
        {
          title: "Add Scrolling Text",
          url: "/add-scrolling-text",
        },
        {
          title: "Manage Scrolling Text",
          url: "/manage-scrolling-text",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Add Admin",
      url: "/add-admin",
      icon: UserPlus,
    },
    {
      name: "Manage Admin",
      url: "/manage-admin",
      icon: UserStar,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link to="/" className="text-center text-sm mt-2">
          <img className="w-20 mx-auto" src={logo} alt="" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
