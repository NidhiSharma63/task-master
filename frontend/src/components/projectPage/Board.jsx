import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import TaskBoxConatiner from "./components/TaskBoxConatiner";
import { useGetTaskAccordingToStatus } from "src/hook/useTaskQuery";
import BoardDrawer from "src/components/projectPage/components/BoardDrawer";
import { statesOfTaskManager } from "src/constant/Misc";

const Board = () => {
  const { data, isLoading, status } = useGetTaskAccordingToStatus();
  const [inTodo, setInTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [inPrority, setInPrority] = useState([]);
  const [inDone, setInDone] = useState([]);
  const statusStates = {
    Todo: [inTodo, setInTodo],
    "In progress": [inProgress, setInProgress],
    "In priority": [inPrority, setInPrority],
    Done: [inDone, setInDone],
  };

  useEffect(() => {
    // Only proceed if the data is loaded and not empty.
    if (!isLoading && data && data.length > 0) {
      // State and respective setters for each status

      // Iterate over each task status
      statesOfTaskManager.forEach((taskStatus) => {
        // Find the corresponding data items for the current task status
        const items = data.filter((item, i) => status[i] === taskStatus);

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
    }
    // If isLoading, data, or any of the states change, the useEffect hook will run again.
  }, [isLoading, data, inTodo, inProgress, inPrority, inDone, status]);

  // console.log(inDone, inTodo);

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
      <TaskBoxConatiner name={"Todo"} data={inTodo} />
      <TaskBoxConatiner name={"In progress"} data={inProgress} />
      <TaskBoxConatiner name={"In priority"} data={inPrority} />
      <TaskBoxConatiner name={"Done"} data={inDone} />
      <BoardDrawer />
    </Grid>
  );
};

export default Board;
