import mongoose, { Schema } from "mongoose";

const timelineSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    timeline: {
      from: {
        type: String,
        required: [true, "From date is required"],
      },
      to: String,
    },
  },

  {
    timestamps: true,
  }
);

export const Timeline = mongoose.model("Timeline", timelineSchema);
