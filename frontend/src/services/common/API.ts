import axios, { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
  baseURL: "http://localhost:5000",
  timeout: 180000,
  headers: {
    Accept: "application/json",
  },
};

export default axios.create(axiosConfig);
