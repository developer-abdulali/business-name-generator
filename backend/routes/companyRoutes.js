import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  deleteCompany,
  getAllCompanies,
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/companyController.js";
import multer from "multer";

// multer
const upload = multer();

// Define the routes for company endpoints
const companyRouter = express.Router();

//company routes
companyRouter.post("/register", isAuthenticated, registerCompany);
companyRouter.get("/get", isAuthenticated, getCompany);
companyRouter.get("/companies", getAllCompanies);
companyRouter.get("/get/:id", isAuthenticated, getCompanyById);
companyRouter.post(
  "/update/:id",
  isAuthenticated,
  upload.single("logo"),
  updateCompany
);
companyRouter.delete("/delete/:id", isAuthenticated, deleteCompany);
// companyRouter.delete("/delete/:id", isAuthenticated, deleteCompany);

export default companyRouter;
