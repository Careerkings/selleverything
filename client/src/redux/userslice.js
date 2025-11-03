import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  updateLoading: false,
  updateError: null,
  logoutLoading: false,
  logoutError: null,
  deleteLoading: false,
  deleteError: null,
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
      state.updateLoading = true;
      state.updateError = null;
    },
    updateUserSuccess: (state, action) => {
      state.updateLoading = false;
      state.updateError = null;
      state.currentUser = action.payload;
    },
    updateUserFailure: (state, action) => {
      state.updateLoading = false;
      state.updateError = action.payload;
    },
    deleteUserPending: (state, action) => {
      state.deleteLoading = true;
      state.deleteError = null;
    },
    deleteUserSuccess: (state, action) => {
      state.deleteLoading = false;
      state.deleteError = null;
      state.currentUser = null;
    },
    deleteUserFailure: (state, action) => {
      state.deleteLoading = false;
      state.deleteError = action.payload;
    },
    logoutUserPending: (state, action) => {
      state.logoutLoading = true;
      state.logoutError = null;
    },
    logoutUserSuccess: (state, action) => {
      state.logoutLoading = false;
      state.logoutError = null;
      state.currentUser = null;
    },
    logoutUserFailure: (state, action) => {
      state.logoutLoading = false;
      state.logoutError = action.payload;
    },
    resetUserState: () => initialState,
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
  resetUserState,
} = userSlice.actions;

export default userSlice.reducer;
