import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userSchema.js";

dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(403).json({ message: "Not authorized, Invalid token" });
  }
};
