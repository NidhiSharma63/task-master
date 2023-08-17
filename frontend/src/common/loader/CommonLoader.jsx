import { Box, Typography } from "@mui/material";
import { ClipLoader } from "react-spinners";

const CommonLoader = ({ value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h5"
        sx={{ color: (theme) => theme.palette.primary.main }}
      >
        {value}
      </Typography>
      <ClipLoader />
    </Box>
  );
};

export default CommonLoader;
