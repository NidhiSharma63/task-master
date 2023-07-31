import { Box, Button, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useAddTaskQuery } from "src/hook/useTaskQuery";
import colors from "src/theme/variables";
import { useDispatch } from "react-redux";
import { activeTask } from "src/redux/task/taskSlice";
import {
  booleanDataInStore,
  isBoardDrawerOpen,
} from "src/redux/boolean/booleanSlice";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { projectDataInStore } from "src/redux/projects/projectSlice";

const TaskBoxContainer = ({ name, data }) => {
  const dispatch = useDispatch();
  const [textAreaValues, setTextAreaValues] = useState([]);
  const { active_project } = useSelector(projectDataInStore);
  const { is_task_displayed } = useSelector(booleanDataInStore);
  const {
    mutate,
    // isLoading: isTaskAddLoading,
    // mutateAsync,
    isSuccess,
  } = useAddTaskQuery();
  const [currentWorkingTestAreaIndex, setCurrentWorkingTestAreaIndex] =
    useState(null);
  const handleAddTask = () => {
    setTextAreaValues((prevValues) => [...prevValues, ""]);
  };

  const handleChange = (event, index, newValue) => {
    // console.log(event.target.dataset);
    setTextAreaValues((prevValues) => {
      const copyValues = [...prevValues];
      copyValues[index] = newValue;
      return copyValues;
    });
  };

  const handleBlur = async (event, index) => {
    if (textAreaValues[index].trim().length === 0) {
      setTextAreaValues((prevValues) => {
        const copyValues = [...prevValues];
        copyValues.splice(index, 1);
        return copyValues;
      });
      return;
    }
    const payloadForTask = {
      task: textAreaValues[index].trim(),
      status: name,
      projectName: active_project,
    };
    mutate(payloadForTask);
    setCurrentWorkingTestAreaIndex(index);
  };

  useEffect(() => {
    if (
      currentWorkingTestAreaIndex !== null &&
      is_task_displayed &&
      isSuccess
    ) {
      setTextAreaValues((prevValues) => {
        const copyValues = [...prevValues];
        copyValues.splice(currentWorkingTestAreaIndex, 1);
        return copyValues;
      });
      setCurrentWorkingTestAreaIndex(null);
    }
  }, [is_task_displayed, currentWorkingTestAreaIndex, isSuccess]);

  /**
   * for managing style of textarea
   */
  const handleInput = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleClickOnTask = (task) => {
    dispatch(activeTask(task));
    dispatch(isBoardDrawerOpen(true));
  };

  return (
    <Grid item xs={2.8} sx={{ height: "100%" }}>
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
        <AddIcon
          onClick={handleAddTask}
          sx={{
            cursor: "pointer",
            color: (theme) => theme.palette.primary.main,
          }}
        />
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
              {textAreaValues?.map((value, index) => (
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

              {data?.map((item, index) => {
                return (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={index}
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
              {data?.length > 0 ? (
                <Button variant="contained">Add Task</Button>
              ) : null}
            </Box>
          );
        }}
      </Droppable>
    </Grid>
  );
};
export default TaskBoxContainer;
