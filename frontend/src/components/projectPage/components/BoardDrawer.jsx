import { Drawer, Box, Typography, Divider, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  booleanDataInStore,
  isBoardDrawerOpen,
  isUpdatingTask,
} from "redux/boolean/booleanSlice";
import { taskDataInStore } from "redux/task/taskSlice";
import { Form, Formik } from "formik";
import FormikControls from "common/formik/FormikControls";
import { validationForUpdatingTask } from "constant/validation";
import {
  useUpdateTaskQueryWithDetails,
  useDeleteTask,
} from "hook/useTaskQuery";

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
    description: active_task?.description,
  };

  const handleSubmit = (values) => {
    mutate(values);
  };

  const handleDelete = () => {
    deleteTask({ id: active_task._id });
    setOpen(false);
    dispatch(isBoardDrawerOpen(false));
    dispatch(isUpdatingTask(false));
  };

  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: (theme) => theme.palette.secondary.main,
          width: 600,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          top: "5rem",
        }}
      >
        <Box>
          <Typography sx={{ pl: 2, textTransform: "capitalize" }} variant="h5">
            {active_task.task}
          </Typography>
          <Divider sx={{ mt: 2 }} />
        </Box>
        <Box
          sx={{
            ml: 2,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            mt: 1,
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
                  width: "30rem",
                  height: "auto",
                }}
              >
                <FormikControls control="formikInput" name="task" />
                <FormikControls control="formikDatePicker" name="dueDate" />
                <FormikControls control="formikTextArea" name="description" />
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
                    {new Date(active_task.createdAt).toUTCString()}
                  </Typography>
                </Box>
                <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                  Save
                </Button>
                <Button
                  variant="contained"
                  onClick={handleDelete}
                  sx={{
                    mt: 2,
                    ml: 2,

                    backgroundColor: "rgb(168, 13, 13)",
                    "&:hover": {
                      background: "white",
                      borderColor: (theme) => theme.palette.primary.main,
                      color: (theme) => theme.palette.primary.main,
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
