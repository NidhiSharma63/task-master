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
      primary: colors.primaryTextColor,
      secondary: colors.secondaryTextColor,
    },
  },
});

export default theme;
