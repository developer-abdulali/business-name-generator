import { Router } from "express";
import { getStats } from "../controllers/stats.controller.js";
import {
  isAdminOrNot,
  isAuthenticated,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", isAuthenticated, isAdminOrNot, getStats);

export default router;
