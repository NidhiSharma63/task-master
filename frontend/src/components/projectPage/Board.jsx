import { Grid } from "@mui/material";
import TaskBoxConatiner from "./components/TaskBoxConatiner";
import BoardDrawer from "../../components/projectPage/components/BoardDrawer";
import { DragDropContext } from "react-beautiful-dnd";

import useBoard from "../../hook/board/useBoard";

const Board = () => {
  const { hanldeDragEnd, finalDataWithColumn } = useBoard();

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
        {finalDataWithColumn?.map((item) => {
          return (
            <TaskBoxConatiner
              key={item._id}
              name={item.name}
              data={item.tasks}
            />
          );
        })}
        <BoardDrawer />
      </DragDropContext>
    </Grid>
  );
};

export default Board;
