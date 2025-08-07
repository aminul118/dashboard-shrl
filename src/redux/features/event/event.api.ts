import baseApi from "@/redux/baseApi";

const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST - Post Events
    addEvent: builder.mutation({
      query: (eventInfo) => ({
        url: "/event/create",
        method: "POST",
        data: eventInfo,
      }),
    }),

    // POST - Post Upcoming Events
    addUpcomingEvent: builder.mutation({
      query: (eventInfo) => ({
        url: "/upcoming-event/create",
        method: "POST",
        data: eventInfo,
      }),
    }),

    // GET - Get Upcoming Events
    getUpcomingEvents: builder.query({
      query: () => ({
        url: "/upcoming-event/get-all",
        method: "GET",
      }),
    }),

    // GET - Get Upcoming Events
    getEvent: builder.query({
      query: () => ({
        url: "/event/get-all",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddEventMutation,
  useAddUpcomingEventMutation,
  useGetEventQuery,
  useGetUpcomingEventsQuery,
} = eventApi;
