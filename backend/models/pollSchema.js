import mongoose from "mongoose";

const pollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  type: { type: String, required: true },
  options: [
    {
      optionText: { type: String, required: true },
      votes: { type: Number, default: 0 }, // For vote tracking
    },
  ],
  response: [
    {
      voterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // For open-ended polls
      responseText: { type: String }, // User-submitted text response
      createdAt: { type: Date, default: Date.now },
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  voters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
  closed: { type: Boolean, default: false },
});

const Poll = mongoose.model("Poll", pollSchema);

export default Poll;
