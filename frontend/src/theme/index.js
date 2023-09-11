import { createTheme } from "@mui/material";
import colors from "src/theme/variables";

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
    fontSize: 8,
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          padding: ".5 0",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 0,
        },
      },
    },
  },
});

export default theme;
