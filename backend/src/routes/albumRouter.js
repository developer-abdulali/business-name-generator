import express from "express";

import upload from "../middlewares/multer.js";
import {
  addAlbum,
  listAlbums,
  removeAlbum,
} from "../controllers/albumController.js";

const albumRouter = express.Router();

albumRouter.post("/add", upload.single("image"), addAlbum);
albumRouter.get("/list", listAlbums);
albumRouter.post("/remove", removeAlbum);

export default albumRouter;
