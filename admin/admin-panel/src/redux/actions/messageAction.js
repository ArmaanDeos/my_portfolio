import { publicRequest, userRequest } from "@/utilities/requestMethods";
import {
  clearMessageErrors,
  deleteMessageFail,
  deleteMessageRequest,
  deleteMessageSuccess,
  getMessageFail,
  getMessageRequest,
  getMessageSuccess,
  resetMessageSlice,
} from "../reducers/messageSlice";

export const getAllMessages = () => async (dispatch) => {
  dispatch(getMessageRequest());
  try {
    const res = await publicRequest.get("/message");
    console.log(res);
    dispatch(getMessageSuccess(res.data.data));
    dispatch(clearMessageErrors());
  } catch (error) {
    dispatch(getMessageFail(error));
  }
};

export const deleteMessage = (id) => async (dispatch) => {
  dispatch(deleteMessageRequest());
  try {
    const res = await publicRequest.delete(`/message/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(deleteMessageSuccess(res.data));
    dispatch(clearMessageErrors());
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(deleteMessageFail(errorMessage));
  }
};

export const clearErrorMessages = () => (dispatch) => {
  dispatch(clearMessageErrors());
};

export const resetMessage = () => (dispatch) => {
  dispatch(resetMessageSlice());
};
