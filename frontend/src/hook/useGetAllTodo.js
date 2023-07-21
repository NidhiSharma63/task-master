import { useQuery } from "@tanstack/react-query";
import customAxiosRequest from "src/utils/axiosRequest";
import { getValueFromLS } from "src/utils/localstorage";
import { KEY_FOR_STORING_USER_DETAILS } from "src/constant/Misc";
import { toast } from "react-toastify";

const getAllUserTodo = async () => {
  const userId = getValueFromLS(KEY_FOR_STORING_USER_DETAILS)._id;
  const res = await customAxiosRequest("/alltodos", "get", userId);
  return res;
};

const useGetAllTodos = () => {
  return useQuery({
    queryKey: ["allTodos"],
    queryFn: getAllUserTodo,
    onError: (error) => {
      toast.error(error);
    },
  });
};

export default useGetAllTodos;
