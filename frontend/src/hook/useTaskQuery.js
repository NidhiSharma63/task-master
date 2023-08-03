import { useMutation } from "@tanstack/react-query";
import {
  customAxiosRequestForPost,
  customAxiosRequestForGet,
} from "../utils/axiosRequest";
import { toast } from "react-toastify";
import { queryClient } from "../index";
import { useQueries } from "@tanstack/react-query";
import { statesOfTaskManager } from "../constant/Misc";
import { useSelector } from "react-redux";
import { projectDataInStore } from "../redux/projects/projectSlice";
import { queryKeyForTask } from "../constant/queryKey";

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
      queryClient.invalidateQueries(["charts-data"]);
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
  const { active_project } = useSelector(projectDataInStore);

  const userQueries = useQueries({
    queries: statesOfTaskManager.map((status) => {
      return {
        queryKey: [status, active_project],
        queryFn: () =>
          customAxiosRequestForGet("/task", {
            status,
            projectName: active_project,
          }),
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
 * @returns Update request drag and drop
 */

const useUpdateTaskQuery = () => {
  let state;
  return useMutation({
    mutationFn: (payload) => {
      const { status } = payload;
      state = status;
      return customAxiosRequestForPost("/task", "put", payload);
    },
    onSuccess: () => {
      toast.success("Task updated successfully!");
      queryClient.invalidateQueries(state);
      queryClient.invalidateQueries(["charts-data"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error);
    },
  });
};

/**
 *
 * @returns Update request drag and drop
 */

const useUpdateTaskQueryWithStatus = () => {
  let state;
  return useMutation({
    mutationFn: (payload) => {
      const { status } = payload;
      state = status;
      return customAxiosRequestForPost("/task/status", "put", payload);
    },
    onSuccess: () => {
      toast.success("Task updated successfully!");
      queryClient.invalidateQueries(state);
      queryClient.invalidateQueries(["charts-data"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error);
    },
  });
};

/**
 *
 * @returns Update request with details
 */

const useUpdateTaskQueryWithDetails = () => {
  let state;
  return useMutation({
    mutationFn: (payload) => {
      const { status } = payload;
      state = status;
      return customAxiosRequestForPost("/task/details", "put", payload);
    },
    onSuccess: () => {
      toast.success("Task updated successfully!");
      queryClient.invalidateQueries(state);
      queryClient.invalidateQueries(["charts-data"]);
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
  const { active_project } = useSelector(projectDataInStore);
  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequestForPost("/task", "delete", payload);
    },
    onSuccess: () => {
      toast.success("Task deleted successfully!");
      queryClient.invalidateQueries([status, active_project]);
      queryClient.invalidateQueries(["charts-data"]);
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
  useUpdateTaskQueryWithStatus,
  useUpdateTaskQueryWithDetails,
};
