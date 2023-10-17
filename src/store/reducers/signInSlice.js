import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
  username: null,
  email: null,
  image: null,
}

const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    signInState(state, action) {
      state.username = action.payload.user.username
      state.email = action.payload.user.email
      state.image = action.payload.user.image
      state.isLogin = true
    },
    logOutState(state) {
      state.isLogin = !state.isLogin
      state.username = null
      state.email = null
      state.image = null
    },
  },
})

export default signInSlice.reducer
export const { signInState, logOutState } = signInSlice.actions
