import AddEvent from '@/pages/Event/AddEvent';
import AddUpcomingEvent from '@/pages/Event/AddUpcomingEvent';
import ManageEvent from '@/pages/Event/ManageEvent';
import ManageUpcomingEvent from '@/pages/Event/ManageUpcomingEvent';
import AddScrollingText from '@/pages/ScrollingText/AddScrollingText';
import ManageScrollingText from '@/pages/ScrollingText/ManageScrollingText';
import AddTeamMember from '@/pages/Team/AddTeamMember';
import ManageTeamMember from '@/pages/Team/ManageTeamMember';
import type { INavMenu } from '@/types';
import { Calendar, GalleryHorizontal, User, UserStar } from 'lucide-react';

export const navMenu: INavMenu[] = [
  {
    title: 'Events',
    url: '#',
    icon: Calendar,
    items: [
      {
        title: 'Add Upcoming Event',
        url: '/add-upcoming-event',
        Component: AddUpcomingEvent,
      },
      {
        title: 'Manage Upcoming Event',
        url: '/manage-upcoming-event',
        Component: ManageUpcomingEvent,
      },
      {
        title: 'Add Event',
        url: '/add-event',
        Component: AddEvent,
      },
      {
        title: 'Manage Event',
        url: '/manage-event',
        Component: ManageEvent,
      },
    ],
  },
  {
    title: 'Team Members',
    url: '#',
    icon: User,
    items: [
      {
        title: 'Add Team Member',
        url: '/add-team-member',
        Component: AddTeamMember,
      },
      {
        title: 'Manage Team Member',
        url: '/manage-team-member',
        Component: ManageTeamMember,
      },
    ],
  },
  {
    title: 'Scrolling Text',
    url: '#',
    icon: GalleryHorizontal,
    items: [
      {
        title: 'Add Scrolling Text',
        url: '/add-scrolling-text',
        Component: AddScrollingText,
      },
      {
        title: 'Manage Scrolling Text',
        url: '/manage-scrolling-text',
        Component: ManageScrollingText,
      },
    ],
  },
];

const adminSidebarItem = {
  navMenu,
  projects: [
    {
      name: 'Manage User',
      url: '/manage-user',
      icon: UserStar,
    },
  ],
};

export default adminSidebarItem;
