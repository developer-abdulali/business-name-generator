import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      // type: Number,
      required: true,
    },

    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["applicant", "recruiter"],
      required: true,
    },
    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: { type: String },
      resumeOriginalName: { type: String },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      profileImage: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/128/15339/15339256.png",
      },
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);
