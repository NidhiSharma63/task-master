import { Box, Button, IconButton } from "@mui/material";
import TaskBoxConatiner from "./components/TaskBoxConatiner";
import BoardDrawer from "src/components/projectPage/components/BoardDrawer";
import { DragDropContext } from "react-beautiful-dnd";
import useBoard from "src/hook/board/useBoard";
import useAddColumn from "src/hook/board/useAddColumn";
import { CommonLoaderWithBackDrop } from "src/common/loader/CommonLoader";
import colors from "src/theme/variables";
import { ClipLoader } from "react-spinners";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const Board = () => {
  const { finalState, isAddColBtnClicked, handleClickOnAddColsBtn, setIsAddColBtnClicked, handleDragEnd, isLoading } =
    useBoard();

  const { colsValue, handleColsValue, handleColsSubmit } = useAddColumn({
    setIsAddColBtnClicked,
  });

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
        display: "flex",
        alignItems: "center",
      }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        {finalState?.map((item) => {
          return <TaskBoxConatiner key={item._id} colId={item._id} name={item.name} data={item.tasks} />;
        })}
        <BoardDrawer />
      </DragDropContext>

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}>
          <ClipLoader color="white" />
        </Box>
      ) : (
        <Box item sx={{ height: "100%", minWidth: "250px" }}>
          {isAddColBtnClicked ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <textarea value={colsValue} className="textarea-col" onChange={handleColsValue}></textarea>
              <IconButton onClick={handleColsSubmit}>
                <CheckCircleRoundedIcon sx={{ color: "red", cursor: "pointer" }} />
              </IconButton>
            </Box>
          ) : (
            <Button
              // variant="contained"
              onClick={handleClickOnAddColsBtn}
              variant="outlined"
              sx={{
                ml: 1,
                color: colors.secondaryTextColor,
                borderColor: colors.secondaryTextColor,
              }}>
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
            className="box"></Box>
        </Box>
      )}
      <CommonLoaderWithBackDrop />
      {/*  */}
    </Box>
  );
};

export default Board;
