import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api' }),
  tagTypes: ['Articles', 'Art'],
  endpoints: (build) => ({
    getArticles: build.query({
      query: ({ countPages, token }) => ({
        url: `articles?offset=${countPages}&limit=5`,
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['Articles'],
    }),
    getSingleArticle: build.query({
      query: ({ slug, token }) => ({
        url: `articles/${slug}`,
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['Art'],
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
    newArticle: build.mutation({
      query: ({ body, token }) => ({
        url: '/articles',
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body,
      }),
      invalidatesTags: ['Articles'],
    }),
    deleteArticle: build.mutation({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Articles'],
    }),
    editArticle: build.mutation({
      query: ({ body, slug, token }) => ({
        url: `/articles/${slug}`,
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body,
      }),
      invalidatesTags: ['Art'],
    }),
    favorites: build.mutation({
      query: ({ token, slug }) => ({
        url: `/articles/${slug}/favorite`,
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Art', 'Articles'],
    }),
    deleteFavorites: build.mutation({
      query: ({ token, slug }) => ({
        url: `/articles/${slug}/favorite`,
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Art', 'Articles'],
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
  useNewArticleMutation,
  useDeleteArticleMutation,
  useEditArticleMutation,
  useFavoritesMutation,
  useDeleteFavoritesMutation,
} = blogApi
