import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { blogApi } from '../service/blogApi'

import articlesListSlice from './reducers/articlesListSlice'
import articleSlice from './reducers/articleSlice'
import signInSlice from './reducers/signInSlice'
import appSlice from './reducers/appSlice'

const rootReducer = combineReducers({
  [blogApi.reducerPath]: blogApi.reducer,
  articlesList: articlesListSlice,
  article: articleSlice,
  signIn: signInSlice,
  app: appSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware),
})
