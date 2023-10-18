import axios from 'axios';
import {
  BASE_URL,
  KEY_FOR_STORING_TOKEN,
  KEY_FOR_STORING_USER_DETAILS,
} from '../constant/Misc';
import { AxiosInstanceConfig } from '../constant/axiosInstance';
import { getValueFromLS } from './localstorage';

/**
 * interface
 */
interface Params {
  [key: string]: string | number | boolean;
}

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
    console.log(error, 'This is error');
    throw error;
  }
}

const customAxiosRequestForGet = async (url: string, params: Params) => {
  const userId = getValueFromLS(KEY_FOR_STORING_USER_DETAILS)._id;
  let paramsToPass = {};
  if (!userId) {
    throw new Error('User id is not present');
  }

  if (userId) {
    paramsToPass = { ...params, userId };
  }

  // console.log(paramsToPass, ":::params to pass");
  try {
    const response = await axiosRequest({
      url,
      method: 'get',
      params: paramsToPass,
    });
    return response;
  } catch (error) {
    throw error; // Re-throw the error to propagate it to the caller
  }
};

const customAxiosRequestForPost = async (
  url: string,
  method = 'post',
  payload: Params,
) => {
  const userId = getValueFromLS(KEY_FOR_STORING_USER_DETAILS)?._id;

  let updatedPayload = { ...payload };
  if (userId) {
    updatedPayload = { ...payload, userId };
  }

  try {
    const response = await axiosRequest({
      url,
      method,
      data: updatedPayload,
    });
    return response;
  } catch (error) {
    throw error; // Re-throw the error to propagate it to the caller
  }
};

// export default customAxiosRequest;
export { customAxiosRequestForGet, customAxiosRequestForPost };
