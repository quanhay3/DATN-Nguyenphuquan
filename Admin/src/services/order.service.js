import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import productApi from './product.service';

const orderApi = createApi({
   reducerPath: 'orderApi',
   baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_APP_BACKEND_BASE_URL + '/api',
      credentials: 'include',
   }),
   tagTypes: ['Order'],
   endpoints: (builder) => ({
      // Tạo đơn hàng
      createOrder: builder.mutation({
         query: (order) => ({
            url: '/order/create',
            method: 'POST',
            body: order,
         }),
         invalidatesTags: ['Order'],
      }),
      // Lấy tất cả đơn hàng của người dùng
      getOrdersByUser: builder.query({
         query: () => ({
            url: '/orders/user',
            method: 'GET',
         }),
         providesTags: ['Order'],
      }),

      // Lấy thông tin đơn hàng theo orderId
      getOrder: builder.query({
         query: (orderId) => ({
            url: `/order/${orderId}`,
            method: 'GET',
         }),
         providesTags: ['Order'],
      }),

      // Lấy toàn bộ đơn hàng (admin)
      getAllOrders: builder.query({
         query: () => ({
            url: '/orders',
            method: 'GET',
         }),
         providesTags: ['Order'],
      }),

      // Cập nhật trạng thái đơn hàng
      updateOrderStatus: builder.mutation({
         query: ({ orderId, status }) => ({
            url: `/order/${orderId}/status`,
            method: 'PUT',
            body: { status },
         }),
         invalidatesTags: ['Order'],
      }),
   }),
});

export const {
   useCreateOrderMutation,
   useGetOrdersByUserQuery,
   useGetOrderQuery,
   useGetAllOrdersQuery,
   useUpdateOrderStatusMutation,
} = orderApi;

export default orderApi;
