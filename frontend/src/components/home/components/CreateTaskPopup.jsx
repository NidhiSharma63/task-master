import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  booleanDataInStore,
  isCreateTaskModalOpen,
} from "src/redux/boolean/booleanSlice";
import { useAddTaskQuery } from "src/hook/useTaskQuery";
import { Form, Formik } from "formik";
import FormikControls from "src/common/formik/FormikControls";
import { validationForUpdatingTask } from "src/constant/validation";
import colors from "src/theme/variables";
import { useUpdateTaskQuery, useDeleteTask } from "src/hook/useTaskQuery";

import { taskDataInStore } from "src/redux/task/taskSlice";

const CreateTaskPopup = ({ status, projectData }) => {
  const { is_create_task_modal_open } = useSelector(booleanDataInStore);
  const dispatch = useDispatch();
  const projectName = projectData?.projects?.map((item) => item.name);
  const { active_task } = useSelector(taskDataInStore);

  const { mutate: deleteTask } = useDeleteTask(active_task?.status);
  const { mutate } = useAddTaskQuery();
  const { mutate: updateTask } = useUpdateTaskQuery();

  const handleClose = () => {
    dispatch(isCreateTaskModalOpen(false));
  };

  const initialValues = {
    task: active_task.task ?? "",
    dueDate: active_task?.dueDate ? new Date(active_task?.dueDate) : null,
    status: active_task.status ?? status,
    description: active_task?.description ?? "",
    projectName: active_task?.projectName ?? projectName?.[0],
  };

  // active task is present
  if (active_task.task) {
    initialValues._id = active_task._id ?? "";
    initialValues.userId = active_task.userId ?? "";
  }
  const handleSubmit = (values) => {
    if (active_task.task) {
      updateTask(values);
      dispatch(isCreateTaskModalOpen(true));
    } else {
      mutate(values);
      dispatch(isCreateTaskModalOpen(true));
    }
  };

  const handleDelete = () => {
    deleteTask({ id: active_task._id });
    dispatch(isCreateTaskModalOpen(false));
  };

  return (
    <Dialog open={is_create_task_modal_open} onClose={handleClose}>
      <DialogTitle>Add Task</DialogTitle>
      <Divider />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationForUpdatingTask}
      >
        <Form>
          <DialogContent>
            <Box
              sx={{
                width: "30rem",
                height: "25rem",
              }}
            >
              <FormikControls control="formikInput" name="task" />
              <FormikControls control="formikDatePicker" name="dueDate" />
              <FormikControls control="formikTextArea" name="description" />
              <FormikControls
                control="formikSelect"
                name="projectName"
                values={projectName ?? []}
                mt={11}
              />
              <Box sx={{ mt: 11, display: "flex" }}>
                <Typography sx={{ fontWeight: 600 }}>
                  Created At : &nbsp;
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: (theme) => theme.palette.primary.main,
                  }}
                >
                  {active_task.createdAt
                    ? new Date(active_task.createdAt ?? " ").toUTCString()
                    : new Date().toUTCString()}
                </Typography>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ borderTop: `1px solid ${colors.lightGrey}` }}>
            {active_task.task ? (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "rgb(168, 13, 13)",
                  "&:hover": {
                    background: "white",
                    borderColor: (theme) => theme.palette.primary.main,
                    color: (theme) => theme.palette.primary.main,
                  },
                }}
                onClick={handleDelete}
              >
                Delete
              </Button>
            ) : (
              <Button onClick={handleClose}>Cancel</Button>
            )}
            <Button variant="contained" type="submit">
              Save
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
};

export default CreateTaskPopup;
