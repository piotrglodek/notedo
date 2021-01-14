import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: 'light',
  },
  reducers: {
    changeTheme(state, { payload }) {
      state.mode = payload;
    },
  },
});

// actions
export const { changeTheme } = themeSlice.actions;
// selectors
export const selectTheme = state => state.theme.mode;

export default themeSlice.reducer;
