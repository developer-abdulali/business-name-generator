import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profileImage: req.file ? req.file.path : null,
    });

    await newUser.save();

    return res.json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res
      .status(500)
      .json({ success: false, error: error.message || "An error occurred!" });
  }
};

// export const registerUser = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, password, role } = req.body;

//     let user = await User.findOne({ email });
//     if (user) {
//       return res
//         .status(400)
//         .json({ success: false, error: "Email already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       fullname,
//       email,
//       phoneNumber,
//       password: hashedPassword,
//       role,
//     });

//     await newUser.save();

//     return res.json({
//       success: true,
//       message: "User registered successfully",
//       user: newUser,
//     });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ success: false, error: error.message || "An error occurred!" });
//   }
// };

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
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({ success: true, message: `Welcome back ${user.fullname}`, user });
  } catch (error) {
    console.error(error);
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
    const { fullname, email, phoneNumber, bio, skills = "" } = req.body;
    const file = req.file;

    // Cloudinary setup here...

    const skillsArray = skills ? skills.split(",") : [];
    const userId = req.id; // userId will come from auth middleware

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Updating user

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // Handle resume upload here...

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Error while updating user profile!" });
  }
};

// export const updateUserProfile = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, bio, skills } = req.body;
//     const file = req.file;

//     // cloudinary setup here...

//     let skillsArray = skills.split(",");
//     const userId = req.id; // userId will be come from auth middleware

//     let user = await User.findById(userId);

//     // updating user
//     user.fullname = fullname;
//     user.email = email;
//     user.phoneNumber = phoneNumber;
//     user.profile.bio = bio;
//     user.profile.skills = skillsArray;

//     // letter resume here...

//     await user.save();

//     user = {
//       _id: user._id,
//       fullname: user.fullname,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       role: user.role,
//       profile: user.profile,
//     };

//     return res.json({
//       success: true,
//       message: "Profile updated successfully",
//       user,
//     });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ success: false, error: "Error while updating user profile!" });
//   }
// };
