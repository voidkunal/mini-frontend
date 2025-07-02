import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"; // ✅ Correct way for Vite env

const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true, // ✅ Allow sending cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
