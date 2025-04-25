import { Router } from "express";
import {
  getAllSongs,
  getFeaturedSongs,
  getMadeForYouSongs,
  getTrendingSongs,
} from "../controllers/song.controller.js";
import {
  isAdminOrNot,
  isAuthenticated,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", isAuthenticated, isAdminOrNot, getAllSongs);
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", getMadeForYouSongs);
router.get("/trending", getTrendingSongs);

export default router;
