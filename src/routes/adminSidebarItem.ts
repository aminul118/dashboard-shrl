import AddEvent from '@/pages/Event/AddEvent';
import ManageEvent from '@/pages/Event/ManageEvent';
import ManageUpcomingEvent from '@/pages/Event/ManageUpcomingEvent';
import ManageScrollingText from '@/pages/ScrollingText/ManageScrollingText';
import ManageTeamMember from '@/pages/Team/ManageTeamMember';
import TeamJoinRequest from '@/pages/Team/TeamJoinRequest';
import type { INavMenu } from '@/types';

import { Calendar, GalleryHorizontal, User } from 'lucide-react';

export const navMenu: INavMenu[] = [
  {
    title: 'Events',
    url: '#',
    icon: Calendar,
    items: [
      {
        title: 'Upcoming Event',
        url: '/upcoming-event',
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
    title: 'Team',
    url: '#',
    icon: User,
    items: [
      {
        title: 'Team Members',
        url: '/team-members',
        Component: ManageTeamMember,
      },
      {
        title: 'Join Requests',
        url: '/team-join-request',
        Component: TeamJoinRequest,
      },
    ],
  },
  {
    title: 'Scrolling Text',
    url: '#',
    icon: GalleryHorizontal,
    items: [
      {
        title: 'Manage Scrolling Text',
        url: '/manage-scrolling-text',
        Component: ManageScrollingText,
      },
    ],
  },
];
