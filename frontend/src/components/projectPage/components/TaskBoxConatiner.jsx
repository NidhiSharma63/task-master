import { Box, Button, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useRef, useState } from "react";
import { useAddTaskQuery } from "../../../hook/useTaskQuery";
import colors from "../../../theme/variables";
import { useDispatch } from "react-redux";
import { activeTask } from "../../../redux/task/taskSlice";
import {
  booleanDataInStore,
  isBoardDrawerOpen,
  isTaskDisplayed,
} from "../../../redux/boolean/booleanSlice";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { projectDataInStore } from "../../../redux/projects/projectSlice";

const TaskBoxContainer = ({ name, data }) => {
  const dispatch = useDispatch();
  const [textAreaValuesTop, setTextAreaValuesTop] = useState([]);
  const [textAreaValuesBottom, setTextAreaValuesBottom] = useState([]);
  const { active_project } = useSelector(projectDataInStore);
  const { is_task_displayed } = useSelector(booleanDataInStore);
  const { mutate } = useAddTaskQuery();
  const [currentWorkingTestAreaIndex, setCurrentWorkingTestAreaIndex] =
    useState(null);

  const isTaskAddedFromBottom = useRef(null);

  const handleAddTask = () => {
    setTextAreaValuesTop((prevValues) => ["", ...prevValues]);
    isTaskAddedFromBottom.current = false;
    dispatch(isTaskDisplayed(false));
  };

  const handleClickForAddingTaskFromBottom = () => {
    isTaskAddedFromBottom.current = true;
    setTextAreaValuesBottom((prevValues) => [...prevValues, ""]);
    dispatch(isTaskDisplayed(false));
  };

  const handleChange = (event, index, newValue) => {
    if (!isTaskAddedFromBottom.current) {
      setTextAreaValuesTop((prevValues) => {
        const copyValues = [...prevValues];
        copyValues[index] = newValue;
        return copyValues;
      });
    } else {
      setTextAreaValuesBottom((prevValues) => {
        const copyValues = [...prevValues];
        copyValues[index] = newValue;
        return copyValues;
      });
    }
  };

  const handleBlur = async (event, index) => {
    let valueOfTextField = "";
    let lastIndexOfCurrentTask = data?.[data.length - 1]?.index;

    if (!isTaskAddedFromBottom.current) {
      if (textAreaValuesTop[index].trim().length === 0) {
        setTextAreaValuesTop((prevValues) => {
          const copyValues = [...prevValues];
          copyValues.splice(index, 1);
          return copyValues;
        });
      } else {
        valueOfTextField = textAreaValuesTop[index].trim();
      }
    } else {
      if (textAreaValuesBottom[index].trim().length === 0) {
        setTextAreaValuesBottom((prevValues) => {
          const copyValues = [...prevValues];
          copyValues.splice(index, 1);
          return copyValues;
        });
      } else {
        valueOfTextField = textAreaValuesBottom[index].trim();
      }
    }

    if (!valueOfTextField) return;

    const payloadForTask = {
      task: valueOfTextField,
      status: name,
      projectName: active_project,
      index: isTaskAddedFromBottom.current ? lastIndexOfCurrentTask + 1 : 0,
    };

    mutate(payloadForTask);
    setCurrentWorkingTestAreaIndex(index);
  };

  useEffect(() => {
    if (is_task_displayed === true) {
      if (!isTaskAddedFromBottom.current) {
        setTextAreaValuesTop((prevValues) => {
          const copyValues = [...prevValues];
          copyValues.splice(currentWorkingTestAreaIndex, 1);
          return copyValues;
        });
      } else {
        setTextAreaValuesBottom((prevValues) => {
          const copyValues = [...prevValues];
          copyValues.splice(currentWorkingTestAreaIndex, 1);
          return copyValues;
        });
      }
      setCurrentWorkingTestAreaIndex(null);
    }
  }, [is_task_displayed, currentWorkingTestAreaIndex]);

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
