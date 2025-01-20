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
      type: Number,
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
        default:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU8VYISu01SXKdXQ8LQrBvFCPG4w1H58GXqHBdCJp_Kv5TY_MuObEw9FI&s",
      },
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);
