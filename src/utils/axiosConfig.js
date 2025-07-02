// src/axios/axiosConfig.js
import axios from "axios";

const API = (import.meta.env.VITE_BACKEND_URL || "http://localhost:4000") + "/api/v1";

const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true, // ✅ Allow sending cookies (important for auth)
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
