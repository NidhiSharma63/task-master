import axios from "axios";
import { AxiosInstanceConfig } from "../constant/axiosInstance";
import { BASE_URL } from "../constant/Misc";

// defining axios instance
const axiosInstance = axios.create({
  ...AxiosInstanceConfig,
  baseURL: BASE_URL,
});

// AxiosResponseInterceptor(axiosInstance);

async function axiosRequest({ ...options }) {
  // const AUTH_TOKEN = getValueFromLS("token");
  //   axiosInstance.defaults.headers.common.Authorization = AUTH_TOKEN;

  try {
    const response = await axiosInstance(options);
    return Promise.resolve(response.data);
  } catch (error) {
    // throw new Error("An error occurred. Please try again.");
  }
}

const customAxiosRequest = async (url, method = "post", payload) => {
  const response = await axiosRequest({ url, method, data: payload });
  return response;
};

export default customAxiosRequest;
