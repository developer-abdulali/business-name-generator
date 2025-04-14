import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";

// Generate jwt token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
};

// Register user function
export const registerUser = async (req, res) => {
  const { fullName, username, email, password, profileImageUrl } = req.body;

  // Validation: check for missing fields
  if (!fullName || !username || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  // Validation: check username format (allow alphanumeric charactors and hyphens only)
  const usernameRegex = /^[a-zA-Z0-9-]+$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      message:
        "Invalid username. Only alphanumeric charactors & hyphens are allowed. No spaces are permitted.",
    });
  }

  try {
    // Check if username already exist.
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message: "Username not available. Try another.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
      profileImageUrl,
    });

    // Send response
    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
      message: "User registered successfully!",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
