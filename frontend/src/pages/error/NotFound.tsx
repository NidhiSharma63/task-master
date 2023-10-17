import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box>
      <Typography>
        This page does not exist <Link to="/"> go there</Link>
      </Typography>
    </Box>
  );
};

export default NotFound;
