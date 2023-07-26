import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import TaskBoxConatiner from "./components/TaskBoxConatiner";
import { useGetTaskAccordingToStatus } from "src/hook/useTaskQuery";
import BoardDrawer from "src/components/projectPage/components/BoardDrawer";
import { statesOfTaskManager } from "src/constant/Misc";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useUpdateTaskQuery } from "src/hook/useTaskQuery";

const Board = () => {
  const { data, isLoading, status } = useGetTaskAccordingToStatus();
  const [isUpdating, setIsUpdating] = useState(false);
  const [inTodo, setInTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [inPrority, setInPrority] = useState([]);
  const [inDone, setInDone] = useState([]);
  const { mutate } = useUpdateTaskQuery();

  const statusStates = {
    Todo: [inTodo, setInTodo],
    "In progress": [inProgress, setInProgress],
    "In priority": [inPrority, setInPrority],
    Done: [inDone, setInDone],
  };

  useEffect(() => {
    if (isUpdating) return;
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
      setIsUpdating(false);
    }
    // If isLoading, data, or any of the states change, the useEffect hook will run again.
  }, [isLoading, data]);

  const hanldeDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const [activeState, settersActiveState] = statusStates[source.droppableId];
    const [destinationState, setterDestination] =
      statusStates[destination.droppableId];

    const moveAbleTask = activeState.splice(source.index, 1); // Use splice instead of slice
    moveAbleTask[0].status = destination.droppableId;
    setterDestination((prev) => [...prev, ...moveAbleTask]);
    mutate(moveAbleTask[0]);

    setIsUpdating(true);
  };

  return (
    <Grid
      container
      gap={2}
      sx={{
        // border: "1px solid green",
        position: "relative",
        height: "calc(100vh - 140px)",
        marginTop: 8,
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
