import axios, { AxiosInstance } from "axios";

const axiosConfig = {
  baseURL: process.env.AXIOS_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const axiosClient: AxiosInstance = axios.create(axiosConfig);

export default axiosClient;
