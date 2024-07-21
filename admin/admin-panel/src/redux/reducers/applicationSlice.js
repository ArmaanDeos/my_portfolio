import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    isLoading: false,
    isError: false,
    message: null,
    applications: [],
  },
  reducers: {
    getApplicationRequest: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.message = null;
    },
    getApplicationSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.message = null;
      state.applications = action.payload;
    },
    getApplicationFail: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.message = action.payload;
    },

    addApplicationRequest: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.message = null;
    },
    addApplicationSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.message = action.payload;
    },
    addApplicationFail: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.message = action.payload;
    },

    deleteApplicationRequest: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.message = null;
    },
    deleteApplicationSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.message = action.payload;
    },
    deleteApplicationFail: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.message = action.payload;
    },

    resetApplicationSlice: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.message = null;
      state.applications = state.applications;
    },

    clearApplicationError: (state, action) => {
      state.isError = false;
      state.message = null;
      state.applications = state.applications;
    },
  },
});

export const {
  getApplicationRequest,
  getApplicationSuccess,
  getApplicationFail,
  addApplicationRequest,
  addApplicationSuccess,
  addApplicationFail,
  deleteApplicationRequest,
  deleteApplicationSuccess,
  deleteApplicationFail,
  resetApplicationSlice,
  clearApplicationError,
} = applicationSlice.actions;
export default applicationSlice.reducer;
