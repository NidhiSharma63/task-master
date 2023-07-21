import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

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
