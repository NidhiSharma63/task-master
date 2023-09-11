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
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { booleanDataInStore, isDialogBoxOpen } from "src/redux/boolean/booleanSlice";

import colors from "src/theme/variables";

const DialogComponent = ({ title, subTitle, handleSaveButtonClicked, children, value, handleChangeInput }) => {
  const dispatch = useDispatch();
  const { is_dialog_box_open } = useSelector(booleanDataInStore);
  const handleClose = () => {
    dispatch(isDialogBoxOpen(false));
  };

  return (
    <Box>
      <Dialog open={is_dialog_box_open} fullWidth onClose={handleClose}>
        <DialogTitle
          id="projectModal"
          sx={{
            color: (theme) => theme.palette.secondary.main,
          }}>
          {title}
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
            }}>
            <Typography sx={{ fontSize: "1.2rem" }}>{subTitle}</Typography>
            <TextField value={value} onChange={handleChangeInput} sx={{ width: "100%" }} />
          </Box>
          {children}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleSaveButtonClicked}
            sx={{
              borderColor: colors.secondaryTextColor,
              color: "white",
            }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DialogComponent;
