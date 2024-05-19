import jwt from "jsonwebtoken";

import AppError from "../utils/AppError.js";
import asyncHandler from "./asyncHandler.middleware.js";

export const isLoggedIn = asyncHandler(async (req, _res, next) => {

  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("Unauthorized, please login to continue", 401));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return next(new AppError("Unauthorized, please login to continue", 401));
  }

  req.user = decoded;

  next();
});

export const authorizeRoles = (...roles) =>
  asyncHandler(async (req, _res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to view this route", 403)
      );
    }

    next();
  });

export const authorizedSubscribers = asyncHandler(async (req, _res, next) => {
  if (req.user.role !== "ADMIN" && req.user.subscription.status !== "active") {
    return next(new AppError("Please subscribe to access this route.", 403));
  }

  next();
});