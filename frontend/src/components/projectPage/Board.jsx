import React from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

const Board = () => {
  const { active_project } = useParams();
  return (
    <Grid
      container
      gap={1}
      sx={{
        border: "1px solid green",
        position: "relative",
        height: "calc(100vh - 140px)",
        marginTop: 8,
        pl: 3,
      }}
    >
      <Grid item xs={2.8} border={"1px solid red"}>
        <Typography sx={{ fontWeight: 600 }} variant="subtitle">
          {" "}
          Todo
        </Typography>
      </Grid>
      <Grid item xs={2.8} border={"1px solid red"}>
        <Typography sx={{ fontWeight: 600 }} variant="subtitle">
          In progress
        </Typography>
      </Grid>
      <Grid item xs={2.8} border={"1px solid red"}>
        <Typography sx={{ fontWeight: 600 }} variant="subtitle">
          In priority
        </Typography>
      </Grid>
      <Grid item xs={2.8} border={"1px solid red"}>
        <Typography sx={{ fontWeight: 600 }} variant="subtitle">
          Done
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Board;
