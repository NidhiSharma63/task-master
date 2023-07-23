import React from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Box } from "@mui/material";

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
      <Grid item xs={2.8} sx={{ height: "100%" }}>
        <Typography sx={{ fontWeight: 600 }} variant="subtitle">
          {" "}
          Todo
        </Typography>
        <Box
          sx={{
            width: "100%",
            // border: "1px solid green",
            mt: 1,

            height: "calc(100% - 30px)",
            borderRadius: ".6rem",
            boxShadow: "0px 0px 4px 1px #00000014",
          }}
          className="box"
        ></Box>
      </Grid>
      <Grid item xs={2.8}>
        <Typography sx={{ fontWeight: 600 }} variant="subtitle">
          In progress
          <Box
            sx={{
              width: "100%",
              // border: "1px solid green",
              mt: 1,

              height: "calc(100% - 30px)",
              borderRadius: ".6rem",
              boxShadow: "0px 0px 4px 1px #00000014",
            }}
            className="box"
          ></Box>
        </Typography>
      </Grid>
      <Grid item xs={2.8}>
        <Typography sx={{ fontWeight: 600 }} variant="subtitle">
          In priority
        </Typography>
        <Box
          sx={{
            width: "100%",
            // border: "1px solid green",
            mt: 1,

            height: "calc(100% - 30px)",
            borderRadius: ".6rem",
            boxShadow: "0px 0px 4px 1px #00000014",
          }}
          className="box"
        ></Box>
      </Grid>
      <Grid item xs={2.8}>
        <Typography sx={{ fontWeight: 600 }} variant="subtitle">
          Done
        </Typography>
        <Box
          sx={{
            width: "100%",
            // border: "1px solid green",
            mt: 1,

            height: "calc(100% - 30px)",
            borderRadius: ".6rem",
            boxShadow: "0px 0px 4px 1px #00000014",
          }}
          className="box"
        ></Box>
      </Grid>
    </Grid>
  );
};

export default Board;
