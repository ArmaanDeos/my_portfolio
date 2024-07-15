import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isLoading: false,
    isError: false,
    isAuthenticated: false,
    isUpdated: false,
    message: "",
  },
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.currentUser = null;
      state.isAuthenticated = false;
      state.isError = null;
      state.message = "Data is Loading...";
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.isError = null;
      state.message = "User Login Successfully!";
    },
    loginFail: (state, action) => {
      state.isLoading = false;
      state.currentUser = null;
      state.isAuthenticated = false;
      state.isError = action.payload;
      state.message = "User Login Failed!";
    },
    logoutUserRequest: (state, action) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.isError = null;
      state.message = action.payload;
    },
    logoutUserFail: (state, action) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.isError = action.payload;
      state.message = action.payload;
    },
    updatePasswordRequest: (state) => {
      state.isLoading = true;
      state.isUpdated = false;
      state.isError = null;
      state.message = "Data is Loading...";
    },
    updatePasswordSuccess: (state, action) => {
      state.isLoading = false;
      state.isUpdated = true;
      state.isError = null;
      state.message = action.payload;
    },
    updatePasswordFail: (state, action) => {
      state.isLoading = false;
      state.isUpdated = false;
      state.isError = action.payload;
      state.message = action.payload;
    },
    updateProfileRequest: (state) => {
      state.isLoading = true;
      state.isUpdated = false;
      state.isError = null;
      state.message = "Data is Loading...";
    },
    updateProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.isUpdated = true;
      state.isError = null;
      state.message = action.payload;
    },
    updateProfileFail: (state, action) => {
      state.isLoading = false;
      state.isUpdated = false;
      state.isError = action.payload;
      state.message = action.payload;
    },

    forgetPasswordRequest: (state) => {
      state.isLoading = true;
      state.isUpdated = false;
      state.isError = null;
      state.message = "Data is Loading...";
    },
    forgetPasswordSuccess: (state, action) => {
      state.isLoading = false;
      state.isUpdated = false;
      state.isError = null;
      state.message = action.payload;
    },
    forgetPasswordFail: (state, action) => {
      state.isLoading = false;
      state.isUpdated = false;
      state.isError = action.payload;
      state.message = action.payload;
    },
    resetPasswordRequest: (state) => {
      state.isLoading = true;
      state.isUpdated = false;
      state.isError = null;
      state.message = "Data is Loading...";
    },
    resetPasswordSuccess: (state, action) => {
      state.isLoading = false;
      state.isUpdated = true; // Assuming this should be true on success
      state.isError = null;
      state.message = action.payload; // Assuming payload is a message or data object
    },
    resetPasswordFail: (state, action) => {
      state.isLoading = false;
      state.isUpdated = false;
      state.isError = action.payload; // Ensure action.payload is serializable
      state.message = action.payload.message || "An error occurred."; // Example fallback message
    },

    clearErrors: (state) => {
      state.isError = null;
      state.message = "";
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  clearErrors,
  logoutUserRequest,
  logoutUserFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  forgetPasswordRequest,
  forgetPasswordSuccess,
  forgetPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
} = userSlice.actions;
export default userSlice.reducer;
