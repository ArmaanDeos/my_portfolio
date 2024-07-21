import { publicRequest } from "@/utilities/requestMethods";
import {
  addApplicationFail,
  addApplicationRequest,
  addApplicationSuccess,
  clearApplicationError,
  deleteApplicationFail,
  deleteApplicationRequest,
  deleteApplicationSuccess,
  getApplicationFail,
  getApplicationRequest,
  getApplicationSuccess,
  resetApplicationSlice,
} from "../reducers/applicationSlice";

export const getAllApplication = () => async (dispatch) => {
  dispatch(getApplicationRequest());
  try {
    const res = await publicRequest.get("/application", {
      withCredentials: true,
    });
    dispatch(getApplicationSuccess(res.data));
    dispatch(clearApplicationError());
  } catch (error) {
    dispatch(getApplicationFail(error.response.data.message));
  }
};

export const addNewApplication = (data) => async (dispatch) => {
  dispatch(addApplicationRequest());
  try {
    const res = await publicRequest.post("/application/create", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(addApplicationSuccess(res.data));
    dispatch(clearApplicationError());
  } catch (error) {
    dispatch(addApplicationFail(error.response.data.message));
  }
};

export const deleteApplication = (id) => async (dispatch) => {
  dispatch(deleteApplicationRequest());
  try {
    const res = await publicRequest.delete(`/application/delete/${id}`, {
      withCredentials: true,
    });
    dispatch(deleteApplicationSuccess(res.data));
    dispatch(clearApplicationError());
  } catch (error) {
    dispatch(deleteApplicationFail(error.response.data.message));
  }
};

export const clearApplicationErrors = () => (dispatch) => {
  dispatch(clearApplicationError());
};

export const resetApplication = () => (dispatch) => {
  dispatch(resetApplicationSlice());
};
