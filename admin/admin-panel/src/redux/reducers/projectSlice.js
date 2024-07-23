import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    isLoading: false,
    isError: false,
    projects: [],
    message: null,
  },
  reducers: {
    getProjectRequest: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.message = null;
      state.projects = [];
    },
    getProjectSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.projects = action.payload;
    },
    getProjectFail: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.message = null;
      state.projects = state.projects;
    },
    addProjectRequest: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.message = null;
    },
    addProjectSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.message = action.payload;
    },
    addProjectFail: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.message = null;
    },
    deleteProjectRequest: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.message = null;
    },
    deleteProjectSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.message = action.payload;
    },
    deleteProjectFail: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.message = null;
    },
    updateProjectRequest: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.message = null;
    },
    updateProjectSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.message = action.payload;
    },
    updateProjectFail: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.message = null;
    },

    resetProject: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.message = null;
      state.projects = state.projects;
    },

    clearProjectError: (state, action) => {
      state.isError = false;
      state.message = null;
    },
  },
});

export const {
  getProjectRequest,
  getProjectSuccess,
  getProjectFail,
  addProjectRequest,
  addProjectSuccess,
  addProjectFail,
  deleteProjectRequest,
  deleteProjectSuccess,
  deleteProjectFail,
  updateProjectRequest,
  updateProjectSuccess,
  updateProjectFail,
  resetProject,
  clearProjectError,
} = projectSlice.actions;

export default projectSlice.reducer;
