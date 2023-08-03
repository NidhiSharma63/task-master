import { customAxiosRequestForPost } from "../utils/axiosRequest";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setValueToLs } from "../utils/localstorage";
import {
  KEY_FOR_STORING_TOKEN,
  KEY_FOR_STORING_USER_DETAILS,
} from "../constant/Misc";
import { useDispatch } from "react-redux";
import { userEmail } from "../redux/auth/userSlice";

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
      toast.error(error?.response?.data?.error);
    },
  });
};

export default useRegisterQuery;
