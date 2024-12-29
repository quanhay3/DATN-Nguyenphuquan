import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BACKEND_BASE_URL + "/api",
    credentials: "include",
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    // Lấy tất cả người dùng (admin)
    getAllCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
} = categoryApi;

export default categoryApi;
