import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { customAxiosRequestForGet } from 'src/utils/axiosRequest';

const useAllTaskAccordingToSatusQuery = (status: string) => {
  const useGetTaskQuery = () => {
    return useQuery({
      queryKey: ['charts-data', status],
      queryFn: () =>
        customAxiosRequestForGet('/project/status/alltasks', { status }),
      onError: () => {
        toast.error('something went wrong');
      },
    });
  };

  return { useGetTaskQuery };
};

export default useAllTaskAccordingToSatusQuery;
