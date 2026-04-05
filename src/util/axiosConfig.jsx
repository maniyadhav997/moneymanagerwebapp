import axios from "axios";
import { BASE_URL } from "./apiEndpoint"; 

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 second timeout for Render.com cold starts
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//list of endpoints that do not require authentication
const excludeEndpoints = ["/login", "/register", "/status", "/activate", "/health"];

// Add a request interceptor to include the token in the headers
axiosConfig.interceptors.request.use(
  (config) => {
    const shouldSkipToken = excludeEndpoints.some((endpoint) => config.url?.includes(endpoint));
    if (!shouldSkipToken) {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//response interceptor 

axiosConfig.interceptors.response.use(
  (response) => {
    return response;    
    }, (error) => {
        if(error.response && error.response.status === 401) {
            window.location.href = "/login";
        } else if (error.response && error.response.status === 500) {
            // Handle 500 errors
            console.error("Server error:", error.response.data);
        } else if(error.code === "ECONNABORTED") {
            // Handle timeout errors
            console.error("Request timed out:", error.message);
        } else {
            console.error("An error occurred:", error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosConfig;