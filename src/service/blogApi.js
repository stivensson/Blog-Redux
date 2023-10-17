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
    signUp: build.mutation({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body,
      }),
    }),
    signIn: build.mutation({
      query: (body) => ({
        url: 'users/login',
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body,
      }),
    }),
    getUser: build.query({
      query: (token) => ({
        url: 'user',
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    editProfile: build.mutation({
      query: ({ body, token }) => ({
        url: 'user',
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body,
      }),
    }),
  }),
})

export const {
  useGetArticlesQuery,
  useGetSingleArticleQuery,
  useSignUpMutation,
  useSignInMutation,
  useGetUserQuery,
  useEditProfileMutation,
} = blogApi
