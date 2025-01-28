// import express from "express";
// import {
//   loginUser,
//   logOutUser,
//   registerUser,
//   updateUserProfile,
// } from "../controllers/userController.js";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import { singleUpload } from "../middlewares/multer.js";

// const userRouter = express.Router();

// userRouter.post("/register", singleUpload, registerUser);
// // userRouter.post("/register", upload.single("file"), registerUser);
// userRouter.post("/login", loginUser);
// userRouter.post("/profile/update", isAuthenticated, updateUserProfile);
// userRouter.get("/logout", logOutUser);

// export default userRouter;

import express from "express";
import {
  loginUser,
  logOutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { upload } from "../utils/cloudinaryConfig.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post(
  "/profile/update",
  // isAuthenticated,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateUserProfile
);
userRouter.get("/logout", logOutUser);

export default userRouter;
