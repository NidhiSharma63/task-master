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
import {
  booleanDataInStore,
  isProjectNameModalOpen,
} from "../../../redux/boolean/booleanSlice";

import colors from "../../../theme/variables";
import {
  usePostProjectQuery,
  useUpdateProjectQuery,
} from "../../../hook/useProjectQuery";
import DotLoader from "react-spinners/DotLoader";
import { projectDataInStore } from "../../../redux/projects/projectSlice";
import { projectRename } from "../../../redux/projects/projectSlice";

const ProjectNameModal = () => {
  const { is_project_name_modal_open } = useSelector(booleanDataInStore);
  const { project_rename } = useSelector(projectDataInStore);
  const [open, setOpen] = useState(is_project_name_modal_open);
  const [projectName, setProjectName] = useState("");
  const dispatch = useDispatch();
  const { mutate, isLoading } = usePostProjectQuery();
  const { mutate: updateProject } = useUpdateProjectQuery();

  useEffect(() => {
    setOpen(is_project_name_modal_open);
  }, [is_project_name_modal_open]);

  const handleClose = () => {
    dispatch(isProjectNameModalOpen(false));
    setOpen(false);
  };

  useEffect(() => {
    if (isLoading === false) {
      handleClose();
    }
  }, [isLoading]);

  useEffect(() => {
    if (project_rename) {
      setProjectName(project_rename.projectName);
    }
  }, [project_rename]);

  const handleSave = () => {
    if (projectName.trim()) {
      if (project_rename.projectId) {
        updateProject({
          name: projectName.trim(),
          _id: project_rename.projectId,
          previousName: project_rename.projectName,
        });
        setProjectName("");
        dispatch(projectRename({}));
      } else {
        mutate({ name: projectName.trim() });
        setProjectName("");
      }
    }
  };

  const handleChangeInput = (event) => {
    setProjectName(event.target.value);
  };

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
