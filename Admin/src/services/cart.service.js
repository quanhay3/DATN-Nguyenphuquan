import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cartApi = createApi({
   reducerPath: 'cartApi',
   baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_APP_BACKEND_BASE_URL + '/api',
      credentials: 'include',
   }),
   tagTypes: ['Cart'],
   endpoints: (builder) => ({
      // Lấy giỏ hàng của người dùng
      getCart: builder.query({
         query: (userId) => ({
            url: `/cart/${userId}`,
            method: 'GET',
         }),
         providesTags: ['Cart'],
      }),
      
      // Thêm sản phẩm vào giỏ hàng
      addToCart: builder.mutation({
         query: (info) => ({
            url: '/cart/add',
            method: 'POST',
            body: info,
         }),
         invalidatesTags: ['Cart'],
      }),
      
      // Xóa sản phẩm khỏi giỏ hàng
      removeProductFromCart: builder.mutation({
         query: ({ userId, productId }) => ({
            url: `/cart/${userId}/${productId}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Cart'],
      }),

      //Cập nhật số lượng sản phẩm trong giỏ hàng
      updateCart: builder.mutation({
         query: ({userId, quantity, productId}) => ({
            url: `/cart/${userId}/update`,
            method: 'PUT',
            body: { quantity, productId },
         }),
         invalidatesTags: ['Cart'],
      }),
   }),
});

export const {
   useGetCartQuery,
   useAddToCartMutation,
   useRemoveProductFromCartMutation,
   useUpdateCartMutation,
} = cartApi;

export default cartApi;
