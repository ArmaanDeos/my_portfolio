import { createSlice } from "@reduxjs/toolkit";

const skillSlice = createSlice({
  name: "skill",
  initialState: {
    isLoading: false,
    isError: false,
    skills: [],
    message: null,
  },
  reducers: {
    getSkillsRequest: (state, action) => {
      state.isLoading = true;
      state.skills = [];
      state.isError = false;
    },
    getSkillsSuccess: (state, action) => {
      state.isLoading = false;
      state.skills = action.payload;
      state.isError = false;
    },
    getSkillsFail: (state, action) => {
      state.isLoading = false;
      state.skills = state.skills;
      state.isError = action.payload;
    },

    addSkillRequest: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.message = null;
    },
    addSkillSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.message = action.payload;
    },
    addSkillFail: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.message = null;
    },

    deleteSkillRequest: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.message = null;
    },
    deleteSkillSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.message = action.payload;
    },
    deleteSkillFail: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.message = null;
    },

    resetSkillSlice: (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.message = null;
      state.skills = state.skills;
    },

    clearSkillError: (state, action) => {
      state.isError = false;
      state.skills = state.skills;
    },
  },
});

export const {
  getSkillsRequest,
  getSkillsSuccess,
  getSkillsFail,
  addSkillRequest,
  addSkillSuccess,
  addSkillFail,
  deleteSkillRequest,
  deleteSkillSuccess,
  deleteSkillFail,
  resetSkillSlice,
  clearSkillError,
} = skillSlice.actions;

export default skillSlice.reducer;
