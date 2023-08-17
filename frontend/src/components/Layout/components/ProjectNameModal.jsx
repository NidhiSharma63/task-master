import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Divider,
  TextField,
} from "@mui/material";
import colors from "../../../theme/variables";
import DotLoader from "react-spinners/DotLoader";
import useProject from "../../../hook/project/useProject";

const ProjectNameModal = () => {
  const {
    handleChangeInput,
    handleSave,
    handleClose,
    isLoading,
    projectName,
    open,
  } = useProject();
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
            Project name
          </DialogTitle>
          <Divider />
          <DialogContent>
            <TextField
              value={projectName}
              onChange={handleChangeInput}
              sx={{ width: "100%" }}
            />
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
