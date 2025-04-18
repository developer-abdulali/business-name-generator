import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const res = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMG, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (!res.data.imageUrl) {
      throw new Error("Image upload failed");
    }

    return res.data;
  } catch (error) {
    console.error("Error uploading the image:", error);
    throw error;
  }
};

export default uploadImage;
