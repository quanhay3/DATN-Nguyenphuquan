import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { paramTransformer } from '../util/transformParams';

const productApi = createApi({
   reducerPath: 'productApi',
   baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_APP_BACKEND_BASE_URL + '/api',
      credentials: 'include',
   }),
   tagTypes: ['Product'],
   endpoints: (builder) => ({
      getAllExpand: builder.query({
         query: (params) => {
            return {
               url: '/products/filter',
               params: paramTransformer(params)
            };
         },
         providesTags: ['Product']
      }),
      // Lấy tất cả sản phẩm
      getProducts: builder.query({
         query: () => ({
            url: '/products',
            method: 'GET',
         }),
         providesTags: ['Product'],
      }),

      // Lấy sản phẩm theo ID
      getProductById: builder.query({
         query: (productId) => ({
            url: `/product/${productId}`,
            method: 'GET',
         }),
         providesTags: ['Product'],
      }),

      // Thêm sản phẩm mới
      addProduct: builder.mutation({
         query: (newProduct) => ({
            url: '/product',
            method: 'POST',
            body: newProduct,
         }),
         invalidatesTags: ['Product'],
      }),

      // Cập nhật sản phẩm
      updateProduct: builder.mutation({
         query: ({ productId, updatedProduct }) => ({
            url: `/product/${productId}`,
            method: 'PUT',
            body: updatedProduct,
         }),
         invalidatesTags: ['Product'],
      }),

      // Xóa sản phẩm
      deleteProduct: builder.mutation({
         query: (productId) => ({
            url: `/product/${productId}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Product'],
      }),
   }),
});

export const {
   useGetAllExpandQuery,
   useGetProductsQuery,
   useGetProductByIdQuery,
   useAddProductMutation,
   useUpdateProductMutation,
   useDeleteProductMutation,
} = productApi;

export default productApi;
