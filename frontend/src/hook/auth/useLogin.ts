import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILogin } from 'src/common/Interface/auth/Interface';
import { KEY_FOR_STORING_TOKEN } from 'src/constant/Misc';
import { loginSchema } from 'src/constant/validation';
import useLoginQuery from 'src/hook/useLoginQuery';
import { getValueFromLS } from 'src/utils/localstorage';

const useLogin = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useLoginQuery();
  const [formValues, setFormValues] = useState<ILogin>({} as ILogin);
  const [toggle, setToggle] = useState(false);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  //toggle password field
  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const token = getValueFromLS(KEY_FOR_STORING_TOKEN);
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const initialValues = {
    email: '',
    password: '',
    timeZone,
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!formValues) return;
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form default submission behavior

        // Validate the values using the schema
        try {
          loginSchema.validateSync(formValues);
          mutate(formValues);
        } catch (error) {
          console.log(error);
        }
      }
    };

    // Attach the event listener
    window.addEventListener('keydown', handleKeyPress);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [formValues]);

  const handleSubmit = (values: ILogin) => {
    mutate(values);
  };

  return {
    handleSubmit,
    setFormValues,
    initialValues,
    isLoading,
    toggle,
    handleToggle,
  };
};

export default useLogin;
