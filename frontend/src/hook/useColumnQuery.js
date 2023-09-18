import { useMutation } from "@tanstack/react-query";
import { customAxiosRequestForPost, customAxiosRequestForGet } from "src/utils/axiosRequest";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "src/index";
import { useSelector } from "react-redux";
import { projectDataInStore } from "src/redux/projects/projectSlice";
import { statusDataInStore } from "src/redux/status/statusSlice";
import { useDispatch } from "react-redux";
import {
  booleanDataInStore,
  isBackDropLoaderDisplayed,
  isBackDropLoaderDisplayedForColumns,
} from "src/redux/boolean/booleanSlice";

/**
 * use post column query
 */
const usePostColumnQuery = () => {
  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequestForPost("/column", "post", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("projects");
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
  const dispatch = useDispatch();
  const { is_backdrop_loader_displayed_for_Columns } = useSelector(booleanDataInStore);

  return useQuery({
    queryKey: ["column", active_project],
    queryFn: () => {
      return customAxiosRequestForGet("/column", {
        projectName: active_project,
      });
    },
    onSuccess: () => {
      if (is_backdrop_loader_displayed_for_Columns) {
        console.log("ON SUCCESS");
        dispatch(isBackDropLoaderDisplayed(false));
        dispatch(isBackDropLoaderDisplayedForColumns(false));
      }
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
  // const { total_status } = useSelector(statusDataInStore);
  const { active_project } = useSelector(projectDataInStore);
  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequestForPost("/column", "put", payload);
    },
    onSuccess: () => {
      // toast.success("Section updated successfully!");
      // queryClient.invalidateQueries("projects");
      queryClient.invalidateQueries(["column", active_project]);
      // total_status?.forEach((status) => queryClient.invalidateQueries(status));
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
  const { total_status } = useSelector(statusDataInStore);
  // const dispatch = useDispatch();

  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequestForPost("/column", "delete", payload);
    },
    onSuccess: () => {
      // toast.success("Section deleted successfully!");
      // queryClient.invalidateQueries("projects");
      queryClient.invalidateQueries(["column"]);
      total_status?.forEach((status) => queryClient.invalidateQueries(status));
      queryClient.invalidateQueries(["charts-data"]);
      // dispatch(isBackDropLoaderDisplayed(true));
    },
    onError: (error) => {
      toast.error(error?.response?.data);
    },
  });
};

export { usePostColumnQuery, useGetColumnQuery, useUpdateColumnName, useDeleteColumnName };
