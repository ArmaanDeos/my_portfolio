import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Message } from "../models/message.models.js";

//* Send Message *//
const sendMessage = asyncHandler(async (req, res) => {
  const { senderName, subject, message } = req.body;
  if (!senderName || !subject || !message)
    throw new ApiError(400, "All fields are required");

  const newMessage = await Message.create({ senderName, subject, message });
  if (!newMessage) throw new ApiError(500, "Something went wrong");
  res
    .status(200)
    .json(new ApiResponse(200, newMessage, "Message Sent Successfully"));
});

//* Get All Messages *//
const getAllMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find();
  if (!messages) throw new ApiError(500, "Something went wrong");
  res
    .status(200)
    .json(new ApiResponse(200, messages, "All messages fetched successfully"));
});

//* Delete Message *//
const deleteMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const message = await Message.find({ id });
  if (!message) throw new ApiError(404, "Message not found");

  const deletedMessage = await Message.findByIdAndDelete(id);
  if (!deletedMessage) throw new ApiError(500, "Already Message Deleted !");
  res
    .status(200)
    .json(new ApiResponse(200, deletedMessage, "Message deleted successfully"));
});

export { sendMessage, getAllMessages, deleteMessage };
