import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    isLoading: false,
    isError: false,
    messages: [],
    message: null,
  },

  reducers: {
    getMessageRequest: (state, action) => {
      state.isLoading = true;
    },
    getMessageSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.messages = action.payload;
    },
    getMessageFail: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    deleteMessageRequest: (state, action) => {
      state.isLoading = true;
    },
    deleteMessageSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.message = action.payload;
    },
    deleteMessageFail: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    resetMessageSlice: (state, action) => {
      state.isError = false;
      state.messages = state.messages;
      state.message = null;
      state.isLoading = false;
    },

    clearMessageErrors: (state, action) => {
      state.isError = false;
    },
  },
});

export const {
  getMessageRequest,
  getMessageSuccess,
  getMessageFail,
  clearMessageErrors,
  deleteMessageRequest,
  deleteMessageSuccess,
  deleteMessageFail,
  resetMessageSlice,
} = messageSlice.actions;

export default messageSlice.reducer;
