import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_BASE_URL + "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
  },
});

instance.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json; charset=utf-8";
  config.headers.Accept = "application/json";

  // const user = JSON.parse(localStorage.getItem('user'));
  // if (user) {
  //     config.headers.username = user.username;
  //     config.headers.password = user.password;
  // }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    if (response && response.data !== undefined) {
      // only get data
      return response.data;
    }

    return response;
  },
  async (error) => {
    throw error;
  }
);

export default instance;
