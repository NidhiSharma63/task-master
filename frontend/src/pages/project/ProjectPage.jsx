import ProjectNameModal from "../../components/Layout/components/ProjectNameModal";
import { Box, Typography, Button } from "@mui/material";
import Headers from "../../components/projectPage/components/Headers";
import { Outlet } from "react-router-dom";
import { useGetProjectQuery } from "../../hook/useProjectQuery";
import { useDispatch } from "react-redux";
import { isProjectNameModalOpen } from "../../redux/boolean/booleanSlice";

const ProjectPage = () => {
  const { data } = useGetProjectQuery();
  const dispatch = useDispatch();
  console.log(data, "::::DATA::::::");

  const handleOpenProjectModal = () => {
    dispatch(isProjectNameModalOpen(true));
  };

  return (
    <Box>
      {data?.projects?.length > 0 ? (
        <Headers />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // border: "1px solid red",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "1rem",
            mb: 4,
            mr: 8,
          }}
        >
          <Typography variant="h5">
            You have no project. <br />
            Create projects to manage your tasks
          </Typography>
          <Button variant="contained" onClick={handleOpenProjectModal}>
            Add Task
          </Button>
        </Box>
      )}
      <Outlet />
      <ProjectNameModal />
    </Box>
  );
};

export default ProjectPage;
