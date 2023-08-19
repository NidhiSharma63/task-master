import { createTheme } from "@mui/material";
import colors from "./variables";

const theme = createTheme({
  palette: {
    mode: "dark",
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
      primary: colors.secondaryColor,
      secondary: colors.secondaryTextColor,
    },

    divider: colors.lightGrey,
  },
  typography: {
    fontFamily: " 'Quicksand', sans-serif",
  },
  // components: {
  //   MuiTextField: {
  //     styleOverrides: {
  //       root: {
  //         border: "1px solid green",
  //         outline: "none",
  //       },
  //     },
  //   },
  // },
});

export default theme;
