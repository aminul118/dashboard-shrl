import baseApi from "@/redux/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST - Add Regular Event
    register: builder.mutation({
      query: (authInfo) => ({
        url: "/user/register",
        method: "POST",
        data: authInfo,
      }),
    }),

    // POST - Add Regular Event
    login: builder.mutation({
      query: (authInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: authInfo,
      }),
    }),

    // POST - Add Regular Event
    sendOTP: builder.mutation({
      query: (authInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: authInfo,
      }),
    }),

    // POST - Add Regular Event
    verifyOTP: builder.mutation({
      query: (authInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: authInfo,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
} = authApi;
