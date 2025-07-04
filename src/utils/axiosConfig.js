// utils/axiosConfig.js
import axios from "axios";

// Detect environment
const isDev = import.meta.env.MODE === "development";

// Build base URL
const baseURL = isDev
  ? "/api/v1" // local dev - proxy handles it
  : `${import.meta.env.VITE_BACKEND_URL}/api/v1`; // Vercel prod build

// Create axios instance
const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // ✅ Essential for sending cookies (auth)
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // optional: avoids long waits
});

// Optional: Add interceptors for logging or token error debugging
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
