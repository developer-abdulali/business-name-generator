import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String, default: null },
    bookmarkedPolls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Poll" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
