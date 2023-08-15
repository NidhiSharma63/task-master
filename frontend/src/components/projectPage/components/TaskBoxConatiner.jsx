import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import colors from "../../../theme/variables";
import { Draggable, Droppable } from "react-beautiful-dnd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useTaskBoxContainer from "../../../hook/board/useTaskBoxContainer";

const TaskBoxContainer = ({ name, data }) => {
  const {
    handleClickOnTask,
    handleInput,
    handleBlur,
    handleChange,
    handleAddTask,
    handleClickForAddingTaskFromBottom,
    handleClickOnThreeDots,
    textAreaValuesBottom,
    textAreaValuesTop,
  } = useTaskBoxContainer({ data, name });

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
        <Typography sx={{ fontWeight: 600 }} variant="subtitle1">
          {name}
        </Typography>
        <Box>
          <AddIcon
            onClick={handleAddTask}
            sx={{
              cursor: "pointer",
              color: (theme) => theme.palette.primary.main,
            }}
          />
          <MoreVertIcon onClick={handleClickOnThreeDots} />
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
              ))}
              {data?.map((item) => {
                return (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={item.index}
                  >
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          border: `1px solid ${colors.lightGrey}`,
                          width: "100%",
                          padding: 2,
                          backgroundColor: "rgba(255, 255, 255, 0.64)",
                          borderRadius: "0.4rem",
                          marginBottom: "1rem",
                          cursor: "pointer",
                        }}
                        onClick={() => handleClickOnTask(item)}
                      >
                        <Typography>{item.task}</Typography>
                      </Box>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
              {textAreaValuesBottom?.map((value, index) => (
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
              ))}
              {data?.length > 0 ? (
                <Button
                  variant="contained"
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
