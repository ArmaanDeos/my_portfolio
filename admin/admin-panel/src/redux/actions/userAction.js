import { publicRequest, userRequest } from "@/utilities/requestMethods";
import {
  clearErrors,
  loginFail,
  loginStart,
  loginSuccess,
  logoutUserRequest,
  logoutUserFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  forgetPasswordRequest,
  forgetPasswordFail,
  forgetPasswordSuccess,
  resetPasswordRequest,
  resetPasswordFail,
  resetPasswordSuccess,
} from "../reducers/userSlice";

export const loginUser = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/user/login", user);
    console.log(res.data);
    dispatch(loginSuccess(res.data));
    dispatch(clearErrors());
  } catch (error) {
    dispatch(loginFail(error));
  }
};

export const logoutUser = async (dispatch) => {
  try {
    const res = await publicRequest.get("/user/logout");
    dispatch(logoutUserRequest(res.data));
  } catch (error) {
    dispatch(logoutUserFail(error.message));
  }
};

export const updatePassword = async (dispatch, password) => {
  dispatch(updatePasswordRequest());
  try {
    const res = await publicRequest.put("/user/update/password", { password });
    console.log(res.data);
    dispatch(updatePasswordSuccess(res.data));
  } catch (error) {
    dispatch(updatePasswordFail(error));
  }
};

export const updateProfile = async (dispatch, profile) => {
  dispatch(updateProfileRequest());

  try {
    const formData = new FormData();
    Object.entries(profile).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    const res = await userRequest.put("/user/update/me", formData);
    console.log("Profile Update Response:", res.data);
    dispatch(updateProfileSuccess(res.data));
    dispatch(clearAllError());
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.error("Profile Update Error:", errorMessage);
    dispatch(updateProfileFail(errorMessage));
  }
};

export const forgetPassword = async (dispatch, email) => {
  dispatch(forgetPasswordRequest());
  try {
    const res = await publicRequest.post("/user/forget/password", email);
    console.log(res.data);
    dispatch(forgetPasswordSuccess(res.data));
    dispatch(clearErrors());
  } catch (error) {
    dispatch(forgetPasswordFail(error));
  }
};

export const resetPassword = async (
  dispatch,
  token,
  password,
  confirmPassword
) => {
  dispatch(resetPasswordRequest());
  try {
    const res = await publicRequest.put(`/user/reset/password/${token}`, {
      password,
      confirmPassword,
    });
    console.log(res.data);
    dispatch(resetPasswordSuccess(res.data));
    dispatch(clearErrors());
  } catch (error) {
    dispatch(resetPasswordFail(error));
  }
};

export const clearAllError = async () => (dispatch) => {
  dispatch(clearErrors());
};
