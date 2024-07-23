import { publicRequest } from "@/utilities/requestMethods";
import {
  addProjectFail,
  addProjectRequest,
  addProjectSuccess,
  clearProjectError,
  deleteProjectFail,
  deleteProjectRequest,
  deleteProjectSuccess,
  getProjectFail,
  getProjectRequest,
  getProjectSuccess,
  resetProject,
  updateProjectRequest,
  updateProjectSuccess,
} from "../reducers/projectSlice";
import { updateProfileFail } from "../reducers/userSlice";

export const getAllProjects = () => async (dispatch) => {
  dispatch(getProjectRequest());
  try {
    const res = await publicRequest.get("/projects", {
      withCredentials: true,
    });
    dispatch(getProjectSuccess(res.data));
    dispatch(clearProjectError());
  } catch (error) {
    dispatch(getProjectFail(error.response.data.message));
  }
};

export const addNewProject = (data) => async (dispatch) => {
  dispatch(addProjectRequest());
  try {
    const res = await publicRequest.post("/projects/add-project", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(addProjectSuccess(res.data));
    dispatch(clearProjectError());
  } catch (error) {
    dispatch(addProjectFail(error.response.data.message));
  }
};

export const deleteProject = (id) => async (dispatch) => {
  dispatch(deleteProjectRequest());
  try {
    const res = await publicRequest.delete(`/projects/delete-project/${id}`, {
      withCredentials: true,
    });
    dispatch(deleteProjectSuccess(res.data));
    dispatch(clearProjectError());
  } catch (error) {
    dispatch(deleteProjectFail(error.response.data.message));
  }
};

export const updateProjects = (id, data) => async (dispatch) => {
  dispatch(updateProjectRequest());
  try {
    const res = await publicRequest.put(
      `/projects/update-project/${id}`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(updateProjectSuccess(res.data));
    dispatch(clearProjectError());
  } catch (error) {
    dispatch(updateProfileFail(error.response.data.message));
  }
};

export const resetProjectSlice = () => async (dispatch) => {
  dispatch(resetProject());
};

export const clearAllProjectErrors = () => async (dispatch) => {
  dispatch(clearProjectError());
};
