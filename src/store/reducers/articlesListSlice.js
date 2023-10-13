import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pages: 1,
}

const articlesListSlice = createSlice({
  name: 'articlesList',
  initialState,
  reducers: {
    getPages(state, action) {
      state.pages = action.payload
    },
  },
})

export default articlesListSlice.reducer
export const { getPages } = articlesListSlice.actions
