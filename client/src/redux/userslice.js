import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
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
    },
    userAuthFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserPending: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserPending: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUserPending: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    logoutUserSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = null;
    },
    logoutUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  userAuthSuccess,
  userAuthPending,
  userAuthFailure,
  updateUserPending,
  updateUserSuccess,
  updateUserFailure,
  deleteUserPending,
  deleteUserSuccess,
  deleteUserFailure,
  logoutUserSuccess,
  logoutUserPending,
  logoutUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
