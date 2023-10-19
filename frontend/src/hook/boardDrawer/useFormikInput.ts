import { FormikValues, useFormikContext } from 'formik';
import { useCallback, useEffect } from 'react';

const useFormikInput = (name: string) => {
  const { values, setFieldValue } = useFormikContext<FormikValues>();

  const removeAllEmptyField = useCallback(() => {
    if (name) {
      const allValuesOfSubtasks = values?.[name] ?? [];
      if (allValuesOfSubtasks?.length > 0) {
        // filterOut All the values that are no empty
        const allNonEmptyValues = allValuesOfSubtasks?.filter(
          (item: { value: string; isCompleted: boolean }) =>
            item.value?.trim() !== '',
        );
        setFieldValue(name, allNonEmptyValues);
      }
    }
  }, [values, setFieldValue, name]);

  useEffect(() => {
    const windowEvent = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target?.classList?.contains('not-remove-input') ||
        target?.childElementCount > 0 ||
        target.tagName === 'INPUT'
      ) {
        return;
      }
      removeAllEmptyField();
    };
    window.addEventListener('click', windowEvent);
    return () => {
      window.removeEventListener('click', windowEvent);
    };
  }, [removeAllEmptyField]);

  return { values, setFieldValue };
};

export default useFormikInput;
