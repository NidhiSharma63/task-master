import { useQuery } from "@tanstack/react-query";
import { customAxiosRequestForGet, customAxiosRequestForPost } from "src/utils/axiosRequest";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  booleanDataInStore,
  isBackDropLoaderDisplayed,
  isBackDropLoaderDisplayedForPage,
} from "src/redux/boolean/booleanSlice";

const getAllPages = async () => {
  const res = await customAxiosRequestForGet("/page");
  return res;
};

/**
 *  GET Request
 */

const useGetPages = () => {
  const dispatch = useDispatch();
  const { is_back_Drop_loader_displayed_for_page } = useSelector(booleanDataInStore);
  return useQuery({
    queryKey: ["pages"],
    queryFn: getAllPages,
    onSuccess: () => {
      if (is_back_Drop_loader_displayed_for_page) {
        dispatch(isBackDropLoaderDisplayedForPage(false));
        dispatch(isBackDropLoaderDisplayed(false));
      }
    },
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
      queryClient.invalidateQueries(["pages"]);
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
      queryClient.invalidateQueries(["pages"]);
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
      queryClient.invalidateQueries(["pages"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data);
    },
  });
};

export { useGetPages, usePostPage, useUpdatePage, useDeletePage };
