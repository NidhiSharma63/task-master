import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEventHandler, ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hook/redux/hooks';
import {
  booleanDataInStore,
  isDialogBoxOpen,
} from 'src/redux/boolean/booleanSlice';
import colors from 'src/theme/variables';

/**
 * interface
 */

interface IDialogComponent {
  title: string;
  subTitle: string;
  handleSaveButtonClicked: () => void;
  children?: ReactElement;
  value: string;
  handleChangeInput: ChangeEventHandler<HTMLInputElement>;
}

const DialogComponent = ({
  title,
  subTitle,
  handleSaveButtonClicked,
  children,
  value,
  handleChangeInput,
}: IDialogComponent) => {
  const dispatch = useAppDispatch();
  const { is_dialog_box_open } = useAppSelector(booleanDataInStore);

  const handleClose = () => {
    dispatch(isDialogBoxOpen(false));
  };

  return (
    <Box>
      <Dialog open={is_dialog_box_open} fullWidth onClose={handleClose}>
        <DialogTitle
          id="projectModal"
          sx={{
            color: colors.textColor,
          }}
        >
          {title}
        </DialogTitle>
        <Divider sx={{ borderColor: colors.lineColor }} />
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <Typography sx={{ fontSize: '1.2rem' }}>{subTitle}</Typography>
            <TextField
              value={value}
              onChange={handleChangeInput}
              sx={{ width: '100%' }}
            />
          </Box>
          {children}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleSaveButtonClicked}
            sx={{
              '&:hover': {
                backgroundColor: colors.primaryColor,
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

export default DialogComponent;
