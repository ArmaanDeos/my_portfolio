import { createSlice } from "@reduxjs/toolkit";

const timelineSlice = createSlice({
  name: "timelines",
  initialState: {
    isLoading: false,
    isError: false,
    timeline: [],
    message: null,
  },

  reducers: {
    timelineRequest: (state, action) => {
      state.isLoading = true;
    },
    timelineSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.timeline = action.payload;
    },
    timelineFail: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    deleteTimelineRequest: (state, action) => {
      state.isLoading = true;
    },
    deleteTimelineSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.message = action.payload;
    },
    deleteTimelineFail: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    addTimelineRequest: (state, action) => {
      state.isLoading = true;
    },
    addTimelineSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.message = action.payload;
    },
    addTimelineFail: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    resetTimelineSlice: (state, action) => {
      state.isError = false;
      state.timeline = state.timeline;
      state.message = null;
      state.isLoading = false;
    },

    clearTimelineErrors: (state, action) => {
      state.isError = false;
    },
  },
});

export const {
  timelineRequest,
  timelineSuccess,
  timelineFail,
  deleteTimelineRequest,
  deleteTimelineSuccess,
  deleteTimelineFail,
  addTimelineRequest,
  addTimelineSuccess,
  addTimelineFail,
  resetTimelineSlice,
  clearTimelineErrors,
} = timelineSlice.actions;

export default timelineSlice.reducer;
