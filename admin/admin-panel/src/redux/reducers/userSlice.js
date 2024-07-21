import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: false,
    isError: false,
    message: "",
    isAuthenticated: false,
    isUpdated: false,
  },

  reducers: {
    loginRequest: (state, action) => {
      state.isLoading = true;
      state.isAuthenticated = false;
      state.user = null;
      state.isError = false;
      state.message = "";
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isError = false;
      state.message = action.payload.message;
    },
    loginFail: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.isError = action.payload;
    },
    loggedUserRequest: (state, action) => {
      state.isLoading = true;
      state.isAuthenticated = false;
      state.user = null;
      state.isError = false;
    },
    loggedUserSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isError = false;
    },
    loggedUserFail: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.isError = action.payload;
    },

    logoutUserSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.isError = false;
      state.message = action.payload;
    },
    logoutUserFail: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.isError = action.payload;
    },

    updatePasswordRequest: (state, action) => {
      state.isLoading = true;
      state.isUpdated = false;
      state.message = "";
      state.isError = false;
    },
    updatePasswordSuccess: (state, action) => {
      state.isLoading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.isError = false;
    },
    updatePasswordFail: (state, action) => {
      state.isLoading = false;
      state.isUpdated = false;
      state.message = "";
      state.isError = action.payload;
    },

    updateProfileRequest: (state, action) => {
      state.isLoading = true;
      state.isUpdated = false;
      state.message = "";
      state.isError = false;
    },
    updateProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.isError = false;
    },
    updateProfileFail: (state, action) => {
      state.isLoading = false;
      state.isUpdated = false;
      state.message = "";
      state.isError = action.payload;
    },

    ResetProfileAfterUpdateRequest: (state, action) => {
      state.isError = false;
      state.isUpdated = false;
      state.message = "";
    },

    clearErrors: (state, action) => {
      state.isError = null;
      state.user = state.user;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  loggedUserRequest,
  loggedUserSuccess,
  loggedUserFail,
  logoutUserSuccess,
  logoutUserFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  ResetProfileAfterUpdateRequest,
  clearErrors,
} = userSlice.actions;

export default userSlice.reducer;
