import useRegisterQuery from "src/hook/useRegsiterQuery";
import { useEffect, useState } from "react";
import { registerSchema } from "src/constant/validation";

const useRegister = () => {
  const { mutate, isLoading } = useRegisterQuery();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    timeZone,
  };

  const [valuesOfForm, setValuesOfForm] = useState(initialValues);

  useEffect(() => {
    const handleKeyPress = async (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent form default submission behavior

        // Validate the values using the schema
        try {
          registerSchema.validateSync(valuesOfForm);

          handleSubmit(valuesOfForm);
        } catch (error) {
          console.log(error.errors);
        }
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  const handleSubmit = (values) => {
    mutate(values);
  };

  return {
    handleSubmit,
    initialValues,
    setValuesOfForm,
    isLoading,
  };
};

export default useRegister;
