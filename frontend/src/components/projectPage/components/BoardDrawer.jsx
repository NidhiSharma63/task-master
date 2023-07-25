import { Drawer, Box, Typography, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  booleanDataInStore,
  isBoardDrawerOpen,
} from "src/redux/boolean/booleanSlice";
import { taskDataInStore } from "src/redux/task/taskSlice";

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
      </Box>
    </Drawer>
  );
};

export default BoardDrawer;
