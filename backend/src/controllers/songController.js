import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "fs";
import songModel from "../models/songModel.js";

export const addSong = async (req, res) => {
  try {
    const { name, desc, album } = req.body;

    if (!req.files || !req.files.audio || !req.files.image) {
      return res
        .status(400)
        .json({ error: "Audio and image files are required" });
    }

    const audioFile = req.files.audio[0];
    const imgFile = req.files.image[0];

    // Upload to Cloudinary first
    const [audioUpload, imgUpload] = await Promise.all([
      cloudinary.uploader.upload(audioFile.path, {
        resource_type: "auto",
        folder: "music/audio",
      }),
      cloudinary.uploader.upload(imgFile.path, {
        folder: "music/covers",
      }),
    ]);

    // Calculate duration after audioUpload is available
    const durationInSeconds = audioUpload.duration;
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    const duration = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    // Delete temporary files
    await Promise.all([fs.unlink(audioFile.path), fs.unlink(imgFile.path)]);

    // Save to MongoDB
    const songData = {
      name,
      desc,
      album,
      file: audioUpload.secure_url,
      image: imgUpload.secure_url,
      duration,
      publicId: audioUpload.public_id,
    };

    const song = await songModel.create(songData);

    res.json({
      success: true,
      message: "Song uploaded successfully",
      song,
    });
  } catch (error) {
    console.error("Error uploading song:", error);
    res.json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};

export const listSong = async (req, res) => {
  try {
    const allSongs = await songModel.find({});
    res.json({ success: true, allSongs });
  } catch (error) {
    console.error("Error while fetching songs:", error);
    res.json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};

export const removeSong = async (req, res) => {
  try {
    await songModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Song removed" });
  } catch (error) {
    console.error("Error while removing song:", error);
    res.json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};
