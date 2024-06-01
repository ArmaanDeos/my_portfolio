import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Timeline } from "../models/timeline.models.js";

//* Create Timelines  *//
const createTimelines = asyncHandler(async (req, res) => {
  const { title, description, from, to } = req.body;

  if (!title || !description) {
    throw new ApiError(
      400,
      "All fields are required",
      "Error while creating timeline"
    );
  }

  const newTimeline = await Timeline.create({
    title,
    description,
    timeline: { from, to },
  });

  res.status(200).json(new ApiResponse(200, newTimeline, "Timeline created"));
});

//* Get Timelines *//
const getTimelines = asyncHandler(async (req, res) => {
  const timelines = await Timeline.find();
  if (!timelines) throw new ApiError(500, "Something went wrong");
  res
    .status(200)
    .json(
      new ApiResponse(200, timelines, "All timelines fetched successfully")
    );
});

//* Delete Timeliens *//
const deleteTimelines = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const timeline = await Timeline.findById(id);
  if (!timeline) throw new ApiError(404, "Timeline not found");

  const deletedTimeline = await Timeline.findByIdAndDelete(id);
  if (!deletedTimeline) throw new ApiError(500, "Already Timeline Deleted !");
  res
    .status(200)
    .json(new ApiResponse(200, deletedTimeline, "Timeline Deleted"));
});

//* Update Timelines *//
const updateTimelines = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, from, to } = req.body;
  const timeline = await Timeline.findById(id);
  if (!timeline) throw new ApiError(404, "Timeline not found");
  const updatedTimeline = await Timeline.findByIdAndUpdate(
    id,
    {
      title,
      description,
      timeline: { from, to },
    },
    { new: true }
  );
  res
    .status(200)
    .json(new ApiResponse(200, updatedTimeline, "Timeline updated"));
});

export { createTimelines, getTimelines, deleteTimelines, updateTimelines };
