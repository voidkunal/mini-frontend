import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api/v1",
  withCredentials: true, // ✅ send cookies (e.g., token cookie)
});

export default axiosInstance;
