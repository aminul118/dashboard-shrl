import baseApi from "@/redux/baseApi";

const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST - Add Regular Event
    addEvent: builder.mutation({
      query: (eventInfo) => ({
        url: "/event/create",
        method: "POST",
        data: eventInfo,
      }),
    }),

    // GET - Get All Events
    getEvent: builder.query({
      query: () => ({
        url: "/event/get-all",
        method: "GET",
      }),
    }),

    // POST - Add Upcoming Event
    addUpcomingEvent: builder.mutation({
      query: (eventInfo) => ({
        url: "/upcoming-event/create",
        method: "POST",
        data: eventInfo,
      }),
    }),

    // PATCH - Update Upcoming Event
    updateUpcomingEvent: builder.mutation({
      query: ({ id, data }) => ({
        url: `/upcoming-event/${id}`,
        method: "PATCH", // or PUT depending on your backend
        data,
      }),
    }),

    // GET - Get All Upcoming Events
    getUpcomingEvents: builder.query({
      query: () => ({
        url: "/upcoming-event/get-all",
        method: "GET",
      }),
    }),

    // DELETE - Delete Upcoming Event
    deleteUpcomingEvent: builder.mutation({
      query: (id) => ({
        url: `/upcoming-event/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddEventMutation,
  useGetEventQuery,
  useAddUpcomingEventMutation,
  useGetUpcomingEventsQuery,
  useUpdateUpcomingEventMutation,
  useDeleteUpcomingEventMutation,
} = eventApi;
