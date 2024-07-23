import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Skill } from "../models/skills.models.js";
import { uploadCloudinary } from "../utils/cloudinary.config.js";
import { v2 as cloudinary } from "cloudinary";

//* Create Skill *//
const getSkill = asyncHandler(async (req, res) => {
  const skills = await Skill.find();
  if (!skills) throw new ApiError(500, "Something went wrong");
  res
    .status(200)
    .json(new ApiResponse(200, skills, "Skills fetched successfully"));
});

//* Get Skill *//
const createSkill = asyncHandler(async (req, res) => {
  const { title, proficiency } = req.body;
  if (!title || !proficiency)
    throw new ApiError(400, "All fields are required");

  // Check for svg files
  const skillFilePath = req.files?.svg[0]?.path;

  if (!skillFilePath) throw new ApiError(400, "No skill file found in request");

  // Upload svg files to cloudinary
  const skillFile = await uploadCloudinary(skillFilePath);

  const newSkill = await Skill.create({
    title,
    proficiency,
    svg: {
      url: skillFile.url,
      public_id: skillFile.public_id,
    },
  });

  res.status(200).json(new ApiResponse(newSkill, "Skill created successfully"));
});

//* Delete Skill *//
const deleteSkill = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const skill = await Skill.findById(id);
  if (!skill) throw new ApiError(404, "Skill not found");

  if (skill.svg && skill.svg.public_id) {
    const svgImgId = skill.svg.public_id;
    await cloudinary.uploader.destroy(svgImgId);
  }

  await Skill.findByIdAndDelete(id);
  res.status(200).json(new ApiResponse(200, null, "Skill deleted"));
});

//* Update Skill *//
const updateSkill = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const skill = await Skill.findById(id);
  if (!skill) throw new ApiError(404, "Skill not found");

  const updatedSkill = await Skill.findByIdAndUpdate(
    id,
    {
      proficiency: req.body.proficiency,
    },
    { new: true }
  );
  res
    .status(200)
    .json(new ApiResponse(updatedSkill, "Skill updated successfully"));
});

export { createSkill, getSkill, deleteSkill, updateSkill };
