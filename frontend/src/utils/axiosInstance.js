import axios from "axios";
import { BACKEND_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors globally
    if (error.response) {
      if (error.response.status === 401) {
        // Token expired or unauthorized
        console.error("Unauthorized! Redirecting to login...");
        // Redirect to login page
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.log("Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.log("Request timeout. Please try again.");
    }
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       if (error.response.status === 401) {
//         // Only redirect if we're not already on the login page
//         if (!window.location.pathname.includes("/login")) {
//           localStorage.removeItem("token");
//           window.location.href = "/login";
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );
export default axiosInstance;
