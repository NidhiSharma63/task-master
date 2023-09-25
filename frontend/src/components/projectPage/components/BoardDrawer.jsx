import { Box, Button, Divider, Drawer, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormikControls from 'src/common/formik/FormikControls';
import { validationForUpdatingTask } from 'src/constant/validation';
import {
  useDeleteTask,
  useUpdateTaskQueryWithDetails,
} from 'src/hook/useTaskQuery';
import {
  booleanDataInStore,
  isBackDropLoaderDisplayed,
  isBackdropLoaderDisplayedForTask,
  isBoardDrawerOpen,
  isUpdatingTask,
} from 'src/redux/boolean/booleanSlice';
import { taskDataInStore } from 'src/redux/task/taskSlice';
import colors from 'src/theme/variables';

const BoardDrawer = () => {
  const { active_task } = useSelector(taskDataInStore);
  const { is_board_drawer_open } = useSelector(booleanDataInStore);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(is_board_drawer_open);
  const { mutate } = useUpdateTaskQueryWithDetails();
  const { mutate: deleteTask } = useDeleteTask(active_task?.status);

  useEffect(() => {
    setOpen(is_board_drawer_open);
  }, [is_board_drawer_open]);

  const handleClose = () => {
    setOpen(false);
    dispatch(isBoardDrawerOpen(false));
  };

  const initialValues = {
    task: active_task.task,
    _id: active_task._id,
    dueDate: new Date(active_task?.dueDate) ?? null,
    userId: active_task.userId,
    status: active_task.status,
    description: active_task?.description ?? '',
    subTasks: active_task?.subTasks ?? '',
    label: active_task?.label ?? '',
    labelColor: active_task?.labelColor ?? '#e33529',
    originalDate: '',
    color: active_task?.color,
    projectName: active_task.projectName,
  };

  const handleSubmit = (values) => {
    mutate(values);
  };

  const handleDelete = () => {
    deleteTask({
      _id: active_task._id,
      status: active_task.status,
      userId: active_task.userId,
      index: active_task.index,
      projectName: active_task.projectName,
    });
    setOpen(false);
    dispatch(isBoardDrawerOpen(false));
    dispatch(isUpdatingTask(false));
    dispatch(isBackdropLoaderDisplayedForTask(true));
    dispatch(isBackDropLoaderDisplayed(true));
  };

  return (
    <Drawer
      anchor={'right'}
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 600,
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          top: '5rem',
        }}
      >
        <Box>
          <Typography sx={{ pl: 2, textTransform: 'capitalize' }} variant="h5">
            {active_task.task}
          </Typography>
          <Divider sx={{ mt: 2 }} />
        </Box>
        <Box
          sx={{
            ml: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            mt: 1,
            mb: 2,
          }}
        >
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationForUpdatingTask}
          >
            <Form>
              <Box
                sx={{
                  width: '30rem',
                  height: 'auto',
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
                <FormikControls control="formikInputArray" name="subTasks" />

                <Box sx={{ mt: 2, display: 'flex' }}>
                  <Typography>Created At : &nbsp;</Typography>
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.secondary.main,
                    }}
                  >
                    {new Date(active_task.createdAt).toUTCString()}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    mt: 2,
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  onClick={handleDelete}
                  sx={{
                    mt: 2,
                    ml: 2,
                    backgroundColor: colors.bannerColor,
                    '&:hover': {
                      backgroundColor: colors.bannerColor,
                    },
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Form>
          </Formik>
        </Box>
      </Box>
    </Drawer>
  );
};

export default BoardDrawer;
