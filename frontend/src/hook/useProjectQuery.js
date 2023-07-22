import { useMutation } from "@tanstack/react-query";
import customAxiosRequest from "src/utils/axiosRequest";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const usePostProjectQuery = () => {
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

const getAllProjects = async () => {
  const res = await customAxiosRequest("/projects", "get");
  return res;
};

const useGetProjectQuery = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
    onError: (error) => {
      toast.error(error?.response?.data?.error);
    },
  });
};

export { useGetProjectQuery, usePostProjectQuery };
