import { Box, Typography, Divider, Button } from "@mui/material";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import colors from "src/theme/variables";
import { isProjectNameModalOpen } from "src/redux/boolean/booleanSlice";
import ProjectNameModal from "src/components/Layout/components/ProjectNameModal";
import { useNavigate } from "react-router-dom";
import { activeProject } from "src/redux/projects/projectSlice";
import { KEY_FOR_STORING_ACTIVE_PROJECT } from "src/constant/Misc";
import { setValueToLs } from "src/utils/localstorage";

const ProjectComponent = ({ backgroundColors, projectData, isLoading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickOnAddProject = () => {
    dispatch(isProjectNameModalOpen(true));
  };

  const handleNavigationToProject = (name) => {
    navigate("/Dashboard");
    dispatch(activeProject(name));
    setValueToLs(KEY_FOR_STORING_ACTIVE_PROJECT, name);
  };

  return (
    <Box
      sx={{
        width: "50%",
        border: "1px solid",
        borderColor: (theme) => theme.palette.grey[400],
        borderRadius: "0.3rem",
      }}
    >
      <Box sx={{ padding: " 0.8rem" }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Projects
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ padding: "0.4rem" }}>
        <Button
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            color: "white",
            width: "100%",
            textAlign: "start",
            border: "1px solid",
            display: "flex",
            justifyContent: "flex-start",
            borderColor: (theme) => theme.palette.grey[400],
            "&:hover": {
              backgroundColor: colors.primaryHoverColor,
            },
          }}
          onClick={handleClickOnAddProject}
        >
          Add
        </Button>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ClipLoader color="#571159" />
          </Box>
        ) : (
          projectData?.projects?.map((item, i) => {
            return (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid",
                  borderColor: (theme) => theme.palette.grey[400],
                  cursor: "pointer",
                  borderRadius: ".4rem",
                  mb: 1,
                }}
                onClick={() => handleNavigationToProject(item.name)}
              >
                <Box
                  sx={{
                    width: "100%",
                    padding: "0.5rem",
                    backgroundColor: backgroundColors[i],
                    borderRadius: "0.3rem",
                  }}
                >
                  <Typography sx={{ fontWeight: 500, color: "white" }}>
                    {" "}
                    {item.name}
                  </Typography>
                </Box>
              </Box>
            );
          })
        )}
      </Box>
      <ProjectNameModal />
    </Box>
  );
};

export default ProjectComponent;
