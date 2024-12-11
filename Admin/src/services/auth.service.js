import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authApi = createApi({
   reducerPath: 'authApi',
   baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_APP_BACKEND_BASE_URL + '/api',
      credentials: 'include',
   }),
   tagTypes: ['auth'],
   endpoints: (builder) => ({
      login: builder.mutation({
         query: (info) => {
            return {
               url: '/login',
               method: 'POST',
               body: info
            };
         },
         invalidatesTags: ['auth']
      }),
      signup: builder.mutation({
         query: (info) => {
            return {
               url: '/signup',
               method: 'POST',
               body: info
            };
         },
         invalidatesTags: ['auth']
      }),
      getToken: builder.query({
         query: () => ({
            url: '/token',
            method: 'GET',
            credentials: 'include'
         }),
         providesTags: ['auth']
      }),
      clearToken: builder.mutation({
         query: () => ({
            url: '/token',
            method: 'DELETE',
            credentials: 'include'
         }),
         invalidatesTags: ['auth']
      })
   })
});

export const { useLoginMutation, useSignupMutation, useGetTokenQuery, useClearTokenMutation } = authApi;
export default authApi;