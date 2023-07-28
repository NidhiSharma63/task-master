import { Box, Typography, Divider, Button } from "@mui/material";
import { ClipLoader } from "react-spinners";
import colors from "src/theme/variables";

const ProjectComponent = ({ backgroundColors, projectData, isLoading }) => {
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
    </Box>
  );
};

export default ProjectComponent;
