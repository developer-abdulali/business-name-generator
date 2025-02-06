import { Job } from "../models/jobSchema.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    //validation
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    res
      .status(201)
      .json({ success: true, message: "Job posted successfully", job });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error while posting a job." });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const allJobs = await Job.find().populate({
      path: "company",
    });

    // Check if there are any jobs
    if (!allJobs || allJobs.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No jobs found." });
    }

    // Return the jobs as a JSON response
    return res.status(200).json({ success: true, jobs: allJobs });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error while getting jobs." });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });

    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found." });
    }
    res
      .status(200)
      .json({ success: true, job, message: "Job fetched successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error while getting job." });
  }
};

// get all jobs for recruiters
export const getRecruiterJobs = async (req, res) => {
  try {
    const recruiterId = req.id;
    const jobs = await Job.find({ created_by: recruiterId })
      .populate({
        path: "company",
      })
      .sort({
        createdAt: -1,
      });

    if (!jobs) {
      return res
        .status(404)
        .json({ success: false, message: "Jobs not found." });
    }

    res
      .status(200)
      .json({ success: true, jobs, message: "Jobs fetched successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error while getting jobs." });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    // Check if the user is the owner of the company
    if (created_by.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to delete this company.",
      });
    }

    const deletedJob = await Job.findByIdAndDelete(jobId);
    if (!deletedJob) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found." });
    }
    res
      .status(200)
      .json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error while deleting job." });
  }
};
