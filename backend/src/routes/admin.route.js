import { Router } from "express";
import {
  checkAdmin,
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
} from "../controllers/admin.controller.js";
import {
  isAdminOrNot,
  isAuthenticated,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/check", isAuthenticated, isAdminOrNot, checkAdmin);

router.post("/songs", isAuthenticated, isAdminOrNot, createSong);
router.delete("/songs/:id", isAuthenticated, isAdminOrNot, deleteSong);

router.post("/albums", isAuthenticated, isAdminOrNot, createAlbum);
router.delete("/albums/:id", isAuthenticated, isAdminOrNot, deleteAlbum);

export default router;
