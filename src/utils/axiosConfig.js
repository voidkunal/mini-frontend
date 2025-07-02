// frontend/src/utils/axiosConfig.js
import axios from "axios";

const API = "https://mini-backend-a8ay.onrender.com/api/v1";

const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true, // ✅ Required for sending cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
