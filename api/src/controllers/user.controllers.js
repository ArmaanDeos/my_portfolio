import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { uploadCloudinary } from "../utils/cloudinary.config.js";
import { generateAccessToken } from "../jwt/jwt.js";
import { v2 as cloudinary } from "cloudinary";
import { sendEmail } from "../utils/sendMail.js";
import crypto from "crypto";

//* Register User *//

const registerUser = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    password,
    phone,
    aboutMe,
    portfolioUrl,
    githubUrl,
    linkedinUrl,
    twitterUrl,
    facebookUrl,
    instagramUrl,
  } = req.body;

  if (
    [fullName, email, password, phone, aboutMe, portfolioUrl].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists
  const existedUser = await User.findOne({ email });
  if (existedUser) throw new ApiError(400, "User already exists");

  // Check for avatar and resume files
  const avatarFilePath = req.files?.avatar[0]?.path;
  const resumeFilePath = req.files?.resume[0]?.path;

  if (!avatarFilePath || !resumeFilePath)
    throw new ApiError(400, "Both avatar and resume are required");

  // Upload avatar and resume files to cloudinary
  const avatarFile = await uploadCloudinary(avatarFilePath);
  const resumeFile = await uploadCloudinary(resumeFilePath);

  // Create user
  const newUser = await User.create({
    fullName,
    email,
    password,
    phone,
    aboutMe,
    portfolioUrl,
    githubUrl,
    linkedinUrl,
    twitterUrl,
    facebookUrl,
    instagramUrl,
    avatar: {
      url: avatarFile.url,
      public_id: avatarFile.public_id,
    },
    resume: {
      url: resumeFile.url,
      public_id: resumeFile.public_id,
    },
  });

  // Remove password field from response
  const createdUser = await User.findById(newUser._id).select("-password ");

  if (!createdUser) throw new ApiError(500, "Something went wrong");

  // Generate and send access token
  generateAccessToken(
    createdUser,
    200,
    res,
    "User has been registered successfully"
  );
});

//* Login User *//

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, "All fields are required");

  const user = await User.findOne({ $or: [{ email }, { password }] });

  if (!user) throw new ApiError(404, "User not found");

  // check password is correct or not
  const isValidPassword = await user.isPasswordCorrect(password);
  if (!isValidPassword) throw new ApiError(400, "Invalid credentials");

  // Generate and send access token
  generateAccessToken(user, 200, res, "User has been logged in successfully");
});

//* Logout User *//

const logoutUser = asyncHandler(async (req, res) => {
  // set cookie to expire
  res
    .status(200)
    .cookie("token", "null", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({ success: true, message: "User logged out successfully" });
});

//* Get User *//
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password ");
  if (!user) throw new ApiError(404, "User not found");
  res.status(200).json({ success: true, user });
});

//* Update User *//
const updateUser = asyncHandler(async (req, res) => {
  const newUserData = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    aboutMe: req.body.aboutMe,
    portfolioUrl: req.body.portfolioUrl,
    githubUrl: req.body.githubUrl,
    linkedinUrl: req.body.linkedinUrl,
    twitterUrl: req.body.twitterUrl,
    facebookUrl: req.body.facebookUrl,
    instagramUrl: req.body.instagramUrl,
  };

  try {
    // check if user exists
    const user = await User.findById(req.user._id);
    if (!user) {
      console.error("User not found");
      throw new ApiError(404, "User not found");
    }

    // update avatar files
    if (req.files && req.files.avatar) {
      if (user.avatar && user.avatar.public_id) {
        const profileImgId = user.avatar.public_id;
        await cloudinary.uploader.destroy(profileImgId);
      }

      const avatarFilePath = req.files.avatar[0].path;
      const avatarFile = await uploadCloudinary(avatarFilePath);

      newUserData.avatar = {
        url: avatarFile.url,
        public_id: avatarFile.public_id,
      };
    } else {
      console.log("No avatar file found in request");
    }

    // update resume files
    if (req.files && req.files.resume) {
      if (user.resume && user.resume.public_id) {
        const profileResumeId = user.resume.public_id;
        await cloudinary.uploader.destroy(profileResumeId);
      }

      const resumeFilePath = req.files.resume[0].path;
      const resumeFile = await uploadCloudinary(resumeFilePath);

      newUserData.resume = {
        url: resumeFile.url,
        public_id: resumeFile.public_id,
      };
    } else {
      console.log("No resume file found in request");
    }

    console.log("New user data:", newUserData);
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      newUserData,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "User updated successfully"));
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json(new ApiError(500, "An error occurred while updating the user"));
  }
});

//* Update User Password *//
const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  // Check if all required fields are present
  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new ApiError(400, "All fields are required");
  }

  // Find user
  const user = await User.findById(req.user?._id).select("+password");

  // Check if user exists
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Check if the current password is correct
  const isValidPassword = await user.isPasswordCorrect(currentPassword);
  if (!isValidPassword) {
    throw new ApiError(400, "Current password is incorrect");
  }

  // Check if the new password matches the confirmation password
  if (newPassword !== confirmPassword) {
    throw new ApiError(
      400,
      "New password and confirm password should be the same"
    );
  }

  // Update the user's password
  user.password = newPassword;
  await user.save();

  // Generate a new access token and send response
  generateAccessToken(user, 200, res);
});

//* Get User for PortFolio *//
const getUserForPortfolio = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password ");
  if (!user) throw new ApiError(404, "User not found");
  res.status(200).json({ success: true, user });
});

//* Forget Password *//
const forgetPassword = asyncHandler(async (req, res) => {
  // find user with email
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new ApiError(404, "User not found");

  //generate reset password token
  const resetToken = user.getPasswordResetToken();
  // save user
  await user.save({ validateBeforeSave: false });

  // create url for reset password
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

  // message for mail
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Portfolio Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    throw new ApiError(500, error.message, "Error while reseting password");
  }
});

//* Reset Password *//

const resetPassword = asyncHandler(async (req, res) => {
  // create hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token) // passing reset token from url
    .digest("hex");

  // find user and pass reset token
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  // check for user
  if (!user)
    throw new ApiError(
      400,
      "Invalid token or Token has been expired",
      "Error while reseting password"
    );

  // check new password and confierm password same or not
  if (req.body.password !== req.body.confirmPassword) {
    throw new ApiError(
      400,
      "Password and confirm password are not same",
      "Error while reseting password"
    );
  }

  // if all ok then set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  // at last save the user
  await user.save();

  // Generate access token for login user
  generateAccessToken(user, 200, res, "Password reset successfully");
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  updatePassword,
  getUserForPortfolio,
  forgetPassword,
  resetPassword,
};
