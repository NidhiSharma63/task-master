import { createTheme } from '@mui/material';
import colors from 'src/theme/variables';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.offWhite,
    },
    secondary: {
      main: colors.offWhite,
    },
    // grey: {
    //   50: colors.lightGrey,
    // },
    text: {
      primary: colors.textColor,
      // secondary: colors.secondaryTextColor,
    },

    divider: colors.lineColor,
  },
  typography: {
    fontFamily: " 'Quicksand', sans-serif",
    fontSize: 12,
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: 'green',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          padding: '.5 0',
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
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#756EC6',
          color: 'white',
        },
      },
    },
  },
});

export default theme;
