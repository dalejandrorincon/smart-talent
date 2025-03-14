import React from "react";
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { AppRouter } from "@router";

const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    h1: { fontFamily: "Poppins, sans-serif" },
    h2: { fontFamily: "Poppins, sans-serif" },
    h3: { fontFamily: "Poppins, sans-serif" },
    h4: { fontFamily: "Poppins, sans-serif" },
    h5: { fontFamily: "Poppins, sans-serif" },
    h6: { fontFamily: "Poppins, sans-serif" },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "#e9f0f3" } }} />
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
