import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Application } from "../models/applicationUse.models.js";
import { uploadCloudinary } from "../utils/cloudinary.config.js";
import { v2 as cloudinary } from "cloudinary";

//* Create Application *//
const createApplication = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) throw new ApiError(400, "Application name is required");

  // Check for svg file
  const svgFilePath = req.files?.svg[0]?.path;

  if (!svgFilePath) throw new ApiError(400, "No svg file found in request");

  // Upload avatar and resume files to cloudinary
  const svgFile = await uploadCloudinary(svgFilePath);

  const newApplication = await Application.create({
    name,
    svg: {
      url: svgFile.url,
      public_id: svgFile.public_id,
    },
  });

  res
    .status(201)
    .json(new ApiResponse(201, newApplication, "Application created"));
});

//* Get All Applications *//
const getApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find();
  if (!applications) throw new ApiError(500, "Something went wrong");
  res
    .status(200)
    .json(new ApiResponse(200, applications, "All applications fetched"));
});

//* Delete Application *//
const deleteApplication = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const application = await Application.findById(id);
  if (!application) throw new ApiError(404, "Application not found");

  if (application.svg && application.svg.public_id) {
    const svgImgId = application.svg.public_id;
    await cloudinary.uploader.destroy(svgImgId);
  }

  await Application.findByIdAndDelete(id);
  res.status(200).json(new ApiResponse(200, null, "Application deleted"));
});

export { createApplication, getApplications, deleteApplication };
