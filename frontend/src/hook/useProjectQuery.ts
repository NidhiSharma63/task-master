import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { IUniversalInterface } from 'src/common/Interface/Interface';
import { queryClient } from 'src/index';
import {
  booleanDataInStore,
  isBackDropLoaderDisplayed,
  isBackdropLoaderDisplayedForProjects,
} from 'src/redux/boolean/booleanSlice';
import {
  customAxiosRequestForGet,
  customAxiosRequestForPost,
} from 'src/utils/axiosRequest';

// post
const usePostProjectQuery = () => {
  return useMutation({
    mutationFn: (payload: { name: string; color: string }) => {
      return customAxiosRequestForPost('/projects', 'post', payload);
    },
    onSuccess: () => {
      // toast.success("Project created successfully!");
      queryClient.invalidateQueries(['projects']);
      queryClient.invalidateQueries(['charts-data']);
    },
    onError: (error: AxiosError) => {
      toast.error(error?.response?.data?.toString());
    },
  });
};

const getAllProjects = async () => {
  const res = await customAxiosRequestForGet('/projects', undefined);
  return res;
};

const useGetProjectQuery = () => {
  const dispatch = useDispatch();
  const { is_backdrop_loader_displayed_for_projects } =
    useSelector(booleanDataInStore);

  return useQuery({
    queryKey: ['projects'],
    queryFn: getAllProjects,
    onSettled: () => {
      if (is_backdrop_loader_displayed_for_projects) {
        dispatch(isBackDropLoaderDisplayed(false));
      }
      dispatch(isBackdropLoaderDisplayedForProjects(false));
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });
};

// delete
const useDeleteProjectQuery = () => {
  return useMutation({
    mutationFn: (payload: { id: string }) => {
      return customAxiosRequestForPost('/projects', 'delete', payload);
    },
    onSuccess: () => {
      // toast.success("Project deleted successfully!");
      queryClient.invalidateQueries(['projects']);
      queryClient.invalidateQueries(['charts-data']);
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });
};

/**
 * query to update project name
 */
const useUpdateProjectQuery = () => {
  return useMutation({
    mutationFn: (payload: IUniversalInterface) => {
      return customAxiosRequestForPost('/projects', 'put', payload);
    },
    onSuccess: () => {
      // toast.success("Project name updated successfully!");
      queryClient.invalidateQueries(['projects']);
      queryClient.invalidateQueries(['charts-data']);
    },
    onError: (error: AxiosError) => {
      toast.error(error?.response?.data?.toString());
    },
  });
};

export {
  useDeleteProjectQuery,
  useGetProjectQuery,
  usePostProjectQuery,
  useUpdateProjectQuery,
};
