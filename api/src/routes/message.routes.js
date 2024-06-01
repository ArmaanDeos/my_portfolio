import express from "express";
import {
  deleteMessage,
  getAllMessages,
  sendMessage,
} from "../controllers/message.controllers.js";
import { isAuthorizedUser } from "../middlewares/auth.middlewares.js";
const router = express.Router();

router.route("/send").post(sendMessage);
router.route("/").get(getAllMessages);
router.route("/:id").delete(isAuthorizedUser, deleteMessage);

export default router;
