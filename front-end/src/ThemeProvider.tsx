import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

const Theme: React.FC = ({ children }) => {
  const darkMode = true;

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: { main: darkMode ? blue[300] : "#3f51b5" }
    }
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
