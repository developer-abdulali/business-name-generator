import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

const connectCloudinary = async () => {
  await cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET,
  });
};

export default connectCloudinary;
