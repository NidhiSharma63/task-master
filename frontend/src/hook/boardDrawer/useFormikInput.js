import { useCallback, useEffect } from "react";
import { useFormikContext } from "formik";

const useFormikInput = (name) => {
  const { values, setFieldValue } = useFormikContext();

  const removeAllEmptyField = useCallback(() => {
    if (name) {
      const allValuesOfSubtasks = values?.[name] ?? [];
      if (allValuesOfSubtasks?.length > 0) {
        // filterOut All the values that are no empty
        const allNonEmptyValues = allValuesOfSubtasks?.filter(
          (val) => val.trim() !== ""
        );
        setFieldValue(name, allNonEmptyValues);
      }
    }
  }, [values, setFieldValue, name]);

  useEffect(() => {
    const windowEvent = (e) => {
      if (
        e.target?.classList?.contains("not-remove-input") ||
        e.target?.child?.classList?.contains("not-remove-input") ||
        e.target.tagName === "INPUT"
      ) {
        return;
      }
      removeAllEmptyField();
    };
    window.addEventListener("click", windowEvent);
    return () => {
      window.removeEventListener("click", windowEvent);
    };
  }, [removeAllEmptyField]);

  return { values };
};

export default useFormikInput;
