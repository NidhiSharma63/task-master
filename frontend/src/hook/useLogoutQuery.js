import { useMutation } from "@tanstack/react-query";
import customAxiosRequest from "src/utils/axiosRequest";
import { useNavigate } from "react-router-dom";
import { setValueToLs } from "src/utils/localstorage";
import {
  KEY_FOR_STORING_TOKEN,
  KEY_FOR_STORING_USER_DETAILS,
} from "src/constant/Misc";
import { toast } from "react-toastify";

const useLogoutQuery = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => {
      return customAxiosRequest("/logout", "post");
    },
    onSuccess: () => {
      navigate("/login");
      setValueToLs(KEY_FOR_STORING_TOKEN, null);
      setValueToLs(KEY_FOR_STORING_USER_DETAILS, null);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error);
    },
  });
};

export default useLogoutQuery;
