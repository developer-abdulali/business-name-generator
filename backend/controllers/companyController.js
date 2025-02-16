import { Company } from "../models/companyModel.js";
import { Job } from "../models/jobSchema.js";
import { uploadToCloudinary } from "../utils/cloudinaryConfig.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        success: false,
        message: "Company name is required.",
      });
    }
    let company = await Company.findOne({ name: companyName });

    if (company) {
      return res.status(400).json({
        success: false,
        message: "Company with the same name already exists.",
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      success: true,
      message: "Company registered successfully.",
      company,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error while registering company." });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId })
      .populate({
        path: "jobs",
        model: Job,
      })
      .limit(100);

    if (!companies) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Company found successfully.",
      companies,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error while getting company." });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const allCompanies = await Company.find();
    if (!allCompanies) {
      return res
        .status(404)
        .json({ success: false, message: "No companies found." });
    }

    return res.status(200).json({
      success: true,
      message: "Companies found successfully.",
      companies: allCompanies,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error while getting all companies." });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found." });
    }
    return res.status(200).json({
      success: true,
      message: "Company found successfully.",
      company,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    let logoUrl = null;

    // const file = req.files;

    if (req.file) {
      logoUrl = await uploadToCloudinary(req.file, "company_logos");
    }

    const updateCompanyData = {
      name,
      description,
      website,
      location,
      logo: logoUrl,
    };

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updateCompanyData,
      { new: true }
    );
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found." });
    }
    return res.status(200).json({
      success: true,
      message: "Company updated successfully.",
      company,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const userId = req.id; // User ID from authentication middleware
    const companyId = req.params.id;

    // Find the company by its ID
    const company = await Company.findById(companyId);

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found." });
    }

    // Check if the user is the owner of the company
    if (company.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to delete this company.",
      });
    }

    // Delete all jobs associated with the company
    await Job.deleteMany({ company: companyId });

    // Delete the company
    await company.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Company and associated jobs deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting company:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
