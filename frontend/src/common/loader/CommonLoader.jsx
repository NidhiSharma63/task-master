import { Box, Typography } from "@mui/material";
import { ClipLoader } from "react-spinners";
import Backdrop from "@mui/material/Backdrop";
import { useSelector } from "react-redux";
import { booleanDataInStore } from "../../redux/boolean/booleanSlice";

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

export const CommonLoaderWithBackDrop = ({ value, open }) => {
  const { is_back_Drop_loader_displayed } = useSelector(booleanDataInStore);
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={is_back_Drop_loader_displayed}
    >
      <CommonLoader value={value} />
    </Backdrop>
  );
};
