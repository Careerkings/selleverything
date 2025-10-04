import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: localStorage.getItem("current-user")
    ? JSON.parse(localStorage.getItem("current-user"))
    : null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userAuthPending: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    userAuthSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
      localStorage.setItem("current-user", JSON.stringify(state.currentUser));
      console.log(state.currentUser);
    },
    userAuthFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { userAuthSuccess, userAuthPending, userAuthFailure } =
  userSlice.actions;

export default userSlice.reducer;
