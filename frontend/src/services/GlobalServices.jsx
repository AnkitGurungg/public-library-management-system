import axios from "axios";
import toast from "react-hot-toast";
import { env } from "../config/env";

export const BACKEND_SERVER_BASE_URL = env.API_BASE_URL;

const getAccessToken = () => {
  return localStorage.getItem("Authorization");
};

let isRefreshing = false; // Tracks if refresh-token request is in progress
let failedQueue = []; // Queue for requests that failed with 401

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
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

    // Skip calling /refresh-token, even if these apis return Unauthorized(401).
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

    // Handle 401 Unauthorized errors
    if (status === 401 && !originalRequest._retryFlag) {
      // Call /refresh-token api only once per req.
      // (/auth/refresh-token api could cause infinite retry loop, _retry prevents infinite retries on the same request)
      originalRequest._retryFlag = true;

      if (isRefreshing) {
        // If refresh request is already in progress, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              resolve(GLOBAL_SERVICE(originalRequest));
            },
            reject,
          });
        });
      }
      isRefreshing = true;

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

        // Process all queued requests
        processQueue(null, newAccessToken);

        // Retry the original request with new updated access token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return GLOBAL_SERVICE(originalRequest);
      } catch (refreshError) {
        // If refresh fails, reject all queued requests and force logout
        processQueue(refreshError, null);
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
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
