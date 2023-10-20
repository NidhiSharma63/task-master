import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Box, Button, TextField } from '@mui/material';
import { Field, FieldArray } from 'formik';
import useFormikInput from 'src/hook/boardDrawer/useFormikInput';
import colors from 'src/theme/variables';
import { IField } from '../Interface/Interface';

/**
 * interface
 */

interface IFormikInputArray {
  name: string;
  label: string;
}
const FormikInputArray = (props: IFormikInputArray) => {
  const { name } = props;
  const { setFieldValue } = useFormikInput(name);
  const { values } = useFormikInput(name);

  // Function to toggle task completion
  const toggleTaskCompletion = (index: number): void => {
    const updatedTasks = [...values[name]];
    const taskToUpdate = { ...updatedTasks[index] }; // Create a deep copy of the task object
    taskToUpdate.isCompleted = !taskToUpdate.isCompleted;
    updatedTasks[index] = taskToUpdate;
    setFieldValue(name, updatedTasks);
  };
  return (
    <Box
      sx={{
        mt: 2,
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <FieldArray
        name={name}
        render={(arrayHelpers): ReactJSXElement => (
          <>
            {values[name] && values[name].length > 0
              ? values[name].map(
                  (
                    task: { value: string; isCompleted: boolean },
                    index: number,
                  ) => (
                    <Field name={`${name}.${index}.value`} key={index}>
                      {({ field }: IField) => {
                        return (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              // border: "1px solid red",
                              width: '100%',
                              gap: 2,
                            }}
                          >
                            <TextField
                              sx={{ width: '100%', backgroundColor: 'white' }}
                              {...field}
                              value={task.value}
                              className="not-remove-input"
                              disabled={task.isCompleted}
                            />
                            <TaskAltIcon
                              sx={{
                                cursor: 'pointer',
                                color: `${
                                  task.isCompleted ? '#045c08' : undefined
                                }`,
                              }}
                              onClick={() => toggleTaskCompletion(index)}
                            />
                            {/* #045c08 */}
                            <DeleteOutlineIcon
                              sx={{
                                cursor: 'pointer',
                                color: 'red',
                              }}
                              className="not-remove-input"
                              onClick={() => arrayHelpers.remove(index)}
                            />
                          </Box>
                        );
                      }}
                    </Field>
                  ),
                )
              : null}
            <Button
              type="button"
              variant="contained"
              className="not-remove-input"
              sx={{
                background: colors.primaryColor,
                '&:hover': {
                  backgroundColor: colors.primaryColor,
                },
              }}
              onClick={() =>
                arrayHelpers.push({ value: '', isCompleted: false })
              }
            >
              Sub task
            </Button>
          </>
        )}
      />
    </Box>
  );
};
export default FormikInputArray;
