import axios from "axios";
import { AxiosInstanceConfig } from "./axiosInstance";
import { BASE_URL } from "../constant/Misc";

// defining axios instance
const axiosInstance = axios.create({ AxiosInstanceConfig, BASE_URL });

// AxiosResponseInterceptor(axiosInstance);

async function axiosRequest({ ...options }) {
  // const AUTH_TOKEN = getValueFromLS("token");
  //   axiosInstance.defaults.headers.common.Authorization = AUTH_TOKEN;

  try {
    const response = await axiosInstance(options);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

export default axiosRequest;
