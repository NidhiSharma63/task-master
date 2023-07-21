import { createTheme } from "@mui/material";
import colors from "./variables";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.primaryColor,
    },
    secondary: {
      main: colors.secondaryColor,
    },
    grey: {
      50: colors.lightGrey,
    },
    text: {
      primary: colors.primaryTextColor,
      secondary: colors.secondaryTextColor,
    },
    divider: colors.lightGrey,
  },
  typography: {
    fontFamily: " 'Quicksand', sans-serif",
  },
  components: {
    MuiModal: {
      styleOverrides: {
        root: {
          position: "relative",
          // top: "50%",
          // left: "50%",
          // transform: "translate(-50%, -50%)",
          // width: 400,
          // bgcolor: "white",
          // border: "2px solid #000",
          // boxShadow: 24,
          // p: 4,
        },
      },
    },
  },
});

export default theme;
