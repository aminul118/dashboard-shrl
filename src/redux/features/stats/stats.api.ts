import baseApi from "@/redux/baseApi";

const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET - Get All Events
    getAdminStats: builder.query({
      query: () => ({
        url: "/admin/stats",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAdminStatsQuery } = statsApi;
