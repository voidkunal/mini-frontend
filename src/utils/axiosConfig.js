// frontend/src/axios/axiosConfig.js
import axios from "axios";

const API = `${import.meta.env.VITE_BACKEND_URL}/api/v1`;

const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true, // ✅ Send cookies (needed for auth)
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
