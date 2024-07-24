import express from "express";
import {
  forgetPassword,
  getUser,
  getUserForPortfolio,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateUser,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { isAuthorizedUser } from "../middlewares/auth.middlewares.js";
const router = express.Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginUser);
router.route("/logout").get(isAuthorizedUser, logoutUser);
router.route("/me").get(isAuthorizedUser, getUser);
router.route("/update/me").put(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  isAuthorizedUser,
  updateUser
);
router.route("/update/password").put(isAuthorizedUser, updatePassword);
router.route("/portfolio/me").get(getUserForPortfolio);
router.route("/forget/password").post(forgetPassword);
router.route("/reset/password/:token").put(resetPassword);

export default router;
