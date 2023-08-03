import { useMutation } from "@tanstack/react-query";
import { customAxiosRequestForPost } from "./utils/axiosRequest";
import { useNavigate } from "react-router-dom";
import { setValueToLs } from "./utils/localstorage";
import {
  KEY_FOR_STORING_TOKEN,
  KEY_FOR_STORING_USER_DETAILS,
} from "./constant/Misc";
import { toast } from "react-toastify";

const useLoginQuery = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequestForPost("/login", "post", payload);
    },
    onSuccess: ({ token, user }) => {
      navigate("/");
      setValueToLs(KEY_FOR_STORING_TOKEN, token);
      setValueToLs(KEY_FOR_STORING_USER_DETAILS, user);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error);
    },
  });
};

export default useLoginQuery;
