import { publicRequest, userRequest } from "@/utilities/requestMethods";
import {
  clearErrors,
  loggedUserFail,
  loggedUserRequest,
  loggedUserSuccess,
  loginFail,
  loginRequest,
  loginSuccess,
  logoutUserFail,
  logoutUserSuccess,
  ResetProfileAfterUpdateRequest,
  updatePasswordFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updateProfileFail,
  updateProfileRequest,
  updateProfileSuccess,
} from "../reducers/userSlice";

export const loginUser = (user) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const res = await publicRequest.post("/user/login", user, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(loginSuccess(res.data));
    dispatch(clearErrors());
  } catch (error) {
    dispatch(loginFail(error));
  }
};

export const getLoggedUser = async (dispatch) => {
  dispatch(loggedUserRequest());
  try {
    const res = await publicRequest.get("/user/me", {
      withCredentials: true,
    });
    dispatch(loggedUserSuccess(res.data));
    dispatch(clearErrors());
  } catch (error) {
    dispatch(loggedUserFail(error));
  }
};

export const logoutUser = async (dispatch) => {
  try {
    const res = await publicRequest.get("/user/logout", {
      withCredentials: true,
    });
    dispatch(logoutUserSuccess(res.data.message));
    dispatch(clearErrors());
  } catch (error) {
    dispatch(logoutUserFail(error));
  }
};

export const updatePassword =
  (currentPassword, newPassword, confirmPassword) => async (dispatch) => {
    dispatch(updatePasswordRequest());
    try {
      const res = await publicRequest.put(
        "/user/update/password",
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      dispatch(updatePasswordSuccess(res.data));
      dispatch(clearErrors());
    } catch (error) {
      dispatch(updatePasswordFail(error.message));
    }
  };

export const updateProfile = (data) => async (dispatch) => {
  dispatch(updateProfileRequest());
  try {
    const res = await userRequest.put("/user/update/me", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data);
    dispatch(updateProfileSuccess(res.data));
    dispatch(clearErrors());
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch(updateProfileFail(errorMessage));
  }
};

export const resetProfile = async (dispatch) => {
  dispatch(ResetProfileAfterUpdateRequest());
};

export const clearAllError = async (dispatch, user) => {
  dispatch(clearErrors());
};
