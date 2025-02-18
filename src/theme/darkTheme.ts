import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1E1E1E",
      paper: "#2A2A2A",
    },
    primary: {
      main: "#0C53B7",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#A0A0A0",
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

export default darkTheme;
