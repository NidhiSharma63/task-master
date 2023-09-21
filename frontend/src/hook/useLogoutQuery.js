import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  KEY_FOR_STORING_TOKEN,
  KEY_FOR_STORING_USER_DETAILS,
} from 'src/constant/Misc';
import { isBackDropLoaderDisplayed } from 'src/redux/boolean/booleanSlice';
import { customAxiosRequestForPost } from 'src/utils/axiosRequest';
import { setValueToLs } from 'src/utils/localstorage';

const useLogoutQuery = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: () => {
      return customAxiosRequestForPost('/logout', 'post');
    },
    onSuccess: () => {
      navigate('/login');
      setValueToLs(KEY_FOR_STORING_TOKEN, null);
      setValueToLs(KEY_FOR_STORING_USER_DETAILS, null);
      dispatch(isBackDropLoaderDisplayed(false));
    },
    onError: (error) => {
      toast.error(error?.response?.data);
      dispatch(isBackDropLoaderDisplayed(false));
    },
  });
};

export default useLogoutQuery;
