import axios, { AxiosInstance } from "axios";

export const instance = (contentType?: string): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": contentType ? contentType : "application/json",
    },
    // withCredentials: true,
  });

  // axiosInstance.interceptors.request.use((config): AxiosRequestConfig => {
  //   if (config.headers && getStorLocal("user").token) {
  //     config.headers.token = getStorLocal("user").token;
  //   }

  //   return config;
  // });
  return axiosInstance;
};
