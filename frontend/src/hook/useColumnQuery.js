import { useMutation } from "@tanstack/react-query";
import {
  customAxiosRequestForPost,
  customAxiosRequestForGet,
} from "src/utils/axiosRequest";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "src/index";
import { useSelector } from "react-redux";
import { projectDataInStore } from "src/redux/projects/projectSlice";
import { statusDataInStore } from "src/redux/status/statusSlice";
import { useDispatch } from "react-redux";
import { isBackDropLoaderDisplayed } from "src/redux/boolean/booleanSlice";

/**
 * use post column query
 */
const usePostColumnQuery = () => {
  const { total_status } = useSelector(statusDataInStore);
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequestForPost("/column", "post", payload);
    },
    onSuccess: () => {
      // toast.success("Section created successfully!");
      queryClient.invalidateQueries("projects");
      // total_status?.forEach((status) => queryClient.invalidateQueries(status));
      queryClient.invalidateQueries(["charts-data"]);
      dispatch(isBackDropLoaderDisplayed(true))
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
  const { total_status } = useSelector(statusDataInStore);
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequestForPost("/column", "put", payload);
    },
    onSuccess: () => {
      // toast.success("Section updated successfully!");
      queryClient.invalidateQueries("projects");
      queryClient.invalidateQueries("column");
      total_status?.forEach((status) => queryClient.invalidateQueries(status));
      queryClient.invalidateQueries(["charts-data"]);
      dispatch(isBackDropLoaderDisplayed(true))
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
  const { total_status } = useSelector(statusDataInStore);
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequestForPost("/column", "delete", payload);
    },
    onSuccess: () => {
      // toast.success("Section deleted successfully!");
      queryClient.invalidateQueries("projects");
      queryClient.invalidateQueries("column");
      total_status?.forEach((status) => queryClient.invalidateQueries(status));
      queryClient.invalidateQueries(["charts-data"]);
      dispatch(isBackDropLoaderDisplayed(true))
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
