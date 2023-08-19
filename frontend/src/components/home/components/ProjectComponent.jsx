import { Box, Typography, Divider, Button } from "@mui/material";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import colors from "../../../theme/variables";
import { isProjectNameModalOpen } from "../../../redux/boolean/booleanSlice";
import ProjectNameModal from "../../../components/Layout/components/ProjectNameModal";
import { useNavigate } from "react-router-dom";
import { activeProject } from "../../../redux/projects/projectSlice";
import { KEY_FOR_STORING_ACTIVE_PROJECT } from "../../../constant/Misc";
import { setValueToLs } from "../../../utils/localstorage";

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
        height: "100%",
      }}
    >
      <Box
        sx={{
          padding: " 0.8rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Projects
        </Typography>
        <Button
          variant="outlined"
          sx={{
            borderColor: colors.secondaryTextColor,
            color: colors.secondaryTextColor,
          }}
          onClick={handleClickOnAddProject}
        >
          Add Project
        </Button>
      </Box>
      <Divider />
      <Box
        sx={{
          padding: "0.4rem",
          height: "calc(100% - 60px)",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "4px",
            height: "5px",
          },
          "&::-webkit-scrollbar-track": {
            background: `${colors.primaryColor}`,
          },
          "&::-webkit-scrollbar-thumb": {
            background: `${colors.secondaryTextColor}`,
            borderRadius: "4px",
          },
        }}
      >
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
