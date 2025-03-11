import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateJobStatus,
} from "../controllers/applicationController.js";

const applicationRouter = express.Router();

// routes for both applicants and recruiters
applicationRouter.get("/apply/:id", isAuthenticated, applyJob);
applicationRouter.get("/get", isAuthenticated, getAppliedJobs);
applicationRouter.get("/:id/applicants", isAuthenticated, getApplicants);
applicationRouter.post("/status/:id/update", isAuthenticated, updateJobStatus);

export default applicationRouter;
