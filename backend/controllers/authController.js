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
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

// Login user function
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validation: check for missing fields
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      id: user._id,
      user: {
        ...user.toObject(),
        totalPollsCreated: 0,
        totalPollsVotes: 0,
        totalPollsBookmarked: 0,
      },
      token: generateToken(user._id),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while logging in", error: err.message });
  }
};

// Get user info function
export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Add the new attributes to the response
    const userInfo = {
      ...user.toObject(),
      totalPollsCreated: 0,
      totalPollsVotes: 0,
      totalPollsBookmarked: 0,
    };

    res.status(200).json(userInfo);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while getting user info", error: err.message });
  }
};
