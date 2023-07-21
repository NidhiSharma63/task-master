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
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { booleanDataInStore } from "src/redux/boolean/booleanSlice";
import { isProjectNameModalOpen } from "src/redux/boolean/booleanSlice";

const ProjectNameModal = () => {
  const { is_project_name_modal_open } = useSelector(booleanDataInStore);
  const [open, setOpen] = useState(is_project_name_modal_open);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(is_project_name_modal_open);
  }, [is_project_name_modal_open]);

  const handleClose = () => {
    dispatch(isProjectNameModalOpen(false));
    setOpen(false);
  };

  return (
    <Box>
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
          <TextField sx={{ width: "100%" }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              color: "white",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectNameModal;
