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
import { userEmail } from 'src/redux/auth/userSlice';
import { isBackDropLoaderDisplayed } from 'src/redux/boolean/booleanSlice';
import { customAxiosRequestForPost } from 'src/utils/axiosRequest';
import { setValueToLs } from 'src/utils/localstorage';

/**
 * interface
 */
interface IRegisterFormValues extends ILogin {
  confirmPassword: string;
}

const useRegisterQuery = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (payload: IRegisterFormValues) => {
      return customAxiosRequestForPost('/register', 'post', payload);
    },
    onSuccess: ({ token, user }) => {
      navigate('/'); // Navigate to the home page
      setValueToLs(KEY_FOR_STORING_TOKEN, token);
      setValueToLs(KEY_FOR_STORING_USER_DETAILS, JSON.stringify(user));
      dispatch(userEmail(user.email));
    },
    onError: (error: AxiosError) => {
      toast.error(error?.response?.data?.toString());
      dispatch(isBackDropLoaderDisplayed(false));
    },
  });
};

export default useRegisterQuery;
