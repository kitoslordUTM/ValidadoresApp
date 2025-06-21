import { createSlice } from '@reduxjs/toolkit';
 

const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearSession: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setToken, clearSession } = authSlice.actions;
export default authSlice.reducer;
