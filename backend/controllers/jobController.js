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
    const keyword = req.query.keyword;

    let query = {};

    // If a keyword is provided, apply regex search to string fields
    if (keyword) {
      query = {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          // Add regex search only to string fields, not to `position`
        ],
      };
    }

    // Fetch jobs from the database
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    // If no jobs found, return a 404 response
    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No jobs found." });
    }

    res
      .status(200)
      .json({ success: true, jobs, message: "Jobs fetched successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error while getting jobs." });
  }
};

// export const getAllJobs = async (req, res) => {
//   try {
//     const keyword = req.query.keyword || "";
//     const query = {
//       $or: [
//         { title: { $regex: keyword, $options: "i" } },
//         { description: { $regex: keyword, $options: "i" } },
//         { position: { $regex: keyword, $options: "i" } },
//       ],
//     };

//     const jobs = await Job.find(query).sort({ createdAt: -1 });
//     if (!jobs) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Jobs not found." });
//     }

//     res
//       .status(200)
//       .json({ success: true, jobs, message: "Jobs fetched successfully" });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Error while getting jobs." });
//   }
// };

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
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
    const jobs = await Job.find({ created_by: recruiterId }).sort({
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
