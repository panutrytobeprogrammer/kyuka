import axios from "axios";
import { env } from "next-runtime-env";
import { v4 } from "uuid";

const baseUrl = env("NEXT_PUBLIC_URL");

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
