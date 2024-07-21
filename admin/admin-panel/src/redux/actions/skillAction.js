import { publicRequest, userRequest } from "@/utilities/requestMethods";
import {
  addSkillFail,
  addSkillRequest,
  addSkillSuccess,
  clearSkillError,
  deleteSkillFail,
  deleteSkillRequest,
  deleteSkillSuccess,
  getSkillsFail,
  getSkillsRequest,
  getSkillsSuccess,
  resetSkillSlice,
} from "../reducers/skillSlice";

export const getAllSkills = () => async (dispatch) => {
  dispatch(getSkillsRequest());
  try {
    const res = await publicRequest.get("/skills", {
      withCredentials: true,
    });
    dispatch(getSkillsSuccess(res.data));
    dispatch(clearSkillError());
  } catch (error) {
    dispatch(getSkillsFail(error.response));
  }
};

export const addSkills = (data) => async (dispatch) => {
  dispatch(addSkillRequest());
  try {
    const res = await publicRequest.post("/skills/create", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(addSkillSuccess(res.data));
    dispatch(clearSkillError());
  } catch (error) {
    dispatch(addSkillFail(error.response));
  }
};

export const deleteSkills = (id) => async (dispatch) => {
  dispatch(deleteSkillRequest());
  try {
    const res = await publicRequest.delete(`/skills/delete/${id}`, {
      withCredentials: true,
    });
    dispatch(deleteSkillSuccess(res.data));
    dispatch(clearSkillError());
  } catch (error) {
    dispatch(deleteSkillFail(error.response.data.message));
  }
};

export const resetSkill = () => (dispatch) => {
  dispatch(resetSkillSlice());
};

export const clearAllSkillError = () => (dispatch) => {
  dispatch(clearSkillError());
};
