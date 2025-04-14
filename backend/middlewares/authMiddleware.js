import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userSchema";

dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findbyId(decoded.id).select("-password");
    next();
  } catch (error) {
    return res.status(403).json({ message: "Not authorized, Invalid token" });
  }
};
