import express from "express";

import { isAuthorizedUser } from "../middlewares/auth.middlewares.js";
import {
  createTimelines,
  deleteTimelines,
  getTimelines,
  updateTimelines,
} from "../controllers/timeline.controllers.js";
const router = express.Router();

router.route("/create").post(isAuthorizedUser, createTimelines);
router.route("/delete/:id").delete(isAuthorizedUser, deleteTimelines);
router.route("/").get(getTimelines);
router.route("/update/:id").put(isAuthorizedUser, updateTimelines);
export default router;
