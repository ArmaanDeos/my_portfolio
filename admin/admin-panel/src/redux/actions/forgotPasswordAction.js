import { publicRequest, userRequest } from "@/utilities/requestMethods";

import {
  clearErrors,
  forgotPasswordFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  resetPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
} from "../reducers/forgotResetPasswordSlice";

export const forgetPassword = (email) => async (dispatch) => {
  dispatch(forgotPasswordRequest()); // Dispatch loading state

  try {
    const res = await userRequest.post(
      "/user/forget/password",
      { email },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Dispatch success action with success message
    dispatch(forgotPasswordSuccess(res.data.message));
    dispatch(clearErrors()); // Clear any previous errors
  } catch (error) {
    // If error occurs, dispatch fail action with error message
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message || "An unknown error occurred";

    dispatch(forgotPasswordFail(errorMessage));
  }
};

export const resetPassword =
  (token, password, confirmPassword) => async (dispatch) => {
    dispatch(resetPasswordRequest());
    try {
      const res = await userRequest.put(
        `/user/reset/password/${token}`,
        {
          password,
          confirmPassword,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(resetPasswordSuccess(res.data));
      dispatch(clearErrors());
    } catch (error) {
      dispatch(resetPasswordFail(error.res.data.message));
    }
  };

export const clearAllForgotPasswordError = async (dispatch, user) => {
  dispatch(clearErrors());
};
