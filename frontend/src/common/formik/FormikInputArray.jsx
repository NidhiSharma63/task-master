import { Field, FieldArray } from "formik";
import { Box, Button, TextField } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useFormikInput from "src/hook/boardDrawer/useFormikInput";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import colors from "src/theme/variables";

const FormikInputArray = (props) => {
  const { name } = props;
  const { setFieldValue } = useFormikInput(name);
  const { values } = useFormikInput(name);

  // Function to toggle task completion
  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...values[name]];
    const taskToUpdate = { ...updatedTasks[index] }; // Create a deep copy of the task object
    taskToUpdate.isCompleted = !taskToUpdate.isCompleted;
    updatedTasks[index] = taskToUpdate;
    setFieldValue(name, updatedTasks);
  };
  return (
    <Box
      mt={2}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        gap: 2,
      }}>
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <>
            {values[name] && values[name].length > 0
              ? values[name].map((task, index) => (
                  <Field name={`${name}.${index}.value`} key={index}>
                    {({ field }) => {
                      return (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            // border: "1px solid red",
                            width: "100%",
                            gap: 2,
                          }}>
                          <TextField
                            sx={{ width: "100%" }}
                            {...field}
                            value={task.value}
                            className="not-remove-input"
                            disabled={task.isCompleted}
                          />
                          <TaskAltIcon
                            sx={{
                              cursor: "pointer",
                              color: `${task.isCompleted ? "#045c08" : undefined}`,
                            }}
                            onClick={() => toggleTaskCompletion(index)}
                          />
                          {/* #045c08 */}
                          <DeleteOutlineIcon
                            sx={{
                              cursor: "pointer",
                              color: (theme) => theme.palette.primary.main,
                            }}
                            className="not-remove-input"
                            onClick={() => arrayHelpers.remove(index)}
                          />
                        </Box>
                      );
                    }}
                  </Field>
                ))
              : null}
            <Button
              type="button"
              variant="contained"
              className="not-remove-input"
              sx={{
                mt: 2,
                background: colors.subTaskButtonColor,
              }}
              onClick={() => arrayHelpers.push({ value: "", isCompleted: false })}>
              Sub task
            </Button>
          </>
        )}
      />
    </Box>
  );
};
export default FormikInputArray;
