import React from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskBoxConatiner from "./components/TaskBoxConatiner";

const Board = () => {
  const { active_project } = useParams();
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
      <TaskBoxConatiner name={"Todo"} />
      <TaskBoxConatiner name={"In progress"} />
      <TaskBoxConatiner name={"In priority"} />
      <TaskBoxConatiner name={"Done"} />
    </Grid>
  );
};

export default Board;
