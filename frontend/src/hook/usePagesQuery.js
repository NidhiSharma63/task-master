import { useQuery } from "@tanstack/react-query";
import { customAxiosRequestForGet, customAxiosRequestForPost } from "src/utils/axiosRequest";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/index";

const getAllPages = async () => {
  const res = await customAxiosRequestForGet("/page");
  return res;
};

/**
 *  GET Request
 */

const useGetPages = () => {
  return useQuery({
    queryKey: ["pages"],
    queryFn: getAllPages,
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error?.response?.data);
    },
  });
};

/**
 * Post request
 */
const usePostPage = () => {
  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequestForPost("/page", "post", payload);
    },
    onSuccess: () => {
      // toast.success("Project created successfully!");
      queryClient.invalidateQueries("pages");
    },
    onError: (error) => {
      toast.error(error?.response?.data);
    },
  });
};

/**
 * update request
 */

const useUpdatePage = () => {
  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequestForPost("/page", "put", payload);
    },
    onSuccess: () => {
      // toast.success("Project name updated successfully!");
      queryClient.invalidateQueries("pages");
    },
    onError: (error) => {
      toast.error(error?.response?.data);
    },
  });
};

/**
 * Delete the page
 */

const useDeletePage = () => {
  return useMutation({
    mutationFn: (payload) => {
      return customAxiosRequestForPost("/page", "delete", payload);
    },
    onSuccess: () => {
      // toast.success("Project deleted successfully!");
      queryClient.invalidateQueries("pages");
    },
    onError: (error) => {
      toast.error(error?.response?.data);
    },
  });
};

export { useGetPages, usePostPage, useUpdatePage, useDeletePage };
