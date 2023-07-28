import { getUserFirstName } from "src/utils/getUserFirstName";
import { getCurrentDate } from "src/utils/getCurrentDate";
import TaskComponent from "src/components/home/components/TaskComponent";
import { Box, Typography } from "@mui/material";

const HomeComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        mt: 5,
        gap: 5,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {getCurrentDate()}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 600, mt: 1 }}>
          Hello, {getUserFirstName()}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "90%",
        }}
      >
        <TaskComponent />
        <Box></Box>
      </Box>
    </Box>
  );
};

export default HomeComponent;
