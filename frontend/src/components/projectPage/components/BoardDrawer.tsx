import { Box, Button, Divider, Drawer, Typography } from '@mui/material';
import { deleteObject, ref } from 'firebase/storage';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import sanitize from 'sanitize-html';
import { IFormikValuesForUpdatingTask } from 'src/common/Interface/Interface';
import FormikControls from 'src/common/formik/FormikControls';
import { validationForUpdatingTask } from 'src/constant/validation';
import { storage } from 'src/firebase/config';
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
/**
 * interface
 */

const BoardDrawer = () => {
  const { active_task } = useSelector(taskDataInStore);
  const { is_board_drawer_open } = useSelector(booleanDataInStore);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(is_board_drawer_open);
  const { mutate } = useUpdateTaskQueryWithDetails();
  const { mutate: deleteTask } = useDeleteTask(active_task?.status);
  const [toggleEditModeForDescription, setToggleEditModeForDescription] =
    useState(false);
  const [isTaskSavedAfterUpdating, setIsTaskSavedAfterUpdating] =
    useState(false);

  useEffect(() => {
    setOpen(is_board_drawer_open);
  }, [is_board_drawer_open]);

  /**
   * handle close of drawer
   */
  const handleClose = () => {
    setOpen(false);
    dispatch(isBoardDrawerOpen(false));
    setToggleEditModeForDescription(false);

    /**
     * check if user added the image and that image stored in firebase but user didn't
     * click on the save button
     */
    if (!isTaskSavedAfterUpdating) {
    }
  };

  const initialValues: IFormikValuesForUpdatingTask = {
    task: active_task.task,
    _id: active_task._id,
    dueDate: new Date(active_task?.dueDate) ?? null,
    userId: active_task.userId,
    status: active_task.status,
    description: active_task?.description ?? '',
    subTasks: active_task?.subTasks ?? '',
    label: active_task?.label ?? '',
    labelColor: active_task?.labelColor ?? '#e33529',
    color: active_task?.color,
    projectName: active_task.projectName,
    images: active_task.images ?? [],
  };

  const handleSubmit = async (values: IFormikValuesForUpdatingTask) => {
    mutate(values);
    setIsTaskSavedAfterUpdating(true);
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

    /**
     * also delete the image from firebase
     */
    const images = active_task.images;
    images.forEach((img: string) => {
      const storageRef = ref(storage, img);
      deleteObject(storageRef).catch(() => {
        toast.error("couldn't delete the image");
        console.log('something went wrong while deleting the file');
      });
    });
  };

  /**
   * handleToggleModeForDescription
   */

  const handleToggleModeForDescription = () => {
    setToggleEditModeForDescription((prev) => !prev);
  };

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
                <FormikControls control="formikInput" name="task" />
                <FormikControls
                  control="formikInputForLable"
                  name="label"
                  colorName="labelColor"
                />
                <FormikControls control="formikDatePicker" name="dueDate" />

                <Typography sx={{ mt: 2, mb: 1 }} variant="h6">
                  Description
                </Typography>
                {toggleEditModeForDescription || !active_task.description ? (
                  <FormikControls
                    control="tinyMceDescription"
                    name="description"
                    setToggleEditModeForDescription={
                      setToggleEditModeForDescription
                    }
                    active_task={active_task}
                  />
                ) : (
                  <Box
                    onClick={handleToggleModeForDescription}
                    sx={{
                      height: 'fit-content',
                      width: '100%',
                      border: '1px solid red',
                      borderRadius: '.4rem',
                      mt: 3,
                      p: 2,
                      paddingLeft: 3,
                      color: colors.textColor,
                      borderColor: (theme) => theme.palette.grey[500],
                    }}
                    dangerouslySetInnerHTML={{
                      __html: sanitize(active_task.description),
                    }}
                  />
                )}
                <FormikControls
                  control="images"
                  name="images"
                  handleSubmit={handleSubmit}
                />
                <FormikControls control="formikInputArray" name="subTasks" />
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
