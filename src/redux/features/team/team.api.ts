import baseApi from '@/redux/baseApi';

const teamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST - Add Regular Event
    addTeamMember: builder.mutation({
      query: (eventInfo) => ({
        url: '/event/create',
        method: 'POST',
        data: eventInfo,
      }),
      invalidatesTags: ['EVENT'],
    }),
    // POST - Add Regular Event
    updateTeamMember: builder.mutation({
      query: (eventInfo) => ({
        url: '/event/create',
        method: 'POST',
        data: eventInfo,
      }),
      invalidatesTags: ['EVENT'],
    }),

    // GET - Get All Upcoming Events
    getAllTeamMembers: builder.query({
      query: () => ({
        url: '/upcoming-event/get-all',
        method: 'GET',
      }),
      providesTags: ['UPCOMING-EVENT'],
    }),

    // DELETE - Delete Upcoming Event
    deleteTeamMember: builder.mutation({
      query: (id) => ({
        url: `/upcoming-event/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['UPCOMING-EVENT'],
    }),

    // DELETE - Delete Upcoming Event
    teamJoinRequest: builder.query({
      query: () => ({
        url: `/join-team`,
        method: 'GET',
      }),
      providesTags: ['JOIN-TEAM'],
    }),
    // DELETE - Delete Upcoming Event
    singleTeamJoinRequest: builder.query({
      query: (slug) => ({
        url: `/join-team/${slug}`,
        method: 'GET',
      }),
      providesTags: ['JOIN-TEAM'],
    }),

    // POST - Add Regular Event
    sendParticipantEmail: builder.mutation({
      query: (emailData) => ({
        url: '/join-team/admin-message',
        method: 'POST',
        data: emailData,
      }),
    }),
  }),
});

export const {
  useTeamJoinRequestQuery,
  useSingleTeamJoinRequestQuery,
  useSendParticipantEmailMutation,
} = teamApi;
