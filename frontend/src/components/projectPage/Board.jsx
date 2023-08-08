import { Grid } from "@mui/material";
import TaskBoxConatiner from "./components/TaskBoxConatiner";
import BoardDrawer from "../../components/projectPage/components/BoardDrawer";
import { DragDropContext } from "react-beautiful-dnd";

import useBoard from "../../hook/board/useBoard";

const Board = () => {
  const { hanldeDragEnd, inTodo, inProgress, inPrority, inDone } = useBoard();

  return (
    <Grid
      container
      gap={2}
      sx={{
        position: "relative",
        height: "calc(100vh - 140px)",
        marginTop: 8,
        width: "1115px",
        pl: 3,
      }}
    >
      <DragDropContext onDragEnd={hanldeDragEnd}>
        <TaskBoxConatiner name={"Todo"} data={inTodo} />
        <TaskBoxConatiner name={"In progress"} data={inProgress} />
        <TaskBoxConatiner name={"In priority"} data={inPrority} />
        <TaskBoxConatiner name={"Done"} data={inDone} />
        <BoardDrawer />
      </DragDropContext>
    </Grid>
  );
};

export default Board;
