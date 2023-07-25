import { Drawer, Box, Typography, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  booleanDataInStore,
  isBoardDrawerOpen,
} from "src/redux/boolean/booleanSlice";
import { taskDataInStore } from "src/redux/task/taskSlice";
import { Form, Formik } from "formik";
import FormikControls from "src/common/formik/FormikControls";

const BoardDrawer = () => {
  const { active_task } = useSelector(taskDataInStore);
  const { is_board_drawer_open } = useSelector(booleanDataInStore);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(is_board_drawer_open);

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
    createdAt: active_task.task,
    userId: active_task.userId,
    status: active_task.status,
    description: "Only for test",
  };

  const handleSubmit = (values) => {
    console.log(values, ":::values:::");
  };

  console.log(active_task);
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
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <Box
                sx={{
                  width: "30rem",
                }}
              >
                <FormikControls control="formikInput" name="task" />
                <FormikControls control="formikDatePicker" name="due-date" />
                <FormikControls control="formikTextArea" name="description" />
              </Box>
            </Form>
          </Formik>
        </Box>
      </Box>
    </Drawer>
  );
};

export default BoardDrawer;
