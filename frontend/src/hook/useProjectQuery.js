import { useMutation } from "@tanstack/react-query";
import {
  customAxiosRequestForPost,
  customAxiosRequestForGet,
} from "src/utils/axiosRequest";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "src/index";
import { queryKeyForTask } from "src/constant/queryKey";
import { useBackDropLoaderContext } from "src/context/BackDropLoaderContext";
import { useDispatch } from "react-redux";
import { isBackDropLoaderDisplayed } from "src/redux/boolean/booleanSlice";

// post
const usePostProjectQuery = () => {
  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequestForPost("/projects", "post", payload);
    },
    onSuccess: () => {
      // toast.success("Project created successfully!");
      queryClient.invalidateQueries("projects");
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

const getAllProjects = async () => {
  const res = await customAxiosRequestForGet("/projects");
  return res;
};

//get

const useGetProjectQuery = () => {
  const { setValue } = useBackDropLoaderContext();
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
    // onSuccess:()
    onSuccess: () => {
      setValue("");
      dispatch(isBackDropLoaderDisplayed(false));
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
      toast.error(error?.response?.data?.error);
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

export {
  useGetProjectQuery,
  useUpdateProjectQuery,
  usePostProjectQuery,
  useDeleteProjectQuery,
};
