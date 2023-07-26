import { useMutation } from "@tanstack/react-query";
import {
  customAxiosRequestForPost,
  customAxiosRequestForGet,
} from "src/utils/axiosRequest";
import { toast } from "react-toastify";
import { queryClient } from "src";
import {
  TASK_IN_TODO,
  TASK_IN_PROGRESS,
  TASK_IN_PRIORITY,
  TASK_IN_DONE,
} from "src/constant/queryKey";
import { useQueries } from "@tanstack/react-query";
import { statesOfTaskManager } from "src/constant/Misc";

const queryKeyForTask = [
  TASK_IN_TODO,
  TASK_IN_PROGRESS,
  TASK_IN_PRIORITY,
  TASK_IN_DONE,
];

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
      queryKeyForTask.forEach((status) =>
        queryClient.invalidateQueries(status)
      );
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error);
    },
  });
};

/**
 *
 * @returns Getting all task
 */
const useGetTaskAccordingToStatus = () => {
  const userQueries = useQueries({
    queries: statesOfTaskManager.map((status) => {
      return {
        queryKey: [status],
        queryFn: () => customAxiosRequestForGet("/task", { status }),
        onSuccess: ({ data }) => {
          return data;
        },
      };
    }),
  });

  const data = userQueries?.map((item) => item?.data?.data);
  const isLoading = userQueries?.[0]?.isLoading;
  const status = userQueries?.map((item) => item?.data?.status);

  return { data, status, isLoading };
};

/**
 *
 * @returns Update request
 */

const useUpdateTaskQuery = () => {
  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequestForPost("/task", "put", payload);
    },
    onSuccess: () => {
      toast.success("Task updated successfully!");
      queryKeyForTask.map((status) => queryClient.invalidateQueries(status));
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error);
    },
  });
};

/***
 *
 * @returns Delete Task
 */

const useDeleteTask = (status) => {
  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequestForPost("/task", "delete", payload);
    },
    onSuccess: () => {
      toast.success("Task deleted successfully!");
      queryClient.invalidateQueries([status]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error);
    },
  });
};

export {
  useAddTaskQuery,
  useGetTaskAccordingToStatus,
  useDeleteTask,
  useUpdateTaskQuery,
};
