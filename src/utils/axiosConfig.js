// utils/axiosConfig.js
import axios from "axios";

const isDev = process.env.NODE_ENV === "development";
const baseURL = isDev
  ? "/api/v1"                                                   // ← goes to localhost:3000/api → proxy → your backend
  : import.meta.env.VITE_BACKEND_URL + "/api/v1";              // ← production

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosInstance;
