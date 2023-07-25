import { useMutation } from "@tanstack/react-query";
import {
  customAxiosRequestForPost,
  customAxiosRequestForGet,
} from "src/utils/axiosRequest";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "src";
import {
  TASK_IN_TODO,
  TASK_IN_PROGRESS,
  TASK_IN_PRIORITY,
  TASK_IN_DONE,
} from "src/constant/queryKey";

/**
 *
 * @returns Post request for adding task with status
 */
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

/**
 *
 * @returns Task in Todo
 */

const getAllTaskInTodo = async () => {
  const res = await customAxiosRequestForGet("/task/todo", "get");
  return res;
};

const useGetTaskInTodo = () => {
  return useQuery({
    queryKey: [TASK_IN_TODO],
    queryFn: getAllTaskInTodo,
    onError: (error) => {
      toast.error(error?.response?.data?.error);
    },
  });
};

/**
 *
 * @returns Task in progress
 */

const getAllTaskInProgress = async () => {
  const res = await customAxiosRequestForGet("/task/inprogress", "get");
  return res;
};

const useGetTaskInProgress = () => {
  return useQuery({
    queryKey: [TASK_IN_PROGRESS],
    queryFn: getAllTaskInProgress,
    onError: (error) => {
      toast.error(error?.response?.data?.error);
    },
  });
};

/**
 *
 * @returns Task in priority
 */

const getAllTaskInPriority = async () => {
  const res = await customAxiosRequestForGet("/task/inpriority", "get");
  return res;
};

const useGetTaskInPriority = () => {
  return useQuery({
    queryKey: [TASK_IN_PRIORITY],
    queryFn: getAllTaskInPriority,
    onError: (error) => {
      toast.error(error?.response?.data?.error);
    },
  });
};

/**
 *
 * @returns Task in done
 */

const getAllTaskInDone = async () => {
  const res = await customAxiosRequestForGet("/task/done", "get");
  return res;
};

const useGetTaskInDone = () => {
  return useQuery({
    queryKey: [TASK_IN_DONE],
    queryFn: getAllTaskInDone,
    onError: (error) => {
      toast.error(error?.response?.data?.error);
    },
  });
};

export {
  useGetTaskInTodo,
  useAddTaskQuery,
  useGetTaskInProgress,
  useGetTaskInDone,
  useGetTaskInPriority,
};
