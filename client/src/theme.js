import { createTheme } from "@mui/material/styles";

// McNeese State University Identity
const mcneeseBlue = "#005090";
const mcneeseGold = "#FFC72C";

const theme = createTheme({
  palette: {
    primary: {
      main: mcneeseBlue,
    },
    secondary: {
      main: mcneeseGold,
      contrastText: "#000", // Black text on gold background for readability
    },
    background: {
      default: "#f4f6f8", // Light grey dashboard background
      paper: "#ffffff",
    },
    text: {
      primary: "#2b2b2b",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: '"Josefin Sans", sans-serif',
    h1: { fontWeight: 700, color: mcneeseBlue },
    h2: { fontWeight: 700, color: mcneeseBlue },
    h3: { fontWeight: 700, color: mcneeseBlue },
    h4: { fontWeight: 600, color: mcneeseBlue },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: "bold",
        },
      },
    },
  },
});

export default theme;
