import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import TaskBoxConatiner from "./components/TaskBoxConatiner";
import { useGetTaskAccordingToStatus } from "src/hook/useTaskQuery";
import BoardDrawer from "src/components/projectPage/components/BoardDrawer";

const Board = () => {
  const { data, isLoading, status } = useGetTaskAccordingToStatus();
  const [inTodo, setInTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [inPrority, setInPrority] = useState([]);
  const [inDone, setInDone] = useState([]);
  useEffect(() => {
    // Only proceed if the data is loaded and not empty.
    if (!isLoading && data && data.length > 0) {
      // Create an object mapping status names to their respective state setter functions.
      const setters = {
        Todo: setInTodo,
        "In progress": setInProgress,
        "In priority": setInPrority,
        Done: setInDone,
      };

      // Create an object mapping status names to their current states.
      const currentStates = {
        Todo: inTodo,
        "In progress": inProgress,
        "In priority": inPrority,
        Done: inDone,
      };

      // Iterate over the loaded data.
      data.map((items, i) => {
        // If a setter exists for this status and the current state does not match the new data...
        if (
          status[i] &&
          setters[status[i]] &&
          JSON.stringify(currentStates[status[i]]) !== JSON.stringify(items)
        ) {
          // ...Update the state with the new data.
          setters[status[i]](items);
        }
      });
    }
    // If isLoading, data, or any of the states change, the useEffect hook will run again.
  }, [isLoading, data, inTodo, inProgress, inPrority, inDone]);
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

// status.map((item) => {
//   if (item === "Todo") {
//     console.log(data, "TODO");
//   }
//   if (item === "In progress") {
//     console.log(data, "In progress");
//   }
//   if (item === "In priority") {
//     console.log(data, "In priority");
//   }
//   if (item === "Done") {
//     console.log(data, "Done");
//   }
// });
// console.log("Else Part:::", status);
// if (status === "Todo") {
//   console.log(data, "TODO");
// }
// if (status === "In progress") {
//   console.log(data, "In progress");
// }
// if (status === "In priority") {
//   console.log(data, "In priority");
// }
// if (status === "Done") {
//   console.log(data, "Done");
// }
