import axios from "axios";

export const BACKEND_SERVER_BASE_URL = "http://localhost:8080/"

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
    if (getToken()) {
      config.headers["Authorization"] = `Bearer ${getToken()}`;
    }
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
    // console.log("Intercptor Response Error: ", error);
    if (error.status === 401) {
      alert("You are not unauthorized")
      // localStorage.clear();
    }
    if (error.status === 403) {
      alert("Pemission not provided")
      // localStorage.clear();
    }
    if (error.status === 406) {
      console.log("406")
      localStorage.removeItem("Authorization")
      // localStorage.clear();
    }
    if (error.status === 500) {
      // localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default GLOBAL_SERVICE;
