import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F5F7FA",
      paper: "#FFFFFF",
    },
    primary: {
      main: "#0C53B7",
    },
    text: {
      primary: "#333333",
      secondary: "#6B7280",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h5: {
      fontWeight: 600,
    },
    body1: {
      fontSize: 14,
    },
  },
  
});

export default lightTheme;
