import axios from "axios";

const isDev = import.meta.env.MODE === "development";

// Use proxy for dev, real URL for prod
const baseURL = isDev
  ? "/api/v1"
  : `${import.meta.env.VITE_BACKEND_URL}/api/v1`;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Attach token from localStorage to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: logging errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
