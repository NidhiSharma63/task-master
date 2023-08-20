import { useMutation } from "@tanstack/react-query";
import { customAxiosRequestForPost } from "src/utils/axiosRequest";
import { useNavigate } from "react-router-dom";
import { setValueToLs } from "src/utils/localstorage";
import {
  KEY_FOR_STORING_TOKEN,
  KEY_FOR_STORING_USER_DETAILS,
} from "src/constant/Misc";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { isBackDropLoaderDisplayed } from "src/redux/boolean/booleanSlice";

const useLogoutQuery = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: () => {
      return customAxiosRequestForPost("/logout", "post");
    },
    onSuccess: () => {
      navigate("/login");
      setValueToLs(KEY_FOR_STORING_TOKEN, null);
      setValueToLs(KEY_FOR_STORING_USER_DETAILS, null);
      dispatch(isBackDropLoaderDisplayed(false));
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error);
      dispatch(isBackDropLoaderDisplayed(false));
    },
  });
};

export default useLogoutQuery;
