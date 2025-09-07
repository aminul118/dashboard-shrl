import { baseApi } from '@/redux/baseApi';

export const aiApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    aiTrainings: builder.mutation({
      query: (aiInfo) => ({
        url: '/ai/create',
        method: 'POST',
        data: aiInfo,
      }),
      invalidatesTags: ['AI'],
    }),

    getAiTrainings: builder.query({
      query: (params) => ({
        url: '/ai/get-all',
        method: 'GET',
        params,
      }),
      providesTags: ['AI'],
    }),
    deleteAiTrainingData: builder.mutation({
      query: (id) => ({
        url: `/ai/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AI'],
    }),
  }),
});

export const { useAiTrainingsMutation, useGetAiTrainingsQuery, useDeleteAiTrainingDataMutation } =
  aiApi;
