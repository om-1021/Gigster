import axios from "axios";
import { getApiBaseUrl } from "../helper";
import { config, parse } from "dotenv";
const url = getApiBaseUrl();
console.log("url------>", url);

const newRequest = axios.create({
  baseURL: url,
  withCredentials: true,
});

newRequest.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("currentUser");
    const parsedUser = JSON.parse(user);
    let flag = true;
    if (parsedUser == null) flag = false;

    // const token = localStorage.getItem("acessToken");
    if (flag) {
      // const user = localStorage.getItem("currentUser");
      // const parsedUser = JSON.parse(user);
      const token = parsedUser.accessToken;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default newRequest;
