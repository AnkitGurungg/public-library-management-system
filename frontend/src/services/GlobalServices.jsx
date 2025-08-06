import axios from "axios";
import toast from "react-hot-toast";
import { env } from "../config/env";

export const BACKEND_SERVER_BASE_URL = env.API_BASE_URL;

const getAccessToken = () => {
  return localStorage.getItem("Authorization");
};

const GLOBAL_SERVICE = axios.create({
  baseURL: BACKEND_SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 100000,
});

// REQUEST INTERCEPTOR
GLOBAL_SERVICE.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (!config.skipAuthInterceptor && accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    // console.warn("IntercptorRequestConfig: ", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// RESPONSE INTERCEPTOR
GLOBAL_SERVICE.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const originalRequest = error.config;

    // Prevent sending /refresh-token req, even if these apis return Unauthorized(401).
    // As these apis do not require auth and could cause infinite retry loop if we attempt token refresh on them.
    const skipAuthUrls = [
      "/auth/login",
      "/auth/register",
      "/auth/refresh-token",
    ];
    if (skipAuthUrls.some((url) => originalRequest.url.includes(url))) {
      return Promise.reject(error);
    }

    // If skipAuthInterceptor flag is set on the request, do not attempt token refresh.(Safe check)
    // Just reject the error and let the calling function handle it.
    if (originalRequest?.skipAuthInterceptor) {
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest._retryFlag) {
      // Call /refresh-token api only once per req.
      // (/auth/refresh-token api could cause infinite retry loop, _retry prevents infinite retries on the same request)
      originalRequest._retryFlag = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post(
          `${BACKEND_SERVER_BASE_URL}/auth/refresh-token`,
          { refreshToken },
          {
            skipAuthInterceptor: true,
            headers: { "Content-Type": "application/json" },
          },
        );

        const newAccessToken = res.data.Authorization;
        const newRefreshToken = res.data.refreshToken;

        // Save new tokens
        localStorage.setItem("Authorization", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // Retry the original request with new updated access token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return GLOBAL_SERVICE(originalRequest);
      } catch (refreshError) {
        // If /refresh-token req failed then, force logout
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    if (error.status === 403) {
      toast.dismiss("No Permission!");
    }

    if (error.status === 406) {
      toast.success("Please Login!");
      localStorage.clear();
    }

    if (error.status === 500) {
      toast.error("Server error!");
    }

    return Promise.reject(error);
  },
);

export default GLOBAL_SERVICE;
