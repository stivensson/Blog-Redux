import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api' }),
  endpoints: (build) => ({
    getArticles: build.query({
      query: () => 'articles?limit=5',
    }),
  }),
})

export const { useGetArticlesQuery } = blogApi
