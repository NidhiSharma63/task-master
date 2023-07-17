import { createTheme } from "@mui/material";
import colors from "./variables";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.primaryColor,
    },
  },
});

export default theme;
