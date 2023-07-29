import { customAxiosRequestForGet } from "src/utils/axiosRequest";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const useChartsQuery = (status) => {
  const useGetTaskQuery = () => {
    return useQuery({
      queryKey: ["charts-data", status],
      queryFn: () => customAxiosRequestForGet("/charts/tasks", { status }),
      onError: (error) => {
        toast.error(error?.response?.data?.error);
      },
    });
  };

  return { useGetTaskQuery };
};

export default useChartsQuery;
