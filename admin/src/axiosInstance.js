import axios from "axios";

function getAuthToken() {
  try {
    const loggedInUser = window.localStorage.getItem("loggedUser");
    if (!loggedInUser) return null;
    const token = JSON.parse(loggedInUser).token;
    return typeof token === "string" ? token : null;
  } catch {
    return null;
  }
}

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  function (config) {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export { axiosInstance };
