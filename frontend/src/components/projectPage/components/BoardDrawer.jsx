import { Drawer } from "@mui/material";
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
    <Drawer anchor={"right"} open={open} onClose={handleClose}>
      <h1>Hi i'm drawer</h1>
    </Drawer>
  );
};

export default BoardDrawer;
