import axios from "axios";
import toast from "react-hot-toast";

export const BACKEND_SERVER_BASE_URL = "http://localhost:8080/";

const getAccessToken = () => {
  return localStorage.getItem("Authorization");
};

const GLOBAL_SERVICE = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 100000,
});

// - REQUEST INTERCEPTOR -
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

// - RESPONSE INTERCEPTOR -
GLOBAL_SERVICE.interceptors.response.use(
  (response) => response,
  async (error) => {
    // if (error.config?.skipAuthInterceptor) {
    //   return Promise.reject(error);
    // }

    const status = error.response?.status;
    const originalRequest = error.config;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post(
          `${BACKEND_SERVER_BASE_URL}auth/refresh-token`,
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

        // Update Authorization header and retry original request
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return GLOBAL_SERVICE(originalRequest);
      } catch (refreshError) {
        // Refresh token expired or invalid -> force logout
        localStorage.removeItem("Authorization");
        localStorage.removeItem("refreshToken");
        window.location.href = "/"; // Or your login page
        return Promise.reject(refreshError);
      }
    }

    if (error.status === 403) {
      toast.dismiss("No Permission!");
      // alert("Pemission not provided")
      // localStorage.clear();
    }

    if (error.status === 406) {
      toast.success("Please Login!");
      localStorage.removeItem("Authorization");
      // localStorage.clear();
    }

    if (error.status === 500) {
      toast.error("Server error!");
      // localStorage.clear();
    }

    return Promise.reject(error);
  },
);

export default GLOBAL_SERVICE;
