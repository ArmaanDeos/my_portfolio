import mongoose, { Schema } from "mongoose";

const skillSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    proficiency: {
      type: String,
    },
    svg: {
      public_id: {
        type: String,
        required: [true, "Public ID is required"],
      },
      url: {
        type: String,
        required: [true, "URL is required"],
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Skill = mongoose.model("Skill", skillSchema);
