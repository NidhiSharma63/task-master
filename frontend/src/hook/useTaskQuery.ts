import { useMutation, useQueries } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { IUniversalInterface } from 'src/common/Interface/Interface';
import { queryClient } from 'src/index';
import {
  booleanDataInStore,
  isBackDropLoaderDisplayed,
  isBackdropLoaderDisplayedForTask,
  isTaskDisplayed,
  isUpdatingTask,
  showLoaderForTask,
} from 'src/redux/boolean/booleanSlice';
import { projectDataInStore } from 'src/redux/projects/projectSlice';
import { statusDataInStore } from 'src/redux/status/statusSlice';
import {
  customAxiosRequestForGet,
  customAxiosRequestForPost,
} from 'src/utils/axiosRequest';
import { useAppDispatch, useAppSelector } from './redux/hooks';

/**
 *
 * @returns Post request for adding task with status
 */
const useAddTaskQuery = () => {
  const [state, setState] = useState<string>('');

  return useMutation({
    mutationFn: (payload: IUniversalInterface) => {
      const { status } = payload;
      if (typeof status === 'string') {
        setState(status);
      }
      return customAxiosRequestForPost('/task', 'post', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['charts-data']);
      queryClient.invalidateQueries([state, 'All-task']);
      queryClient.invalidateQueries([state]);
    },
    onError: (error) => {
      toast.error('An error occured');
    },
  });
};

/**
 *
 * @returns Getting all task
 */
const useGetTaskAccordingToStatus = () => {
  const { active_project } = useSelector(projectDataInStore);
  const { total_status } = useSelector(statusDataInStore);
  const { is_backdrop_loader_displayed_for_Task } =
    useSelector(booleanDataInStore);
  const dispatch = useDispatch();

  const userQueries = useQueries({
    queries: total_status?.map((status: string) => {
      return {
        queryKey: [status, active_project],
        queryFn: () =>
          customAxiosRequestForGet('/task', {
            status,
            projectName: active_project,
          }),
        onSettled: () => {
          if (is_backdrop_loader_displayed_for_Task) {
            dispatch(isBackDropLoaderDisplayed(false));
            dispatch(isBackdropLoaderDisplayedForTask(false));
          }
          dispatch(isTaskDisplayed(true));
          dispatch(showLoaderForTask(false));
        },
        onError: () => {
          dispatch(isUpdatingTask(false));
        },
      };
    }),
  });

  const data = useMemo(
    () =>
      userQueries?.map((item: any) => {
        // console.log(item, 'this is item');
        return item?.data?.data;
      }),
    [userQueries],
  );

  return { data };
};

const useUpdateTaskQuery = () => {
  const { active_project } = useAppSelector(projectDataInStore);
  const dispatch = useAppDispatch();
  const [state, setState] = useState('');

  return useMutation({
    mutationFn: (payload: IUniversalInterface) => {
      const { status } = payload;
      if (typeof status === 'string') {
        setState(status);
      }
      return customAxiosRequestForPost('/task', 'put', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([state, active_project]);
      queryClient.invalidateQueries([state, 'All-task']);
    },
    onError: () => {
      dispatch(isUpdatingTask(false));
      toast.error('something went wrong!');
    },
  });
};

/**
 *
 * @returns Update request drag and drop
 */

const useUpdateTaskQueryWithStatus = () => {
  const { active_project } = useSelector(projectDataInStore);
  const [state, setState] = useState({
    previousStatusOfTask: '',
    currentStatusOfTask: '',
  });
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (payload: any) => {
      const { status, prevStatus } = payload;
      setState({
        previousStatusOfTask: prevStatus,
        currentStatusOfTask: status,
      });
      return customAxiosRequestForPost('/task/status', 'put', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        state.previousStatusOfTask,
        active_project,
      ]);
      queryClient.invalidateQueries([
        state.currentStatusOfTask,
        active_project,
      ]);
      queryClient.invalidateQueries(['charts-data']);
      queryClient.invalidateQueries([state, 'All-task']);
    },
    onError: () => {
      dispatch(isUpdatingTask(false));
      toast.error('something went wrong!');
    },
  });
};

/**
 *
 * @returns Update request with details
 */

const useUpdateTaskQueryWithDetails = () => {
  const [state, setState] = useState('');
  const { active_project } = useSelector(projectDataInStore);

  return useMutation({
    mutationFn: (payload: IUniversalInterface) => {
      const { status } = payload;
      if (typeof status === 'string') {
        setState(status);
      }
      return customAxiosRequestForPost('/task/details', 'put', payload);
    },
    onSuccess: () => {
      toast.success('Task updated successfully!');
      queryClient.invalidateQueries([state, active_project]);
      console.log('invalidated query', state, active_project);
      queryClient.invalidateQueries(['charts-data']);
      queryClient.invalidateQueries([state, 'All-task']);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });
};

/***
 *
 * @returns Delete Task
 */

const useDeleteTask = (status: string) => {
  const { active_project } = useSelector(projectDataInStore);
  return useMutation({
    mutationFn: (payload: {
      _id: string;
      status: string;
      userId: string;
      index: number;
      projectName: string;
    }) => {
      return customAxiosRequestForPost('/task', 'delete', payload);
    },
    onSuccess: () => {
      toast.success('Task deleted successfully!');
      queryClient.invalidateQueries([status, active_project]);
      queryClient.invalidateQueries([status, 'All-task']);
      queryClient.invalidateQueries(['charts-data']);
    },
    onError: (error) => {
      toast.error('something went wrong!');
    },
  });
};

/**
 *
 * @returns Getting all task for home component
 */
const useGetAllTaskAccordingToStatusForEachProject = () => {
  const { total_status } = useSelector(statusDataInStore);
  const { is_backdrop_loader_displayed_for_Task } =
    useSelector(booleanDataInStore);
  const dispatch = useDispatch();

  const userQueries = useQueries({
    queries: total_status.map((status: string) => {
      return {
        queryKey: [status, 'All-task'],
        queryFn: () =>
          customAxiosRequestForGet('/project/status/alltasks', {
            status,
          }),
        onSettled: () => {
          if (is_backdrop_loader_displayed_for_Task) {
            dispatch(isBackDropLoaderDisplayed(false));
            dispatch(isBackdropLoaderDisplayedForTask(false));
          }
        },
      };
    }),
  });

  const data = userQueries?.map((item: any) => item?.data?.data);
  const isLoading = userQueries?.[0]?.isLoading;
  const status = userQueries?.map((item: any) => item?.data?.status);

  return { data, status, isLoading };
};
export {
  useAddTaskQuery,
  useDeleteTask,
  useGetAllTaskAccordingToStatusForEachProject,
  useGetTaskAccordingToStatus,
  useUpdateTaskQuery,
  useUpdateTaskQueryWithDetails,
  useUpdateTaskQueryWithStatus,
};
