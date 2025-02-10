import { Job } from "../models/jobSchema.js";
import { User } from "../models/userModel.js";

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
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const allJobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

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

export const saveJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.savedJobs.includes(jobId)) {
      user.savedJobs = user.savedJobs.filter((job) => job.toString() !== jobId);
    } else {
      user.savedJobs.push(jobId);
    }

    await user.save();
    res.status(200).json({ success: true, savedJobs: user.savedJobs });
  } catch (error) {
    console.error("Error saving job:", error);
    res.status(500).json({
      success: false,
      message: "Error saving job",
      error: error.message,
    });
  }
};

export const getSavedJobs = async (req, res) => {
  const userId = req.id;

  try {
    const user = await User.findById(userId).populate("savedJobs");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, savedJobs: user.savedJobs });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching saved jobs" });
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

    // Find the job by its ID
    const job = await Job.findById(jobId);

    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found." });
    }

    // Check if the user is the owner of the job
    if (job.created_by.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to delete this job.",
      });
    }

    // Delete the job
    await Job.findByIdAndDelete(jobId);

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
