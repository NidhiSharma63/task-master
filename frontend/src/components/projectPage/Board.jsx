import { Box, Button } from "@mui/material";
import TaskBoxConatiner from "./components/TaskBoxConatiner";
import BoardDrawer from "../../components/projectPage/components/BoardDrawer";
import { DragDropContext } from "react-beautiful-dnd";
import useBoard from "../../hook/board/useBoard";
import useAddColumn from "../../hook/board/useAddColumn";

const Board = () => {
  const {
    finalState,
    isAddColBtnClicked,
    handleClickOnAddColsBtn,
    setIsAddColBtnClicked,
  } = useBoard();

  const { colsValue, handleColsValue } = useAddColumn({
    setIsAddColBtnClicked,
  });

  const hanldeDragEnd = () => {};
  return (
    <Box
      container
      gap={2}
      sx={{
        position: "relative",
        height: "calc(100vh - 180px)",
        marginTop: 8,
        width: "1115px",
        pl: 3,
        // overflowY: "scroll",
        display: "flex",
        alignItems: "center",
      }}
    >
      <DragDropContext onDragEnd={hanldeDragEnd}>
        {finalState?.map((item) => {
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

      <Box item sx={{ height: "100%", minWidth: "250px" }}>
        {isAddColBtnClicked ? (
          <textarea
            value={colsValue}
            className="textarea-col"
            onChange={handleColsValue}
          ></textarea>
        ) : (
          <Button
            sx={{ ml: 1 }}
            variant="contained"
            onClick={handleClickOnAddColsBtn}
          >
            Add Section
          </Button>
        )}

        <Box
          sx={{
            // border: "1px solid red",
            width: "100%",
            mt: 1,
            height: "calc(100% - 30px)",
            borderRadius: ".6rem",
            boxShadow: "0px 0px 4px 1px #00000014",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
            overflowY: "auto",
            p: 1,
          }}
          className="box"
        ></Box>
      </Box>

      {/*  */}
    </Box>
  );
};

export default Board;
