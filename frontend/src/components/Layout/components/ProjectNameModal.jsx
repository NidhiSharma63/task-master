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
import DotLoader from 'react-spinners/DotLoader';
import { COLORS_FOR_PROJECTS } from 'src/constant/colors';
import useProjectNameModal from 'src/hook/project/useProjectNameModal';
import colors from 'src/theme/variables';

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
    <Box sx={{ backgroundColor: colors.offWhite }}>
      {isLoading ? (
        <Dialog>
          <DialogContent
            sx={{
              width: '30rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <DotLoader color="#571159" size={80} />
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog open={open} fullWidth onClose={handleClose}>
          <Box sx={{ backgroundColor: colors.offWhite }}>
            <DialogTitle
              id="projectModal"
              sx={{
                color: colors.textColor,
              }}
            >
              Create your project
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
                <Typography sx={{ fontSize: '1.2rem' }}>
                  Project Name
                </Typography>
                <TextField
                  value={projectName}
                  onChange={handleChangeInput}
                  sx={{ width: '100%', backgroundColor: 'white' }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  width: '100%',
                  gap: 2,
                  mt: 2,
                }}
              >
                <Typography sx={{ fontSize: '1.2rem' }}>
                  Select colors
                </Typography>
                <Box sx={{ display: 'flex', width: '100%', gap: 2 }}>
                  {COLORS_FOR_PROJECTS.map((color) => {
                    return (
                      <Box
                        key={color}
                        sx={{
                          width: '2rem',
                          height: '2rem',
                          borderRadius: '50%',
                          backgroundColor: color,
                          cursor: 'pointer',
                          border: `${
                            color === colorName ? '3px solid black' : 'none'
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
                variant="contained"
                onClick={handleSave}
                sx={{
                  color: 'white',
                  '&:hover': {
                    backgroundColor: colors.primaryColor,
                  },
                }}
              >
                Save
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      )}
    </Box>
  );
};

export default ProjectNameModal;
