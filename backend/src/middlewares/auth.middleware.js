import { clerkClient } from "@clerk/express";
import dotenv from "dotenv";
dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  if (!req.auth.userId)
    return res
      .stats(401)
      .json({ message: "Unauthorized - you must be logged in" });
  next();
};

export const isAdminOrNot = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin)
      return res
        .status(403)
        .json({ message: "Unauthorized - you are not admin" });

    next();
  } catch (error) {
    console.log("Error in isAdminOrNot middleware", error);
    next(error);
  }
};
