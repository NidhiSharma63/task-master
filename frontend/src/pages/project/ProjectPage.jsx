import React from "react";
import ProjectNameModal from "src/components/Layout/components/ProjectNameModal";
import { Box } from "@mui/material";
import Headers from "src/components/projectPage/components/Headers";
import { Outlet } from "react-router-dom";

const ProjectPage = () => {
  return (
    <Box>
      <Headers />
      <Outlet />
      <ProjectNameModal />
    </Box>
  );
};

export default ProjectPage;
