import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { IFormValues, IProjects } from 'src/common/Interface/Home/Interface';
import FormikControls from 'src/common/formik/FormikControls';
import { validationForUpdatingTask } from 'src/constant/validation';
import {
  useAddTaskQuery,
  useDeleteTask,
  useUpdateTaskQueryWithDetails,
} from 'src/hook/useTaskQuery';
import {
  booleanDataInStore,
  isBackDropLoaderDisplayed,
  isBackdropLoaderDisplayedForTask,
  isCreateTaskModalOpen,
} from 'src/redux/boolean/booleanSlice';
import { activeTask, taskDataInStore } from 'src/redux/task/taskSlice';
import colors from 'src/theme/variables';

/**
 * interface
 */

interface ICreateTaskPopup {
  status: string;
  projectData: {
    projects: IProjects[];
  };
}

const CreateTaskPopup = ({ status, projectData }: ICreateTaskPopup) => {
  const { is_create_task_modal_open } = useSelector(booleanDataInStore);
  const dispatch = useDispatch();
  const projectName = projectData?.projects?.map((item) => ({
    name: item?.name,
    color: item?.color,
  }));

  const { active_task } = useSelector(taskDataInStore);

  const { mutate: deleteTask } = useDeleteTask(active_task?.status);
  const { mutate } = useAddTaskQuery();
  const { mutate: updateTask } = useUpdateTaskQueryWithDetails();

  const handleClose = () => {
    dispatch(isCreateTaskModalOpen(false));
    dispatch(activeTask(''));
  };

  const initialValues: IFormValues = {
    task: active_task?.task ?? '',
    dueDate: active_task?.dueDate ? new Date(active_task?.dueDate) : null,
    status: active_task.status ?? status,
    description: active_task?.description ?? '',
    projectName: active_task?.projectName ?? projectName?.[0]?.name,
    label: active_task?.label ?? '',
    labelColor: active_task?.labelColor ?? '#e33529',
    index: active_task?.index ?? 0,
    subTasks: active_task?.subTasks ?? '',
    color: active_task?.color ?? projectName?.[0]?.color,
    images: active_task.images ?? [],
  };

  // active task is present
  if (active_task.task) {
    initialValues._id = active_task._id;
  }

  const handleSubmit = (values: IFormValues) => {
    if (active_task.task) {
      updateTask(values);
      dispatch(isCreateTaskModalOpen(false));
    } else {
      mutate(values);
      dispatch(isCreateTaskModalOpen(false));
    }
    dispatch(activeTask(''));
    dispatch(isBackdropLoaderDisplayedForTask(true));
    dispatch(isBackDropLoaderDisplayed(true));
  };

  const handleDelete = () => {
    deleteTask({
      _id: active_task._id,
      status: active_task.status,
      userId: active_task.userId,
      index: active_task.index,
      projectName: active_task.projectName,
    });
    dispatch(isCreateTaskModalOpen(false));
  };

  return (
    <Dialog open={is_create_task_modal_open} onClose={handleClose}>
      <Box sx={{ backgroundColor: colors.offWhite }}>
        <DialogTitle>Add Task</DialogTitle>
        <Divider sx={{ borderColor: colors.lineColor }} />
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationForUpdatingTask}
        >
          <Form>
            <DialogContent>
              <Box
                sx={{
                  width: '30rem',
                  height: '25rem',
                }}
              >
                <FormikControls control="formikInput" name="task" />
                <FormikControls
                  control="formikInputForLable"
                  name="label"
                  colorName="labelColor"
                />
                <FormikControls control="formikDatePicker" name="dueDate" />
                <FormikControls control="formikTextArea" name="description" />
                <FormikControls
                  control="formikSelect"
                  name="projectName"
                  values={projectName ?? []}
                  mt={2}
                />
                <FormikControls control="formikInputArray" name="subTasks" />
                <Box sx={{ mt: 2, display: 'flex' }}>
                  <Typography sx={{ fontWeight: 600 }}>
                    Created At : &nbsp;
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: colors.textColor,
                    }}
                  >
                    {active_task.createdAt
                      ? new Date(active_task.createdAt ?? ' ').toUTCString()
                      : new Date().toUTCString()}
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
            <Divider />
            <DialogActions sx={{}}>
              {active_task.task ? (
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#6C6C6D',
                    '&:hover': {
                      background: '#6C6C6D',
                    },
                  }}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              ) : (
                <Button
                  onClick={handleClose}
                  sx={{
                    backgroundColor: '#6C6C6D',
                    '&:hover': {
                      background: '#6C6C6D',
                    },
                  }}
                >
                  Cancel
                </Button>
              )}
              <Button
                variant="contained"
                type="submit"
                sx={{
                  '&:hover': {
                    background: colors.primaryColor,
                  },
                }}
              >
                Save
              </Button>
            </DialogActions>
          </Form>
        </Formik>
      </Box>
    </Dialog>
  );
};

export default CreateTaskPopup;
