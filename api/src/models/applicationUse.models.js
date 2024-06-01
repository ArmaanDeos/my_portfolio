import mongoose, { Schema } from "mongoose";

const applicationUseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
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

export const Application = mongoose.model("Application", applicationUseSchema);
