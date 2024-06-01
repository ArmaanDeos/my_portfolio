import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Project } from "../models/projects.models.js";
import { uploadCloudinary } from "../utils/cloudinary.config.js";
import { v2 as cloudinary } from "cloudinary";

//* Create Project *//
const addProjects = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    gitRepolink,
    projectLiveLink,
    technologies,
    stack,
    deployed,
  } = req.body;

  if (
    [
      title,
      description,
      gitRepolink,
      projectLiveLink,
      technologies,
      stack,
      deployed,
    ].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if project already exists
  const existedProject = await Project.findOne({ title });
  if (existedProject) throw new ApiError(400, "Project already exists");

  // Check for banner image file
  const bannerFilePath = req.files?.banner[0]?.path;

  if (!bannerFilePath)
    throw new ApiError(400, "No banner file found in request");

  const bannerFile = await uploadCloudinary(bannerFilePath);

  const newProject = await Project.create({
    title,
    description,
    gitRepolink,
    projectLiveLink,
    technologies,
    stack,
    deployed,
    banner: {
      url: bannerFile.url,
      public_id: bannerFile.public_id,
    },
  });
  res.status(201).json(new ApiResponse(201, newProject, "Project created"));
});
//* Get Project *//
const getProject = asyncHandler(async (req, res) => {
  const projects = await Project.find();
  if (!projects) throw new ApiError(500, "Something went wrong");
  res
    .status(200)
    .json(new ApiResponse(200, projects, "All projects fetched successfully"));
});

//* Update Project *//
const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newProjectData = {
    title: req.body.title,
    description: req.body.description,
    gitRepolink: req.body.gitRepolink,
    projectLiveLink: req.body.projectLiveLink,
    technologies: req.body.technologies,
    stack: req.body.stack,
    deployed: req.body.deployed,
  };

  const project = await Project.findById(id);
  if (!project) throw new ApiError(404, "Project not found");

  // delete old banner image

  if (req.files && req.files.banner) {
    if (project.banner && project.banner.public_id) {
      const bannerImgId = project.banner.public_id;
      await cloudinary.uploader.destroy(bannerImgId);
    }
  }

  // upload new banner image
  const bannerFilePath = req.files.banner[0].path;
  const bannerFile = await uploadCloudinary(bannerFilePath);

  newProjectData.banner = {
    url: bannerFile.url,
    public_id: bannerFile.public_id,
  };

  const updatedProject = await Project.findByIdAndUpdate(id, newProjectData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res
    .status(200)
    .json(new ApiResponse(200, updatedProject, "Project updated successfully"));
});

//* Delete Project *//
const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) throw new ApiError(404, "Project not found");

  if (project.banner && project.banner.public_id) {
    const bannerImgId = project.banner.public_id;
    await cloudinary.uploader.destroy(bannerImgId);
  }

  await Project.findByIdAndDelete(id);
  res.status(200).json(new ApiResponse(200, null, "Project deleted"));
});

//* Single Project *//
const getSingleProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) throw new ApiError(404, "Project not found");
  res
    .status(200)
    .json(new ApiResponse(200, project, "Project fetched successfully"));
});

export {
  addProjects,
  getProject,
  updateProject,
  deleteProject,
  getSingleProject,
};
