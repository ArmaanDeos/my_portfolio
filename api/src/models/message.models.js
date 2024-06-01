import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    senderName: {
      type: String,
      minLength: [2, "Name must be at least 2 characters"],
      required: true,
    },
    subject: {
      type: String,
      minLength: [2, "Subject must be at least 2 characters"],
      required: true,
    },
    message: {
      type: String,
      minLength: [2, "Message must be at least 2 characters"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", messageSchema);
