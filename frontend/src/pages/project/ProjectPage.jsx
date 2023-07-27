import React from "react";
import ProjectNameModal from "src/components/Layout/components/ProjectNameModal";
import { Box } from "@mui/material";
import Headers from "src/components/projectPage/components/Headers";
import { Outlet } from "react-router-dom";
import { useGetProjectQuery } from "src/hook/useProjectQuery";

const ProjectPage = () => {
  const { data } = useGetProjectQuery();
  return (
    <Box>
      {data?.projects?.length > 0 ? <Headers /> : null}
      <Outlet />
      <ProjectNameModal />
    </Box>
  );
};

export default ProjectPage;
