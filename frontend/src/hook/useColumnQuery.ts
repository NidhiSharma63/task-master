import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { IUniversalInterface } from 'src/common/Interface/Interface';
import { queryClient } from 'src/index';
import {
  booleanDataInStore,
  isBackDropLoaderDisplayed,
  isBackDropLoaderDisplayedForColumns,
} from 'src/redux/boolean/booleanSlice';
import { projectDataInStore } from 'src/redux/projects/projectSlice';
import {
  customAxiosRequestForGet,
  customAxiosRequestForPost,
} from 'src/utils/axiosRequest';
import { useAppDispatch, useAppSelector } from './redux/hooks';
/**
 * use post column query
 */
const usePostColumnQuery = () => {
  const { active_project } = useSelector(projectDataInStore);

  return useMutation({
    mutationFn: (payload: { name: string; projectName: string }) => {
      return customAxiosRequestForPost('/column', 'post', payload);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['charts-data']);
      queryClient.invalidateQueries(['column', active_project]);
    },
    onError: (error: AxiosError) => {
      toast.error(error?.response?.data?.toString());
    },
  });
};

/**
 * get column
 */

const useGetColumnQuery = () => {
  const { active_project } = useAppSelector(projectDataInStore);
  const dispatch = useAppDispatch();
  const { is_backdrop_loader_displayed_for_Columns } =
    useSelector(booleanDataInStore);
  return useQuery({
    queryKey: ['column', active_project],
    queryFn: () => {
      return customAxiosRequestForGet('/column', {
        projectName: active_project,
      });
    },
    enabled: Boolean(active_project),
    onSettled: () => {
      if (is_backdrop_loader_displayed_for_Columns) {
        dispatch(isBackDropLoaderDisplayed(false));
        dispatch(isBackDropLoaderDisplayedForColumns(false));
      }
    },

    onError: () => {
      toast.error('Something went wrong');
    },
  });
};

/**
 * update col name
 */

const useUpdateColumnName = () => {
  const { active_project } = useSelector(projectDataInStore);
  return useMutation({
    mutationFn: (payload: {
      name: string;
      _id: string;
      previousColName: string;
    }) => {
      return customAxiosRequestForPost('/column', 'put', payload);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['column', active_project]);
      queryClient.invalidateQueries(['charts-data']);
    },
    onError: (error: AxiosError) => {
      toast.error(error?.response?.data?.toString());
    },
  });
};

/**
 * delete col name
 */

const useDeleteColumnName = () => {
  const { active_project } = useSelector(projectDataInStore);
  // const dispatch = useDispatch();

  return useMutation({
    mutationFn: (payload: IUniversalInterface) => {
      return customAxiosRequestForPost('/column', 'delete', payload);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['column', active_project]);
      queryClient.invalidateQueries(['charts-data']);
    },
    onError: (error: AxiosError) => {
      toast.error(error?.response?.data?.toString());
    },
  });
};

export {
  useDeleteColumnName,
  useGetColumnQuery,
  usePostColumnQuery,
  useUpdateColumnName,
};
