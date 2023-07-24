import { useMutation } from "@tanstack/react-query";
import {
  customAxiosRequestForPost,
  customAxiosRequestForGet,
} from "src/utils/axiosRequest";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "src";

// post
const useAddTaskQuery = () => {
  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequestForPost("/task", "post", payload);
    },
    onSuccess: () => {
      toast.success("Task created successfully!");
      queryClient.invalidateQueries("Task");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error);
    },
  });
};

const getAllTaskInTodo = async () => {
  const res = await customAxiosRequestForGet("/task", "get");
  return res;
};

//get

const useGetProjectQuery = () => {
  return useQuery({
    queryKey: ["Task-In-Todo"],
    queryFn: getAllTaskInTodo,
    onError: (error) => {
      toast.error(error?.response?.data?.error);
    },
  });
};

export { useGetProjectQuery, useAddTaskQuery };
