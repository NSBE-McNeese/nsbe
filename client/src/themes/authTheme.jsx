import { createTheme } from "@mui/material";

const authTheme = createTheme({
  typography: {
    button: {
      textTransform: "none",
      fontSize: "2em",
    },
    fontWeight: 400,
    fontFamily: "inherit",
    color: "black",
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: "800",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: 1800,
          fontSize: "1.1em",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        required: true,
        fullWidth: true,
      },
    },
    MuiAutoComplete: {
      defaultProps: {
        required: true,
        autocomplete: true,
      },
    },
    MuiBox: {
      styleOverrides: {
        marginBottom: "2",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "13px",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "black",
          fontSize: "1.2em",
        },
        asterisk: {
          color: "red",
        },
      },
    },
  },
});

export default authTheme;
