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
import colors from "src/theme/variables";
import useProjectQuery from "src/hook/useProjectQuery";

const ProjectNameModal = () => {
  const { is_project_name_modal_open } = useSelector(booleanDataInStore);
  const [open, setOpen] = useState(is_project_name_modal_open);
  const [projectName, setProjectName] = useState("");
  const dispatch = useDispatch();
  const { mutate } = useProjectQuery();

  useEffect(() => {
    setOpen(is_project_name_modal_open);
  }, [is_project_name_modal_open]);

  const handleClose = () => {
    dispatch(isProjectNameModalOpen(false));
    setOpen(false);
  };

  const handleSave = () => {
    if (projectName.trim()) {
      mutate(projectName.trim());
    }
  };

  const handleChangeInput = (event) => {
    setProjectName(event.target.value);
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
          <TextField
            value={projectName}
            onChange={handleChangeInput}
            sx={{ width: "100%" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
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
    </Box>
  );
};

export default ProjectNameModal;
