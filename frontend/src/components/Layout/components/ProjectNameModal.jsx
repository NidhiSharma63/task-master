import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import colors from "../../../theme/variables";
import DotLoader from "react-spinners/DotLoader";
import useProjectNameModal from "../../../hook/project/useProjectNameModal";
import { COLORS_FOR_PROJECTS } from "../../../constant/colors";

const ProjectNameModal = () => {
  const {
    handleChangeInput,
    handleSave,
    handleClose,
    isLoading,
    projectName,
    open,
    setColorName,
    colorName,
  } = useProjectNameModal();

  return (
    <Box>
      {isLoading ? (
        <Dialog>
          <DialogContent
            sx={{
              width: "30rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DotLoader color="#571159" size={80} />
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog open={open} fullWidth onClose={handleClose}>
          <DialogTitle
            id="projectModal"
            sx={{
              color: (theme) => theme.palette.primary.main,
            }}
          >
            Create your project
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              <Typography sx={{ fontSize: "1.2rem" }}>Project Name</Typography>
              <TextField
                value={projectName}
                onChange={handleChangeInput}
                sx={{ width: "100%" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
                gap: 2,
                mt: 2,
              }}
            >
              <Typography sx={{ fontSize: "1.2rem" }}>Select colors</Typography>
              <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
                {COLORS_FOR_PROJECTS.map((color) => {
                  return (
                    <Box
                      key={color}
                      sx={{
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "50%",
                        backgroundColor: color,
                        cursor: "pointer",
                        border: `${
                          color === colorName ? "3px solid black" : "none"
                        }`,
                      }}
                      onClick={() => {
                        setColorName(color);
                      }}
                    ></Box>
                  );
                })}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleSave}
              sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
                color: "white",
                "&:hover": {
                  backgroundColor: colors.primaryHoverColor,
                },
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ProjectNameModal;
