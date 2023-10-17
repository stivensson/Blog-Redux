import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  onLine: true,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    nowOnLine(state) {
      state.onLine = true
    },
    nowOffLine(state) {
      state.onLine = false
    },
  },
})

export default appSlice.reducer
export const { nowOnLine, nowOffLine } = appSlice.actions
