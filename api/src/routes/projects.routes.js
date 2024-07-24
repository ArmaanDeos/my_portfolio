import express from "express";

import { isAuthorizedUser } from "../middlewares/auth.middlewares.js";
import {
  addProjects,
  deleteProject,
  getProject,
  getSingleProject,
  updateProject,
} from "../controllers/projects.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
const router = express.Router();

router
  .route("/add-project")
  .post(
    upload.fields([{ name: "banner", maxCount: 1 }]),
    isAuthorizedUser,
    addProjects
  );

router.route("/").get(getProject);
router.route("/single-project/:id").get(isAuthorizedUser, getSingleProject);

router
  .route("/update-project/:id")
  .put(
    upload.fields([{ name: "banner", maxCount: 1 }]),
    isAuthorizedUser,
    updateProject
  );

router.route("/delete-project/:id").delete(isAuthorizedUser, deleteProject);

export default router;
