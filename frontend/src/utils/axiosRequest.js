import axios from "axios";
import { AxiosInstanceConfig } from "../constant/axiosInstance";
import { BASE_URL, KEY_FOR_STORING_TOKEN } from "../constant/Misc";
import { getValueFromLS } from "src/utils/localstorage";
import { KEY_FOR_STORING_USER_DETAILS } from "src/constant/Misc";

// defining axios instance
const axiosInstance = axios.create({
  ...AxiosInstanceConfig,
  baseURL: BASE_URL,
});

// AxiosResponseInterceptor(axiosInstance);

async function axiosRequest({ ...options }) {
  const AUTH_TOKEN = getValueFromLS(KEY_FOR_STORING_TOKEN);
  //   axiosInstance.defaults.headers.common.Authorization = AUTH_TOKEN;

  if (AUTH_TOKEN) {
    axiosInstance.defaults.headers.Authorization = AUTH_TOKEN;
  }
  try {
    const response = await axiosInstance(options);
    return Promise.resolve(response.data);
  } catch (error) {
    console.log(error, "This is error");
    throw error;
  }
}

const customAxiosRequest = async (url, method = "post", payload) => {
  const userId = getValueFromLS(KEY_FOR_STORING_USER_DETAILS)._id;
  let readyPayload = {};
  if (userId) {
    readyPayload = { ...payload, userId: userId };
  }

  try {
    const response = await axiosRequest({
      url,
      method,
      data: userId ? readyPayload : payload,
    });
    return response;
  } catch (error) {
    throw error; // Re-throw the error to propagate it to the caller
  }
};

export default customAxiosRequest;
