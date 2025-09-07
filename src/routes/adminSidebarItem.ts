import ManageTeamMember from '@/pages/Team/ManageTeamMember';
import TeamJoinRequest from '@/pages/Team/TeamJoinRequest';
import type { INavMenu } from '@/types';

import { Calendar, User } from 'lucide-react';
import PreviousEvents from '@/pages/Event/PreviousEvents';
import UpcomingEvents from '@/pages/Event/UpcomingEvents';

export const navMenu: INavMenu[] = [
  {
    title: 'Events',
    url: '#',
    icon: Calendar,
    items: [
      {
        title: 'Upcoming Events',
        url: '/upcoming-events',
        Component: UpcomingEvents,
      },

      {
        title: 'Previous Events',
        url: '/previous-events',
        Component: PreviousEvents,
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
];
