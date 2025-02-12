import express from "express";
import {
  loginUser,
  logOutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import multer from "multer";

const upload = multer();
const userRouter = express.Router();

userRouter.post(
  "/register",
  upload.fields([{ name: "profileImage", maxCount: 1 }]),
  registerUser
);

userRouter.post("/login", loginUser);
userRouter.post(
  "/profile/update",
  isAuthenticated,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateUserProfile
);

userRouter.get("/logout", logOutUser);

export default userRouter;
