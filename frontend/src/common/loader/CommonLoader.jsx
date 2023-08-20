import { Box, Typography } from "@mui/material";
import { ClipLoader } from "react-spinners";
import Backdrop from "@mui/material/Backdrop";
import { useSelector } from "react-redux";
import { booleanDataInStore } from "../../redux/boolean/booleanSlice";
import { useBackDropLoaderContext } from "../../context/BackDropLoaderContext";

const CommonLoader = ({ value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        gap: 1,
        color: "white",
      }}
    >
      <Typography
        variant="h5"
        // sx={{ color: (theme) => theme.palette.primary.main }}
      >
        {value}
      </Typography>
      <ClipLoader color="white" />
    </Box>
  );
};

export default CommonLoader;

export const CommonLoaderWithBackDrop = () => {
  const { is_back_Drop_loader_displayed } = useSelector(booleanDataInStore);
  const { value } = useBackDropLoaderContext();

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={is_back_Drop_loader_displayed}
    >
      <CommonLoader value={value} />
    </Backdrop>
  );
};
