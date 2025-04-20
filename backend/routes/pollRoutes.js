import express from "express";
import {
  bookmarkPoll,
  closePoll,
  createPoll,
  deletePoll,
  getAllPolls,
  getBookmarkedPolls,
  getPollById,
  getVotedPolls,
  voteOnPoll,
} from "../controllers/pollController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", isAuthenticated, createPoll);
router.get("/get-all-polls", isAuthenticated, getAllPolls);
router.get("/voted-polls", isAuthenticated, getVotedPolls);
router.get("/:id", isAuthenticated, getPollById);
router.post("/:id/vote", isAuthenticated, voteOnPoll);
router.get("/:id/close", isAuthenticated, closePoll);
router.post("/:id/bookmark", isAuthenticated, bookmarkPoll);
router.get("/user/bookmarked", isAuthenticated, getBookmarkedPolls);
router.delete("/:id/delete", isAuthenticated, deletePoll);

export default router;
