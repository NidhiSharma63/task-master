import { customAxiosRequestForPost } from "src/utils/axiosRequest";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setValueToLs } from "src/utils/localstorage";
import {
  KEY_FOR_STORING_TOKEN,
  KEY_FOR_STORING_USER_DETAILS,
} from "src/constant/Misc";
import { useDispatch } from "react-redux";
import { userEmail } from "src/redux/auth/userSlice";
import { isBackDropLoaderDisplayed } from "src/redux/boolean/booleanSlice";

const useRegisterQuery = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequestForPost("/register", "post", payload);
    },
    onSuccess: ({ token, user }) => {
      navigate("/"); // Navigate to the home page
      setValueToLs(KEY_FOR_STORING_TOKEN, token);
      setValueToLs(KEY_FOR_STORING_USER_DETAILS, user);
      dispatch(userEmail(user.email));
    },
    onError: (error) => {
      toast.error(error?.response?.data);
      dispatch(isBackDropLoaderDisplayed(false));
    },
  });
};

export default useRegisterQuery;
