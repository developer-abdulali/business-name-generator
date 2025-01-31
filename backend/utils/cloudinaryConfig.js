import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file, folder) => {
  const fileBuffer = file.buffer;
  const fileDataUri = `data:${file.mimetype};base64,${fileBuffer.toString(
    "base64"
  )}`;
  const result = await cloudinary.uploader.upload(fileDataUri, {
    folder: folder,
    resource_type: "auto",
  });
  return result.secure_url;
};
