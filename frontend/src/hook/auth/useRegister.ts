import { useState } from 'react';
import { ILogin } from 'src/common/Interface/auth/Interface';
import useRegisterQuery from 'src/hook/useRegsiterQuery';

/**
 * interface
 */

interface IUseState {
  [key: string]: boolean;
}

interface IRegisterFormValues extends ILogin {
  confirmPassword: string;
}

const useRegister = () => {
  const { mutate, isLoading } = useRegisterQuery();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const initialValues: IRegisterFormValues = {
    email: '',
    password: '',
    confirmPassword: '',
    timeZone,
  };

  //function to toggle password & confirmpassword field...
  const [toggle, setToggle] = useState<IUseState>({
    password: false,
    confirmpassword: false,
  });

  const handleToggle = (name: string) => {
    setToggle({
      ...toggle,
      [name]: !toggle[name],
    });
  };

  const handleSubmit = (values: IRegisterFormValues) => {
    mutate(values);
  };

  return {
    handleSubmit,
    initialValues,
    isLoading,
    toggle,
    handleToggle,
  };
};

export default useRegister;
