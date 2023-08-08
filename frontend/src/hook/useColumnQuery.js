import { useMutation } from "@tanstack/react-query";
import {
  customAxiosRequestForPost,
  customAxiosRequestForGet,
} from "../utils/axiosRequest";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../index";
import { queryKeyForTask } from "../constant/queryKey";

/**
 * use post column query
 */
const usePostColumnQuery = () => {
  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequestForPost("/column", "post", payload);
    },
    onSuccess: () => {
      toast.success("Column created successfully!");
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

/* get request
 */
const getAllColumns = async () => {
  const res = await customAxiosRequestForGet("/column");
  return res;
};

/**
 * get column
 */

const useGetColumnQuery = () => {
  return useQuery({
    queryKey: ["column"],
    queryFn: getAllColumns,
    onError: (error) => {
      toast.error(error?.response?.data);
    },
  });
};

export { usePostColumnQuery, useGetColumnQuery };
