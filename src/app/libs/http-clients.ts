import axios from "axios";
import { v4 } from "uuid";

const baseUrl = process.env.BACKEND_URL;

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    "content-type": "application/json",
    "X-Frame-Options": "deny",
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "no-cache, no-store",
    "Content-Security-Policy": "default-src'self'",
  },
  // withCredentials: true,
});

instance.interceptors.request.use(async (config) => {
  config.headers["X-Request-ID"] = v4();
  config.headers["Authorization"] = `Bearer ${sessionStorage.getItem(
    "access_token"
  )}`;
  return config;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

export default instance;
