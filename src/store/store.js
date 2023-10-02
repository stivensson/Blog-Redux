import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { blogApi } from '../service/blogApi'

import articlesListSlice from './reducers/articlesListSlice'

const rootReducer = combineReducers({
  [blogApi.reducerPath]: blogApi.reducer,
  articlesList: articlesListSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware),
})
