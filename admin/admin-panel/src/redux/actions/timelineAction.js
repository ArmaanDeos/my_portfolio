import { publicRequest, userRequest } from "@/utilities/requestMethods";
import {
  addTimelineFail,
  addTimelineRequest,
  addTimelineSuccess,
  clearTimelineErrors,
  deleteTimelineFail,
  deleteTimelineRequest,
  deleteTimelineSuccess,
  resetTimelineSlice,
  timelineFail,
  timelineRequest,
  timelineSuccess,
} from "../reducers/timelineSlice";

const getErrorMessage = (error) => {
  return error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message;
};

export const getAllTimeline = () => async (dispatch) => {
  dispatch(timelineRequest());
  try {
    const res = await publicRequest.get("/timeline", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(timelineSuccess(res.data));
    dispatch(clearTimelineErrors());
  } catch (error) {
    dispatch(timelineFail(getErrorMessage(error)));
  }
};

export const deleteTimeline = (id) => async (dispatch) => {
  dispatch(deleteTimelineRequest());

  try {
    const res = await publicRequest.delete(`/timeline/delete/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(deleteTimelineSuccess(res.data));
    dispatch(clearTimelineErrors());
  } catch (error) {
    dispatch(deleteTimelineFail(getErrorMessage(error)));
  }
};

export const addNewTimeline = (data) => async (dispatch) => {
  dispatch(addTimelineRequest());
  try {
    const res = await publicRequest.post("/timeline/create", data, {
      withCredentials: true,
    });
    dispatch(addTimelineSuccess(res.data));
    dispatch(clearTimelineErrors());
  } catch (error) {
    dispatch(addTimelineFail(getErrorMessage(error)));
  }
};

export const clearTimelineError = () => (dispatch) => {
  dispatch(clearTimelineErrors());
};

export const resetTimeline = () => (dispatch) => {
  dispatch(resetTimelineSlice());
};
