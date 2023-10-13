import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api' }),
  endpoints: (build) => ({
    getArticles: build.query({
      query: (countPages) => `articles?offset=${countPages}&limit=5`,
    }),
    getSingleArticle: build.query({
      query: (slug) => `articles/${slug}`,
    }),
    getToken: build.mutation({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useGetArticlesQuery, useGetSingleArticleQuery, useGetTokenMutation } = blogApi
