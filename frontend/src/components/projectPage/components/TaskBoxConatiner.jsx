import { Box, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const TaskBoxConatiner = ({ name }) => {
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
        <Typography sx={{ fontWeight: 600 }} variant="subtitle">
          {" "}
          {name}
        </Typography>
        <AddIcon
          sx={{
            cursor: "pointer",
            color: (theme) => theme.palette.primary.main,
          }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          mt: 1,
          height: "calc(100% - 30px)",
          borderRadius: ".6rem",
          boxShadow: "0px 0px 4px 1px #00000014",
        }}
        className="box"
      ></Box>
    </Grid>
  );
};

export default TaskBoxConatiner;
