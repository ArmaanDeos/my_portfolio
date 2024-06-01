import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const isAuthorizedUser = asyncHandler(async (req, res, next) => {
  // access token from cookies
  const { token } = req.cookies;
  if (!token) throw new ApiError(401, "Unauthorized ! Please login");
  // verify access token
  const decoded = jwt.verify(String(token), process.env.ACCESS_TOKEN_SECRET);
  if (!decoded) throw new ApiError(401, "Unauthorized ! Please login");
  // find user
  req.user = await User.findById(decoded.id);
  if (!req.user) throw new ApiError(401, "Unauthorized ! Please login");
  next();
});

export { isAuthorizedUser };
