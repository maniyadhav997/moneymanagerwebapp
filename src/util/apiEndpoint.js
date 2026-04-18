//export const BASE_URL = "https://moneymanagerspringboot.onrender.com/api/v1.0";

export const BASE_URL = "http://localhost:8080/api/v1.0";

const CLOUDINARY_CLOUD_NAME = "dc6sqaxbb";


export const ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  GET_USER_INFO: "/profile",
  GET_ALL_CATEGORIES: "/categories",
  UPDATE_CATEGORY:(categoryId) => `/categories/${categoryId}`,
  ADD_CATEGORY: "/categories",
  GET_ALL_INCOMES: "/incomes",
  ADD_INCOME: "/incomes",
  CATEGORY_BY_TYPE: (type) => `/categories/${type}`,
  UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
};