import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { uploadToCloudinary } from "../utils/cloudinaryConfig.js";

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let profileImageUrl = null;

    if (req.files["profileImage"]) {
      profileImageUrl = await uploadToCloudinary(
        req.files["profileImage"][0],
        "profile_images"
      );
    }

    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profileImage: profileImageUrl,
      },
    });

    await newUser.save();

    return res.json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: error.message || "An error occurred!" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // validation
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required!" });
    }

    // if user not found
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found!" });
    }

    // if password not matching
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid password!" });
    }

    // if role not matching
    if (user.role !== role) {
      return res.status(403).json({
        success: false,
        error: "Account doesn't exist with current role!",
      });
    }

    const tokenData = {
      userId: user._id,
    };

    // generate token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({ success: true, message: `Welcome back ${user.fullname}`, user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error while logging in!" });
  }
};

export const logOutUser = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      success: true,
      message: "You have been logged out successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Error while logging out!" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const userId = req.id; // Authenticated user ID from middleware

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    let profileImageUrl = user.profile.profileImage;
    let resumeUrl = user.profile.resume;

    if (req.files["profileImage"]) {
      profileImageUrl = await uploadToCloudinary(
        req.files["profileImage"][0],
        "profile_images"
      );
    }

    if (req.files["resume"]) {
      resumeUrl = await uploadToCloudinary(req.files["resume"][0], "resumes");
    }

    // Update user fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills ? skills.split(",") : [];
    user.profile.profileImage = profileImageUrl;
    user.profile.resume = resumeUrl;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
