import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
   reducerPath: 'userApi',
   baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_APP_BACKEND_BASE_URL + '/api',
      credentials: 'include',
   }),
   tagTypes: ['User'],
   endpoints: (builder) => ({
      // Lấy tất cả người dùng (admin)
      getAllUsers: builder.query({
         query: () => ({
            url: '/users',
            method: 'GET',
         }),
         providesTags: ['User'],
      }),

      // Lấy thông tin người dùng theo ID
      getUserById: builder.query({
         query: (userId) => ({
            url: `/user/${userId}`,
            method: 'GET',
         }),
         providesTags: ['User'],
      }),

      // Cập nhật thông tin người dùng
      updateUser: builder.mutation({
         query: ({ userId, state }) => ({
            url: `/user/${userId}/state`,
            method: 'PUT',
            body: { state },
         }),
         invalidatesTags: ['User'],
      }),

      // Xóa người dùng (admin)
      deleteUser: builder.mutation({
         query: (userId) => ({
            url: `/user/${userId}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['User'],
      }),
   }),
});

export const {
   useGetAllUsersQuery,
   useGetUserByIdQuery,
   useUpdateUserMutation,
   useDeleteUserMutation,
} = userApi;

export default userApi;
