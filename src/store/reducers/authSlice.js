import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    email: '',
  },
  reducers: {
    authUser(state) {
      state.isAuth = true;
    },
    logOutUser(state) {
      state.isAuth = false;
      state.email = '';
    },
    setUserEmail(state, { payload }) {
      state.email = payload;
    },
  },
});

// actions
export const { authUser, logOutUser, setUserEmail } = authSlice.actions;
// selectors
export const selectAuthState = state => state.auth.isAuth;
export const selectUserEmail = state => state.auth.email;

export default authSlice.reducer;
