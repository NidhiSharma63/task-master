import { useMutation } from "@tanstack/react-query";
import { customAxiosRequestForPost, customAxiosRequestForGet } from "src/utils/axiosRequest";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "src/index";
import { queryKeyForTask } from "src/constant/queryKey";
import { useBackDropLoaderContext } from "src/context/BackDropLoaderContext";
import { useDispatch } from "react-redux";
import {
  booleanDataInStore,
  isBackDropLoaderDisplayed,
  isBackdropLoaderDisplayedForProjects,
} from "src/redux/boolean/booleanSlice";
import { useSelector } from "react-redux";

// post
const usePostProjectQuery = () => {
  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequestForPost("/projects", "post", payload);
    },
    onSuccess: () => {
      // toast.success("Project created successfully!");
      queryClient.invalidateQueries("projects");
      queryKeyForTask.forEach((status) => queryClient.invalidateQueries(status));
      queryClient.invalidateQueries(["charts-data"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error);
    },
  });
};

const getAllProjects = async () => {
  const res = await customAxiosRequestForGet("/projects");
  return res;
};

const useGetProjectQuery = () => {
  const { setValue } = useBackDropLoaderContext();
  const dispatch = useDispatch();
  const { is_backdrop_loader_displayed_for_projects } = useSelector(booleanDataInStore);

  return useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
    onSuccess: () => {
      if (is_backdrop_loader_displayed_for_projects) {
        setValue("");
        dispatch(isBackDropLoaderDisplayed(false));
      }
      dispatch(isBackdropLoaderDisplayedForProjects(false));
    },
    onError: (error) => {
      toast.error(error?.response?.data);
    },
  });
};

// delete
const useDeleteProjectQuery = () => {
  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequestForPost("/projects", "delete", payload);
    },
    onSuccess: () => {
      // toast.success("Project deleted successfully!");
      queryClient.invalidateQueries("projects");
      queryClient.invalidateQueries(["charts-data"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data);
    },
  });
};

/**
 * query to update project name
 */
const useUpdateProjectQuery = () => {
  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequestForPost("/projects", "put", payload);
    },
    onSuccess: () => {
      // toast.success("Project name updated successfully!");
      queryClient.invalidateQueries(["projects"]);
      queryClient.invalidateQueries(["charts-data"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data);
    },
  });
};

export { useGetProjectQuery, useUpdateProjectQuery, usePostProjectQuery, useDeleteProjectQuery };
