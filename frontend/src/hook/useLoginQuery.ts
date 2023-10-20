import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ILogin } from 'src/common/Interface/auth/Interface';
import {
  KEY_FOR_STORING_TOKEN,
  KEY_FOR_STORING_USER_DETAILS,
} from 'src/constant/Misc';
import { isBackDropLoaderDisplayed } from 'src/redux/boolean/booleanSlice';
import { customAxiosRequestForPost } from 'src/utils/axiosRequest';
import { setValueToLs } from 'src/utils/localstorage';

const useLoginQuery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: ILogin) => {
      return customAxiosRequestForPost('/login', 'post', payload);
    },
    onSuccess: ({ token, user }) => {
      navigate('/');
      setValueToLs(KEY_FOR_STORING_TOKEN, JSON.stringify(token));
      setValueToLs(KEY_FOR_STORING_USER_DETAILS, JSON.stringify(user));
    },
    onError: (error: AxiosError) => {
      toast.error(error?.response?.data?.toString());

      dispatch(isBackDropLoaderDisplayed(false));
    },
  });
};

export default useLoginQuery;
