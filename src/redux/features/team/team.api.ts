import baseApi from '@/redux/baseApi';

const teamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST - Add Team Member
    addTeamMember: builder.mutation({
      query: (teamInfo) => ({
        url: '/team/create',
        method: 'POST',
        data: teamInfo,
      }),
      invalidatesTags: ['TEAM'],
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
      query: (params) => ({
        url: '/team/get-all',
        method: 'GET',
        params,
      }),
      providesTags: ['TEAM'],
    }),

    // DELETE - Delete Upcoming Event
    deleteTeamMember: builder.mutation({
      query: (slug) => ({
        url: `/team/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TEAM'],
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

    // DELETE - Delete Join team request
    deleteJoinRequest: builder.mutation({
      query: (id) => ({
        url: `/join-team/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['JOIN-TEAM'],
    }),
  }),
});

export const {
  useAddTeamMemberMutation,
  useGetAllTeamMembersQuery,
  useDeleteTeamMemberMutation,
  useTeamJoinRequestQuery,
  useSingleTeamJoinRequestQuery,
  useSendParticipantEmailMutation,
  useDeleteJoinRequestMutation,
} = teamApi;
