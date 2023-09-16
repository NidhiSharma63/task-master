import { useMutation } from "@tanstack/react-query";
import { customAxiosRequestForPost, customAxiosRequestForGet } from "src/utils/axiosRequest";
import { toast } from "react-toastify";
import { queryClient } from "src/index";
import { useQueries } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { projectDataInStore } from "src/redux/projects/projectSlice";
import {
  isBackDropLoaderDisplayed,
  isTaskDisplayed,
  isUpdatingTask,
  showLoaderForTask,
} from "src/redux/boolean/booleanSlice";
import { useMemo } from "react";
import { statusDataInStore } from "src/redux/status/statusSlice";
/**
 *
 * @returns Post request for adding task with status
 */
const useAddTaskQuery = () => {
  const { total_status } = useSelector(statusDataInStore);

  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequestForPost("/task", "post", payload);
    },
    onSuccess: () => {
      // toast.success("Task created successfully!");
      total_status.forEach((status) => queryClient.invalidateQueries(status));
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
  const { total_status } = useSelector(statusDataInStore);
  const dispatch = useDispatch();

  const userQueries = useQueries({
    queries: total_status?.map((status) => {
      return {
        queryKey: [status, active_project],
        queryFn: () =>
          customAxiosRequestForGet("/task", {
            status,
            projectName: active_project,
          }),
        onSuccess: ({ data }) => {
          setTimeout(() => {
            console.log("I RUN TO DO FASLE ERVERYTHING");
            dispatch(isBackDropLoaderDisplayed(false));
            dispatch(isTaskDisplayed(true));
            dispatch(showLoaderForTask(false));
            dispatch(isUpdatingTask(false));
          }, 100);
          return data;
        },
      };
    }),
  });

  const data = useMemo(() => userQueries?.map((item) => item?.data?.data), [userQueries]);
  // const isLoading = userQueries?.[0]?.isLoading;
  // const status = userQueries?.map((item) => item?.data?.status);

  return { data };
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
      // toast.success("Task updated successfully!");
      queryClient.invalidateQueries(state);
      queryClient.invalidateQueries(["charts-data"]);
      // setTimeout(() => {
      //   dispatch(isUpdatingTask(false));
      // }, 500);
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
  const dispatch = useDispatch();
  let state;
  return useMutation({
    mutationFn: (payload) => {
      const { status } = payload;
      state = status;
      return customAxiosRequestForPost("/task/status", "put", payload);
    },
    onSuccess: () => {
      // toast.success("Task updated successfully!");
      queryClient.invalidateQueries(state);
      queryClient.invalidateQueries(["charts-data"]);
      setTimeout(() => {
        dispatch(isUpdatingTask(false));
      }, 1000);
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

/**
 *
 * @returns Getting all task for home component
 */
const useGetAllTaskAccordingToStatusForEachProject = () => {
  const { total_status } = useSelector(statusDataInStore);

  const userQueries = useQueries({
    queries: total_status.map((status) => {
      return {
        queryKey: [status, "All-task"],
        queryFn: () =>
          customAxiosRequestForGet("/project/status/alltasks", {
            status,
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

export {
  useAddTaskQuery,
  useGetTaskAccordingToStatus,
  useDeleteTask,
  useUpdateTaskQuery,
  useUpdateTaskQueryWithStatus,
  useUpdateTaskQueryWithDetails,
  useGetAllTaskAccordingToStatusForEachProject,
};
