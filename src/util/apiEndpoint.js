export const BASE_URL = "https://moneymanagerspringboot.onrender.com/api/v1.0";

const CLOUDINARY_CLOUD_NAME = "dc6sqaxbb";


export const ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
};