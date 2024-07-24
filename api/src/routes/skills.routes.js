import express from "express";

import { isAuthorizedUser } from "../middlewares/auth.middlewares.js";
import {
  createSkill,
  deleteSkill,
  getSkill,
  updateSkill,
} from "../controllers/skills.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = express.Router();

router
  .route("/create")
  .post(
    upload.fields([{ name: "svg", maxCount: 1 }]),
    isAuthorizedUser,
    createSkill
  );

router.route("/").get(getSkill);
router.route("/delete/:id").delete(isAuthorizedUser, deleteSkill);

router
  .route("/update/:id")
  .put(
    upload.fields([{ name: "svg", maxCount: 1 }]),
    isAuthorizedUser,
    updateSkill
  );

export default router;
