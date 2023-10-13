import { Box, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { useSelector } from 'react-redux';
import { FadeLoader } from 'react-spinners';
import { booleanDataInStore } from 'src/redux/boolean/booleanSlice';

const CommonLoader = ({ value }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        gap: 1,
        color: 'white',
      }}
    >
      <Typography
        variant="h5"
        // sx={{ color: (theme) => theme.palette.primary.main }}
      >
        {value}
      </Typography>
      <FadeLoader color="#3E3A3A" />
    </Box>
  );
};

export default CommonLoader;

export const CommonLoaderWithBackDrop = () => {
  const { is_back_Drop_loader_displayed } = useSelector(booleanDataInStore);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={is_back_Drop_loader_displayed}
    >
      <CommonLoader value={'wait for a moment...'} />
    </Backdrop>
  );
};
