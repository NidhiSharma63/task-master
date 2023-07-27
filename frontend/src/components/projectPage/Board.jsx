import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import TaskBoxConatiner from "./components/TaskBoxConatiner";
import { useGetTaskAccordingToStatus } from "src/hook/useTaskQuery";
import BoardDrawer from "src/components/projectPage/components/BoardDrawer";
import { statesOfTaskManager } from "src/constant/Misc";
import { DragDropContext } from "react-beautiful-dnd";
import { useUpdateTaskQuery } from "src/hook/useTaskQuery";
import { useSelector, useDispatch } from "react-redux";
import {
  booleanDataInStore,
  isUpdatingTask,
  isProjectNameModalOpen,
} from "src/redux/boolean/booleanSlice";
import { useGetProjectQuery } from "src/hook/useProjectQuery";

const Board = () => {
  const dispatch = useDispatch();
  const { is_updating_task } = useSelector(booleanDataInStore);
  const { data, isLoading, status } = useGetTaskAccordingToStatus();
  const [inTodo, setInTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [inPrority, setInPrority] = useState([]);
  const [inDone, setInDone] = useState([]);
  const { mutate } = useUpdateTaskQuery();
  const { data: projectData } = useGetProjectQuery();

  const statusStates = {
    Todo: [inTodo, setInTodo],
    "In progress": [inProgress, setInProgress],
    "In priority": [inPrority, setInPrority],
    Done: [inDone, setInDone],
  };

  useEffect(() => {
    if (is_updating_task) return;
    // Only proceed if the data is loaded and not empty.
    if (!isLoading && data && data.length > 0) {
      // State and respective setters for each status

      // Iterate over each task status
      statesOfTaskManager.forEach((taskStatus) => {
        // Find the corresponding data items for the current task status
        const items = data.filter((item, i) => status[i] === taskStatus).flat();

        // Get current state and its setter for the status
        const [currentState, setter] = statusStates[taskStatus];

        // Convert both old and new data items to JSON for comparison
        const oldItemsJson = JSON.stringify(currentState);
        const newItemsJson = JSON.stringify(items);

        // If the data items for the current task status have changed...
        if (oldItemsJson !== newItemsJson) {
          // ...Update the state with the new data items.
          setter(items);
        }
      });
      dispatch(isUpdatingTask(false));
    }
  }, [isLoading, data]);

  const hanldeDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const [activeState, settersActiveState] = statusStates[source.droppableId];
    const [destinationState, setterDestination] =
      statusStates[destination.droppableId];

    const moveAbleTask = activeState.splice(source.index, 1); // Use splice instead of slice

    const updateTask = { ...moveAbleTask[0], status: destination.droppableId };

    setterDestination((prev) => [...prev, updateTask]);
    mutate(updateTask);
    dispatch(isUpdatingTask(true));
  };

  const handleOpenProjectModal = () => {
    dispatch(isProjectNameModalOpen(true));
  };

  return (
    <Grid
      container
      gap={2}
      sx={{
        position: "relative",
        height: "calc(100vh - 140px)",
        marginTop: 8,
        pl: 3,
      }}
    >
      {projectData?.projects?.length > 0 ? (
        <DragDropContext onDragEnd={hanldeDragEnd}>
          <TaskBoxConatiner name={"Todo"} data={inTodo} />
          <TaskBoxConatiner name={"In progress"} data={inProgress} />
          <TaskBoxConatiner name={"In priority"} data={inPrority} />
          <TaskBoxConatiner name={"Done"} data={inDone} />
          <BoardDrawer />
        </DragDropContext>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // border: "1px solid red",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "1rem",
            mb: 4,
            mr: 8,
          }}
        >
          <Typography variant="h5">
            You have no project. <br />
            Create projects to manage your tasks
          </Typography>
          <Button variant="contained" onClick={handleOpenProjectModal}>
            Add Task
          </Button>
        </Box>
      )}
    </Grid>
  );
};

export default Board;
