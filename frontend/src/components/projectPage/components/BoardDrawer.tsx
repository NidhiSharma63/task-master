import { Box, Button, Divider, Drawer, Typography } from '@mui/material';
import { deleteObject, ref } from 'firebase/storage';
import { Form, Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IAxiosPayload } from 'src/common/Interface/Interface';
import TinyMceContainer from 'src/common/TinyMceContainer';
import FormikDatePicker from 'src/common/formik/FormikDatePicker';
import FormikInput from 'src/common/formik/FormikInput';
import FormikInputArray from 'src/common/formik/FormikInputArray';
import FormikInputForLabel from 'src/common/formik/FormikInputForLabel';
import FormikImage from 'src/common/formik/formikImage';
import { validationForUpdatingTask } from 'src/constant/validation';
import { storage } from 'src/firebase/config';
import { useAppDispatch, useAppSelector } from 'src/hook/redux/hooks';
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
  const { active_task } = useAppSelector(taskDataInStore);
  const { is_board_drawer_open } = useAppSelector(booleanDataInStore);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(is_board_drawer_open);
  const { mutate } = useUpdateTaskQueryWithDetails();
  const { mutate: deleteTask } = useDeleteTask(active_task?.status);

  useEffect(() => {
    setOpen(is_board_drawer_open);
  }, [is_board_drawer_open]);

  /**
   * handle close of drawer
   */
  const handleClose = useCallback((): void => {
    setOpen(false);
    dispatch(isBoardDrawerOpen(false));
  }, [dispatch, setOpen]);

  const initialValues: IAxiosPayload = {
    task: active_task.task,
    _id: active_task._id,
    dueDate: new Date(active_task?.dueDate) ?? null,
    status: active_task.status,
    description: active_task?.description ?? '',
    subTasks: active_task?.subTasks ?? '',
    label: active_task?.label ?? '',
    labelColor: active_task?.labelColor ?? '#e33529',
    color: active_task?.color,
    projectName: active_task.projectName,
    images: active_task.images ?? [],
  };

  const handleSubmit = useCallback(
    (values: IAxiosPayload): void => {
      mutate(values);
    },
    [mutate],
  );

  const handleDelete = useCallback((): void => {
    setOpen(false);
    dispatch(isBoardDrawerOpen(false));
    dispatch(isUpdatingTask(false));
    dispatch(isBackdropLoaderDisplayedForTask(true));
    dispatch(isBackDropLoaderDisplayed(true));

    /**
     * also delete the image from firebase
     */
    const images = active_task.images;
    images.forEach((img: string) => {
      const storageRef = ref(storage, img);
      deleteObject(storageRef)
        .then(() => {
          deleteTask({
            _id: active_task._id,
            status: active_task.status,
            userId: active_task.userId,
            index: active_task.index,
            projectName: active_task.projectName,
          });
        })
        .catch(() => {
          toast.error("couldn't delete the image");
          console.log('something went wrong while deleting the file');
        });
    });
    if (images.length === 0) {
      deleteTask({
        _id: active_task._id,
        status: active_task.status,
        userId: active_task.userId,
        index: active_task.index,
        projectName: active_task.projectName,
      });
    }
  }, [
    active_task._id,
    active_task.images,
    active_task.index,
    active_task.projectName,
    active_task.status,
    active_task.userId,
    deleteTask,
    dispatch,
  ]);

  return (
    <Drawer
      anchor={'right'}
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 900,
        },
        backgroundColor: 'transparent',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          top: '4.2rem',
          backgroundColor: colors.offWhite,
          padding: 1,
          paddingTop: 2,
        }}
      >
        <Box>
          <Typography sx={{ pl: 2, textTransform: 'capitalize' }} variant="h5">
            {active_task.task}
          </Typography>
          <Divider sx={{ mt: 2, borderColor: colors.lineColor }} />
        </Box>
        <Box
          sx={{
            ml: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            mt: 1,
            mb: 2,
            width: '90%',
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
                  width: '90%',
                  height: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <FormikInput name="task" label="Task" />
                <FormikInputForLabel
                  name="label"
                  colorName="labelColor"
                  label="Label"
                />
                <FormikDatePicker name="dueDate" label="Due Date" />
                <TinyMceContainer />
                <FormikImage
                  name="images"
                  label="Images"
                  handleSubmit={handleSubmit}
                />
                <FormikInputArray label="Sub tasks" name="subTasks" />
                <Box sx={{ mt: 2, display: 'flex' }}>
                  <Typography variant="h6">Created At : &nbsp;</Typography>
                  <Typography
                    sx={{
                      color: colors.textColor,
                    }}
                    variant="h6"
                  >
                    {new Date(active_task.createdAt)
                      .toUTCString()
                      .substring(0, 17)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      mt: 2,
                      backgroundColor: colors.primaryColor,
                      '&:hover': {
                        backgroundColor: colors.primaryColor,
                      },
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
                      backgroundColor: '#6C6C6D',
                      '&:hover': {
                        backgroundColor: '#6C6C6D',
                      },
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Form>
          </Formik>
        </Box>
      </Box>
    </Drawer>
  );
};

export default BoardDrawer;
