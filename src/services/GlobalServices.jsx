import axios from "axios";
import toast from "react-hot-toast";

export const BACKEND_SERVER_BASE_URL = "http://localhost:8080/";

const getToken = () => {
  // localStorage.setItem("Authorization", localStorage.getItem("Authorization"));
  // localStorage.setItem("x-refresh-token", localStorage.getItem("x-refresh-token"));
  return localStorage.getItem("Authorization");
};

const GLOBAL_SERVICE = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

GLOBAL_SERVICE.interceptors.request.use(
  (config) => {
    if (!config.skipAuthInterceptor && getToken()) {
      console.log(`Bearer ${getToken()}`);
      config.headers["Authorization"] = `Bearer ${getToken()}`;
    }

    // if (getToken()) {
    //   console.log(`Bearer ${getToken()}`);
    //   config.headers["Authorization"] = `Bearer ${getToken()}`;
    // }

    // console.warn("Intercptor Request: ", config);
    return config;
  },
  (error) => {
    // console.log("Interceptor request error: ", error);
    return Promise.reject(error);
  }
);

GLOBAL_SERVICE.interceptors.response.use(
  function (response) {
    // console.log("Intercptor Response: ", response);
    return response;
  },

  function (error) {
    console.log(error.config);
    if (error.config?.skipAuthInterceptor) {
      return Promise.reject(error);
    }

    // console.log("Intercptor Response Error: ", error);
    if (error.status === 401) {
      toast.success(error.response?.data?.message || "Not Authorized");
      // alert("You are not unauthorized")
      // localStorage.clear();
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
  }
);

export default GLOBAL_SERVICE;
