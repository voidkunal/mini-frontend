import axios from "axios";

axios.defaults.withCredentials = true; // Ensure cookies (JWTs) are sent with requests

const API = process.env.VITE_BACKEND_URL || "https://mini-backend-a8ay.onrender.com";

export const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
