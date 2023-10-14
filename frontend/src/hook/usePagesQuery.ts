import { useMutation, useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { IPage } from 'src/common/Interface/Interface';
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

/**
 *  extends the interface for updating page
 */

interface IExtendsPage extends IPage {
  _id: string;
}

const getAllPages = async () => {
  const res = await customAxiosRequestForGet('/page');
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
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });
};

/**
 * Post request
 */
const usePostPage = () => {
  return useMutation({
    mutationFn: (payload: IPage) => {
      return customAxiosRequestForPost('/page', 'post', payload);
    },
    onSuccess: () => {
      // toast.success("Project created successfully!");
      queryClient.invalidateQueries(['pages']);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });
};

/**
 * update request
 */

const useUpdatePage = () => {
  return useMutation({
    mutationFn: (payload: IExtendsPage) => {
      return customAxiosRequestForPost('/page', 'put', payload);
    },
    onSuccess: () => {
      // toast.success("Project name updated successfully!");
      queryClient.invalidateQueries(['pages']);
    },
    onError: (error: any) => {
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
      return customAxiosRequestForPost('/page', 'delete', payload);
    },
    onSuccess: () => {
      // toast.success("Project deleted successfully!");
      queryClient.invalidateQueries(['pages']);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });
};

export { useDeletePage, useGetPages, usePostPage, useUpdatePage };