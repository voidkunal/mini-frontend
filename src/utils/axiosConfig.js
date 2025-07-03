import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // ✅ ensures cookies sent across domains
});

export default axiosInstance;
