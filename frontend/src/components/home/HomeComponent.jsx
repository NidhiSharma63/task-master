import { getUserFirstName } from "../../utils/getUserFirstName";
import { getCurrentDate } from "../../utils/getCurrentDate";
import TaskComponent from "../../components/home/components/TaskComponent";
import { Box, Typography } from "@mui/material";
import ProjectComponent from "../../components/home/components/ProjectComponent";
import useHome from "../../hook/home/useHome";

const HomeComponent = () => {
  const {
    projectData,
    projectIsLoading,
    backgroundColors,
    taskData,
    isTaskLoading,
  } = useHome();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        // mt: 5,
        gap: 5,
        height: "calc(100vh - 80px)",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          // mt: 1,
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
          height: "calc(100% - 130px)",
          display: "flex",
          gap: 4,
        }}
      >
        <TaskComponent
          backgroundColors={backgroundColors}
          projectData={projectData}
          taskData={taskData}
          isLoading={isTaskLoading}
        />
        <ProjectComponent
          backgroundColors={backgroundColors}
          projectData={projectData}
          isLoading={projectIsLoading}
        />
      </Box>
    </Box>
  );
};

export default HomeComponent;
