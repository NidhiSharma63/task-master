import customAxiosRequest from "src/utils/axiosRequest";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setValueToLs } from "src/utils/localstorage";
import { KEY_FOR_STORING_TOKEN } from "src/constant/Misc";

const useRegisterQuery = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequest("/register", "post", payload);
    },
    onSuccess: ({ token }) => {
      navigate("/"); // Navigate to the home page
      setValueToLs(KEY_FOR_STORING_TOKEN, token);
    },
    onError: (error) => {
      console.log("error block");
      toast.error(error);
    },
  });
};

export default useRegisterQuery;
