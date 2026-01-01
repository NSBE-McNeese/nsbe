import { createTheme } from "@mui/material/styles";

// McNeese State University Colors
const mcneeseBlue = "#005090";
const mcneeseGold = "#FFC72C";

const theme = createTheme({
  palette: {
    primary: {
      main: mcneeseBlue,
    },
    secondary: {
      main: mcneeseGold,
      contrastText: "#000",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#202124",
      secondary: "#5f6368",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: { fontWeight: 400, color: mcneeseBlue },
    h4: { fontWeight: 500, color: "#202124" },
    h5: { fontWeight: 500 },
    button: { fontWeight: 500, textTransform: "none", fontSize: "1rem" },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "none",
          border: "1px solid #dadce0",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "none",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: "none",
          padding: "10px 24px",
          "&:hover": {
            boxShadow: "0 1px 2px rgba(60,64,67,0.3)",
          },
        },
        containedPrimary: {
          backgroundColor: mcneeseBlue,
          "&:hover": {
            backgroundColor: "#003c6c",
          },
        },
      },
    },
  },
});

export default theme;
