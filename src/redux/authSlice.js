import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  googleUser: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.loggedIn = true;
    },
    setGoogleUser: (state, action) => {
      state.googleUser = action.payload.googleUser;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.googleUser = {};
    },
  },
});

export const { login, setGoogleUser, logout } = authSlice.actions;
export default authSlice.reducer;
