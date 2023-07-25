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
    MuiDrawer: {
      styleOverrides: {
        paper: {
          // backgroundColor: "#32a852", // Your desired background color
        },
      },
    },
  },
});

export default theme;
