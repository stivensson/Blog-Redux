import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  slug: null,
}

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    getSlug(state, action) {
      state.slug = action.payload
    },
  },
})

export default articleSlice.reducer
export const { getSlug } = articleSlice.actions
