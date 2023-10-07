import { Box, Button, Divider, Drawer, Typography } from '@mui/material';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sanitize from 'sanitize-html';
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
import { v4 } from 'uuid';

const BoardDrawer = () => {
  const { active_task } = useSelector(taskDataInStore);
  const { is_board_drawer_open } = useSelector(booleanDataInStore);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(is_board_drawer_open);
  const { mutate } = useUpdateTaskQueryWithDetails();
  const { mutate: deleteTask } = useDeleteTask(active_task?.status);
  const [toggleEditModeForDescription, setToggleEditModeForDescription] =
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
    attachments: active_task.attachments ?? [],
  };

  const handleSubmit = async (values) => {
    console.log(values);
    const { attachments } = values;
    /**
     * declaring the variable here to store the urls
     */
    const urlsForAttachments = [];

    /**
     * first put the urls that are stored in firebase
     */
    for (let i = 0; i < attachments.length; i++) {
      if (
        typeof attachments[i] === 'string' &&
        attachments[i].includes('firebasestorage.googleapis')
      ) {
        console.log(attachments[i], 'That was pushed into array before');
        urlsForAttachments.push(attachments[i]);
      }
    }

    /**
     * make a request call for firebase to store the url for attachments that are not present in firebase
     */
    await Promise.all(
      attachments?.map(async (attachment) => {
        try {
          if (
            typeof attachment === 'string' &&
            attachment.includes('firebasestorage.googleapis')
          )
            return;
          console.log(attachment, 'For which firebase trigger');
          const imageRef = ref(storage, `/images/${attachment.name}-${v4()}`);
          const snapshot = await uploadBytes(imageRef, attachment);
          const url = await getDownloadURL(snapshot.ref);
          urlsForAttachments.push(url);
        } catch (error) {
          console.error('Error uploading attachment:', error);
        }
      }),
    );

    /**
     * updating the attachements field from the firebse urls
     */
    const updatedValuesWithAttachmentsUrls = {
      ...values,
      attachments: urlsForAttachments,
    };
    console.log(urlsForAttachments, 'urlsForAttachments');
    mutate(updatedValuesWithAttachmentsUrls);
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
                  width: '90%',
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

                <Typography sx={{ mt: 2, mb: -2 }}>Description</Typography>
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
                      borderColor: (theme) => theme.palette.grey[500],
                    }}
                    dangerouslySetInnerHTML={{
                      __html: sanitize(active_task.description),
                    }}
                  ></Box>
                )}

                <FormikControls control="formikInputArray" name="subTasks" />
                <FormikControls control="attachments" name="attachments" />
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
