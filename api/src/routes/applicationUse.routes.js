import express from "express";

import { isAuthorizedUser } from "../middlewares/auth.middlewares.js";
import {
  createApplication,
  deleteApplication,
  getApplications,
} from "../controllers/applicationUse.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = express.Router();

router.route("/").get(isAuthorizedUser, getApplications);
router.route("/delete/:id").delete(isAuthorizedUser, deleteApplication);
router
  .route("/create")
  .post(
    upload.fields([{ name: "svg", maxCount: 1 }]),
    isAuthorizedUser,
    createApplication
  );

export default router;
