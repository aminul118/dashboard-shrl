import baseApi from "@/redux/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST - Register
    register: builder.mutation({
      query: (authInfo) => ({
        url: "/user/register",
        method: "POST",
        body: authInfo,
      }),
    }),

    // POST - Login
    login: builder.mutation({
      query: (authInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: authInfo,
      }),
    }),

    // POST - Send OTP
    sendOTP: builder.mutation({
      query: (authInfo) => ({
        url: "/otp/send",
        method: "POST",
        body: authInfo,
      }),
    }),

    // POST - Verify OTP
    verifyOTP: builder.mutation({
      query: (authInfo) => ({
        url: "/otp/verify",
        method: "POST",
        body: authInfo,
      }),
    }),

    // GET - Auth Info
    authInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
  useAuthInfoQuery,
} = authApi;
