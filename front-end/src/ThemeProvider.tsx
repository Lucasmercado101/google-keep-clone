import { useContext } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { observer } from "mobx-react-lite";
import { GlobalStateContext } from "./StateProvider";

const Theme: React.FC = observer(({ children }) => {
  const ctx = useContext(GlobalStateContext);
  const darkMode = ctx.darkMode;

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: { main: blue[300] }
    }
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
});

export default Theme;
