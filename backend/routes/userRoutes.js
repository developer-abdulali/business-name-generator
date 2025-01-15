import express from "express";
import {
  loginUser,
  logOutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/profile/update", isAuthenticated, updateUserProfile);
userRouter.get("/logout", logOutUser);

export default userRouter;
