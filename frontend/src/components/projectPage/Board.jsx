import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import TaskBoxConatiner from "./components/TaskBoxConatiner";
import { useGetTaskAccordingToStatus } from "src/hook/useTaskQuery";
import BoardDrawer from "src/components/projectPage/components/BoardDrawer";

const Board = () => {
  const { data, isLoading } = useGetTaskAccordingToStatus();
  const [inTodo, setInTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [inPrority, setInPrority] = useState([]);
  const [inDone, setInDone] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      data?.map((items) => {
        // check the state
        items?.map((item) => {
          if (item.status === "Todo") {
            setInTodo(items);
          }
          if (item.status === "In progress") {
            setInProgress(items);
          }

          if (item.status === "In priority") {
            setInPrority(items);
          }
          if (item.status === "Done") {
            setInDone(items);
          }
        });
      });
    }
  }, [isLoading, data]);

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
