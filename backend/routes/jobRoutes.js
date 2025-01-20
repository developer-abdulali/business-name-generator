import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAllJobs,
  getJobById,
  getRecruiterJobs,
  postJob,
} from "../controllers/jobController.js";

const jobRouter = express.Router();

// routes for applicants
jobRouter.post("/post", isAuthenticated, postJob);
jobRouter.get("/get", isAuthenticated, getAllJobs);
jobRouter.get("/get/:id", isAuthenticated, getJobById);

// routes for recruiters
jobRouter.get("/getrecruiterjobs", isAuthenticated, getRecruiterJobs);

export default jobRouter;
