import { createSlice } from "@reduxjs/toolkit";

const forgotResetPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    isLoading: false,
    isError: false,
    message: "",
  },

  reducers: {
    forgotPasswordRequest: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.message = "";
    },
    forgotPasswordSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.message = action.payload;
    },
    forgotPasswordFail: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.message = "";
    },
    resetPasswordRequest: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.message = "";
    },
    resetPasswordSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.message = action.payload;
    },
    resetPasswordFail: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.message = "";
    },

    clearErrors: (state, action) => {
      state.isError = null;
      state = state;
    },
  },
});

export const {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
  clearErrors,
} = forgotResetPasswordSlice.actions;

export default forgotResetPasswordSlice.reducer;
