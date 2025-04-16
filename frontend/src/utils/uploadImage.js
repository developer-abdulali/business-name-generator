import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  // Append img file to form data
  formData.append("image", imageFile);

  try {
    const res = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMG, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  } catch (error) {
    console.log("Error uploading the image:", error);
    throw error;
  }
};

export default uploadImage;
