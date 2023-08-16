import { useMutation } from "@tanstack/react-query";
import {
  customAxiosRequestForPost,
  customAxiosRequestForGet,
} from "../utils/axiosRequest";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../index";
import { queryKeyForTask } from "../constant/queryKey";
import { useSelector } from "react-redux";
import { projectDataInStore } from "../redux/projects/projectSlice";

/**
 * use post column query
 */
const usePostColumnQuery = () => {
  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequestForPost("/column", "post", payload);
    },
    onSuccess: () => {
      toast.success("Section created successfully!");
      queryClient.invalidateQueries("projects");
      queryKeyForTask.forEach((status) =>
        queryClient.invalidateQueries(status)
      );
      queryClient.invalidateQueries(["charts-data"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data);
    },
  });
};

/**
 * get column
 */

const useGetColumnQuery = () => {
  const { active_project } = useSelector(projectDataInStore);

  return useQuery({
    queryKey: ["column", active_project],
    queryFn: () => {
      return customAxiosRequestForGet("/column", {
        projectName: active_project,
      });
    },
    onSuccess: ({ data }) => {
      return data;
    },
    onError: (error) => {
      toast.error(error?.response?.data);
    },
  });
};

/**
 * update col name
 */

const useUpdateColumnName = () => {
  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequestForPost("/column", "put", payload);
    },
    onSuccess: () => {
      toast.success("Section updated successfully!");
      queryClient.invalidateQueries("projects");
      queryClient.invalidateQueries("column");
      queryKeyForTask.forEach((status) =>
        queryClient.invalidateQueries(status)
      );
      queryClient.invalidateQueries(["charts-data"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data);
    },
  });
};

/**
 * delete col name
 */

const useDeleteColumnName = () => {
  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequestForPost("/column", "delete", payload);
    },
    onSuccess: () => {
      toast.success("Section deleted successfully!");
      queryClient.invalidateQueries("projects");
      queryClient.invalidateQueries("column");
      queryKeyForTask.forEach((status) =>
        queryClient.invalidateQueries(status)
      );
      queryClient.invalidateQueries(["charts-data"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data);
    },
  });
};

export {
  usePostColumnQuery,
  useGetColumnQuery,
  useUpdateColumnName,
  useDeleteColumnName,
};
