import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    gitRepolink: {
      type: String,
      required: [true, "Link is required"],
    },
    projectLiveLink: {
      type: String,
    },
    technologies: {
      type: String,
      required: [true, "Technologies are required"],
    },
    stack: {
      type: String,
    },
    deployed: {
      type: String,
    },
    banner: {
      public_id: {
        type: String,
        required: [true, "Banner is required"],
      },
      url: {
        type: String,
        required: [true, "Banner Url is required"],
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model("Project", projectSchema);
