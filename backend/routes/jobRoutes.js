import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  deleteJob,
  getAllJobs,
  getJobById,
  getRecruiterJobs,
  postJob,
} from "../controllers/jobController.js";

const jobRouter = express.Router();

// routes for applicants
jobRouter.post("/post", isAuthenticated, postJob);
jobRouter.get("/get", getAllJobs);
jobRouter.get("/get/:id", getJobById);

// routes for recruiters
jobRouter.get("/getrecruiterjobs", isAuthenticated, getRecruiterJobs);
jobRouter.delete("/delete", isAuthenticated, deleteJob);

export default jobRouter;
