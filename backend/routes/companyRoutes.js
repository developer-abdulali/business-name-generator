import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  deleteCompany,
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/companyController.js";

const companyRouter = express.Router();

companyRouter.post("/register", isAuthenticated, registerCompany);
companyRouter.get("/get", isAuthenticated, getCompany);
companyRouter.get("/get/:id", isAuthenticated, getCompanyById);
companyRouter.put("/update/:id", isAuthenticated, updateCompany);
companyRouter.delete("/delete/:id", isAuthenticated, deleteCompany);

export default companyRouter;
