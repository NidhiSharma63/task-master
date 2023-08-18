import {
  Box,
  Button,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Droppable } from "react-beautiful-dnd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useTaskBoxContainer from "../../../hook/board/useTaskBoxContainer";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import useAddColumn from "../../../hook/board/useAddColumn";
import useDeleteColumn from "../../../hook/board/useDeleteColumn";
import TaskCard from "./TaskCard";
import { ClipLoader } from "react-spinners";

const TaskBoxContainer = ({ name, data, colId }) => {
  const {
    handleClickOnTask,
    handleInput,
    handleBlur,
    handleChange,
    handleAddTask,
    handleClickForAddingTaskFromBottom,
    handleClickOnThreeDots,
    handleCloseOfColsIcons,
    handleClickOnRename,
    setIsColsRename,
    textAreaValuesBottom,
    textAreaValuesTop,
    anchorElForColumnIcons,
    openColsIcons,
    isColsRename,
    show_loader_for_task,
  } = useTaskBoxContainer({ data, name });

  const { colsValue, handleColsValue } = useAddColumn({
    setIsAddColBtnClicked: setIsColsRename,
    isColsRename,
    colId,
    prevColName: name,
  });

  const { deleteColumn } = useDeleteColumn({ colId });
  // const { userName } = useLayout();

  return (
    <Box sx={{ height: "100%", minWidth: "250px" }}>
      <Box
        sx={{
          padding: "0 .7rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {isColsRename ? (
          <textarea
            value={colsValue.length > 0 ? colsValue : name}
            className="textarea-col"
            onChange={handleColsValue}
          ></textarea>
        ) : (
          <Typography sx={{ fontWeight: 600 }} variant="subtitle1">
            {name}
          </Typography>
        )}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton disabled={show_loader_for_task}>
            {" "}
            <AddIcon
              onClick={handleAddTask}
              sx={{
                cursor: "pointer",
                color: (theme) => theme.palette.primary.main,
              }}
            />
          </IconButton>
          <MoreVertIcon
            sx={{ cursor: "pointer" }}
            onClick={handleClickOnThreeDots}
          />
          <Menu
            id="logout"
            anchorEl={anchorElForColumnIcons}
            open={openColsIcons}
            onClose={handleCloseOfColsIcons}
          >
            <MenuItem
              sx={{
                color: (theme) => theme.palette.primary.main,
              }}
              onClick={handleClickOnRename}
            >
              <DriveFileRenameOutlineIcon />
            </MenuItem>
            <MenuItem
              sx={{
                color: (theme) => theme.palette.primary.main,
              }}
              onClick={deleteColumn}
            >
              <DeleteIcon />
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Droppable droppableId={name}>
        {(provided) => {
          return (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{
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
            >
              {textAreaValuesTop?.map((value, index) => (
                <>
                  <textarea
                    key={index}
                    value={value}
                    data-id={name}
                    onChange={(event) =>
                      handleChange(event, index, event.target.value)
                    }
                    onBlur={(event) => handleBlur(event, index)}
                    onInput={handleInput}
                    className="textArea"
                  />
                  {show_loader_for_task && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        mt: -1,
                      }}
                    >
                      <ClipLoader sx={{ mt: -2 }} />
                    </Box>
                  )}
                </>
              ))}
              {data?.map((item) => {
                return (
                  <TaskCard
                    key={item._id}
                    item={item}
                    handleClickOnTask={handleClickOnTask}
                  />
                );
              })}
              {provided.placeholder}
              {textAreaValuesBottom?.map((value, index) => (
                <>
                  <textarea
                    key={index}
                    value={value}
                    data-id={name}
                    onChange={(event) =>
                      handleChange(event, index, event.target.value)
                    }
                    onBlur={(event) => handleBlur(event, index)}
                    onInput={handleInput}
                    className="textArea"
                  />
                  {show_loader_for_task && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        mt: -1,
                      }}
                    >
                      <ClipLoader sx={{ mt: -2 }} />
                    </Box>
                  )}
                </>
              ))}
              {data?.length > 0 ? (
                <Button
                  variant="contained"
                  disabled={show_loader_for_task}
                  onClick={handleClickForAddingTaskFromBottom}
                >
                  Add Task
                </Button>
              ) : null}
            </Box>
          );
        }}
      </Droppable>
    </Box>
  );
};
export default TaskBoxContainer;
