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
      getSearch: builder.query({
         query: (params) => {
            return {
               url: '/products/search',
               params: paramTransformer(params)
            };
         },
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
   }),
});

export const {
   useGetAllExpandQuery,
   useGetProductsQuery,
   useGetSearchQuery,
   useGetProductByIdQuery,
} = productApi;

export default productApi;
