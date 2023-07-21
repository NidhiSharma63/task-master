import { useMutation } from "@tanstack/react-query";
import customAxiosRequest from "src/utils/axiosRequest";
import { toast } from "react-toastify";

const useProjectQuery = () => {
  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequest("/projects", "post", payload);
    },
    onSuccess: () => {
      toast.success("Project created successfully!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error);
    },
  });
};

export default useProjectQuery;
