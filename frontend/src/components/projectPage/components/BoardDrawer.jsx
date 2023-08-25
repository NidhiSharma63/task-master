import { Drawer, Box, Typography, Divider, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  booleanDataInStore,
  isBoardDrawerOpen,
  isUpdatingTask,
} from "src/redux/boolean/booleanSlice";
import { taskDataInStore } from "src/redux/task/taskSlice";
import { Form, Formik } from "formik";
import FormikControls from "src/common/formik/FormikControls";
import { validationForUpdatingTask } from "src/constant/validation";
import {
  useUpdateTaskQueryWithDetails,
  useDeleteTask,
} from "src/hook/useTaskQuery";
import colors from "src/theme/variables";

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
    dueDate: active_task?.dueDate ?? null,
    userId: active_task.userId,
    status: active_task.status,
    description: active_task?.description ?? "",
    subTasks: active_task?.subTasks ?? "",
    label: active_task?.label ?? "",
    labelColor: active_task?.labelColor ?? "#e33529",
    originalDate: "",
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
  };

  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDrawer-paper": {
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
                  width: "30rem",
                  height: "auto",
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

                <Box sx={{ mt: 2, display: "flex" }}>
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
                  variant="outlined"
                  type="submit"
                  sx={{
                    mt: 2,
                    color: colors.secondaryColor,
                    borderColor: colors.secondaryTextColor,
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

                    backgroundColor: "rgb(168, 13, 13)",
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
