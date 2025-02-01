import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  deleteCompany,
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/companyController.js";
import multer from "multer";

const upload = multer();

const companyRouter = express.Router();

companyRouter.post("/register", isAuthenticated, registerCompany);
companyRouter.get("/get", isAuthenticated, getCompany);
companyRouter.get("/get/:id", isAuthenticated, getCompanyById);
companyRouter.post(
  "/update/:id",
  isAuthenticated,
  upload.single("logo"),
  updateCompany
);
companyRouter.delete("/delete/:id", isAuthenticated, deleteCompany);

export default companyRouter;
