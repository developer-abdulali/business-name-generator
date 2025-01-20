import { Application } from "../models/applicationModel.js";
import { Job } from "../models/jobSchema.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid job ID." });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job.",
      });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found." });
    }

    // Create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res
      .status(201)
      .json({ success: true, message: "Application submitted successfully." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error while applying for the job." });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const appliedJobs = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: { path: "company", select: "name location" }, // Populate company details
      });

    if (!appliedJobs || appliedJobs.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No applications found." });
    }

    return res.status(200).json({
      success: true,
      appliedJobs,
      message: "Applied jobs fetched successfully.",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error while getting applied jobs." });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant" },
    });

    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found." });
    }

    return res.status(200).json({
      success: true,
      job,
      applicants: job.applications,
      message: "Applicants fetched successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting applicants.",
    });
  }
};

export const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (
      !status ||
      !["pending", "accepted", "rejected"].includes(status.toLowerCase())
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing status.",
      });
    }

    // Find the application by ID
    const application = await Application.findById(applicationId);
    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found." });
    }

    // Update the application status
    application.status = status.toLowerCase();
    await application.save();

    return res
      .status(200)
      .json({ success: true, message: "Status updated successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating job status.",
    });
  }
};
