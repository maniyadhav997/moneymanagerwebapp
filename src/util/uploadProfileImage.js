import { ENDPOINTS } from "./apiEndpoint";

const CLOUDINARY_UPLOAD_PRESET = "moneymanager";

const uploadProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  try{
        const response = await fetch(ENDPOINTS.UPLOAD_IMAGE, {
        method: "POST",
        body: formData,
    });
    if(!response.ok){
        const errorData = await response.json();
        console.error(`Cloudinary upload error:, ${errorData.error.message || response.statusText}`);
        throw new Error("Cloudinary upload failed");
    }
    const data = await response.json();
    console.log("Image uploaded successfully:", data);
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
  
};

export default uploadProfileImage;