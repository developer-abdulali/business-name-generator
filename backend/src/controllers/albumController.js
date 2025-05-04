// import { v2 as cloudinary } from "cloudinary";
// import { promises as fs } from "fs";
// import albumModel from "../models/albumModel.js";

// export const addAlbum = async (req, res) => {
//   try {
//     const { name, desc, bgColor } = req.body;
//     const imgFile = req.files.image[0];

//     // Upload to Cloudinary first
//     const imgUpload = await cloudinary.uploader.upload(imgFile.path, {
//       resource_type: "image",
//     });

//     // Delete temporary files
//     await Promise.all(fs.unlink(imgFile.path));

//     // Save to MongoDB
//     const albumData = {
//       name,
//       desc,
//       bgColor,
//       image: imgUpload.secure_url,
//     };

//     const album = await albumModel.create(albumData);

//     res.json({
//       success: true,
//       message: "Album uploaded successfully",
//       album,
//     });
//   } catch (error) {
//     console.error("Error uploading album:", error);
//     res.json({
//       success: false,
//       error: error.message || "Internal server error",
//     });
//   }
// };

// export const listAlbums = async (req, res) => {
//   try {
//     const allAlbums = await albumModel.find({});
//     res.json({ success: true, allAlbums });
//   } catch (error) {
//     console.error("Error while fetching albums:", error);
//     res.json({
//       success: false,
//       error: error.message || "Internal server error",
//     });
//   }
// };

// export const removeAlbum = async (req, res) => {
//   try {
//     await albumModel.findByIdAndDelete(req.body.id);
//     res.json({ success: true, message: "Album removed" });
//   } catch (error) {
//     console.error("Error while removing album:", error);
//     res.json({
//       success: false,
//       error: error.message || "Internal server error",
//     });
//   }
// };

import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "fs";
import albumModel from "../models/albumModel.js";

// Configure Cloudinary (should be at the top level)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const addAlbum = async (req, res) => {
  try {
    const { name, desc, bgColor } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "Image file is required",
      });
    }

    // Upload to Cloudinary
    const imgUpload = await cloudinary.uploader.upload(req.file.path, {
      folder: "music/album-covers",
    });

    // Delete temporary file
    await fs.unlink(req.file.path);

    // Save to MongoDB
    const albumData = {
      name,
      desc,
      bgColor,
      image: imgUpload.secure_url,
      publicId: imgUpload.public_id,
    };

    const album = await albumModel.create(albumData);

    res.status(201).json({
      success: true,
      message: "Album created successfully",
      album,
    });
  } catch (error) {
    console.error("Error creating album:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};

export const listAlbums = async (req, res) => {
  try {
    const albums = await albumModel.find({});
    res.status(200).json({
      success: true,
      count: albums.length,
      albums,
    });
  } catch (error) {
    console.error("Error fetching albums:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};

export const removeAlbum = async (req, res) => {
  try {
    const { id } = req.params;

    // First find the album to get Cloudinary public_id
    const album = await albumModel.findById(id);

    if (!album) {
      return res.status(404).json({
        success: false,
        error: "Album not found",
      });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(album.publicId);

    // Delete from MongoDB
    await albumModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Album deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting album:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};
