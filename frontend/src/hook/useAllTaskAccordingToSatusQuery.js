import { customAxiosRequestForGet } from "../utils/axiosRequest";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const useAllTaskAccordingToSatusQuery = (status) => {
  const useGetTaskQuery = () => {
    return useQuery({
      queryKey: ["charts-data", status],
      queryFn: () =>
        customAxiosRequestForGet("/project/status/alltasks", { status }),
      onError: (error) => {
        toast.error(error?.response?.data?.error);
      },
    });
  };

  return { useGetTaskQuery };
};

export default useAllTaskAccordingToSatusQuery;
