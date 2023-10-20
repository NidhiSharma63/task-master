import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { IUniversalInterface } from 'src/common/Interface/Interface';
import { queryClient } from 'src/index';
import {
  booleanDataInStore,
  isBackDropLoaderDisplayed,
  isBackDropLoaderDisplayedForPage,
} from 'src/redux/boolean/booleanSlice';
import {
  customAxiosRequestForGet,
  customAxiosRequestForPost,
} from 'src/utils/axiosRequest';

const getAllPages = async () => {
  const res = await customAxiosRequestForGet('/page', undefined);
  return res;
};

/**
 *  GET Request
 */

const useGetPages = () => {
  const dispatch = useDispatch();
  const { is_back_Drop_loader_displayed_for_page } =
    useSelector(booleanDataInStore);
  return useQuery({
    queryKey: ['pages'],
    queryFn: getAllPages,
    onSuccess: () => {
      if (is_back_Drop_loader_displayed_for_page) {
        dispatch(isBackDropLoaderDisplayedForPage(false));
        dispatch(isBackDropLoaderDisplayed(false));
      }
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });
};

/**
 * Post request
 */
const usePostPage = () => {
  return useMutation({
    mutationFn: (payload: IUniversalInterface) => {
      return customAxiosRequestForPost('/page', 'post', payload);
    },
    onSuccess: () => {
      // toast.success("Project created successfully!");
      queryClient.invalidateQueries(['pages']);
    },
    onError: (error: AxiosError) => {
      toast.error(error?.response?.data?.toString());
    },
  });
};

/**
 * update request
 */

const useUpdatePage = () => {
  return useMutation({
    mutationFn: (payload: IUniversalInterface) => {
      return customAxiosRequestForPost('/page', 'put', payload);
    },
    onSuccess: () => {
      // toast.success("Project name updated successfully!");
      queryClient.invalidateQueries(['pages']);
    },
    onError: (error: AxiosError) => {
      toast.error(error?.response?.data?.toString());
    },
  });
};

/**
 * Delete the page
 */

const useDeletePage = () => {
  return useMutation({
    mutationFn: (payload: IUniversalInterface) => {
      return customAxiosRequestForPost('/page', 'delete', payload);
    },
    onSuccess: () => {
      // toast.success("Project deleted successfully!");
      queryClient.invalidateQueries(['pages']);
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });
};

export { useDeletePage, useGetPages, usePostPage, useUpdatePage };
