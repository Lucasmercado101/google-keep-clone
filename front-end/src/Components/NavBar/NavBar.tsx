import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  CircularProgress
} from "@material-ui/core";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import {
  Menu as HamburgerIcon,
  Brightness7 as SunIcon,
  Brightness4 as MoonIcon,
  ViewAgendaOutlined as ListIcon,
  RefreshOutlined as RefreshIcon,
  Dashboard as GridIcon
} from "@material-ui/icons";
import { observer } from "mobx-react-lite";
import { GlobalStateContext } from "../../StateProvider";
import { useIsFetching, useQueryClient } from "react-query";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import UserMenu from "./UserMenu";

const useStyles = makeStyles((theme) => ({
  root: (isScrolledDown) => ({
    zIndex: 3,
    background: theme.palette.background.default,
    borderBottom: `thin solid ${
      isScrolledDown ? "transparent" : theme.palette.text.disabled
    }`
  }),
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  },
  iconButtons: {
    margin: "0 15px 0 0",
    [theme.breakpoints.up("md")]: {
      margin: "0 30px"
    }
  },
  right: {
    display: "flex",
    marginLeft: 0,
    [theme.breakpoints.up("md")]: {
      marginLeft: "auto"
    }
  },
  toolbar: {
    color: theme.palette.text.secondary
  }
}));

const NavBar: React.FC = observer(() => {
  const queryClient = useQueryClient();
  const isFetchingNotes = useIsFetching("notes");
  const ctx = useContext(GlobalStateContext);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });
  const classes = useStyles(!!trigger);

  return (
    <AppBar
      elevation={trigger ? 3 : 0}
      position="fixed"
      className={classes.root}
      color="transparent"
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          onClick={() => (ctx.isMenuExpanded = !ctx.isMenuExpanded)}
        >
          <HamburgerIcon />
        </IconButton>
        <Logo />
        <SearchBar />
        <div className={classes.right}>
          <IconButton
            onClick={() => queryClient.invalidateQueries("notes")}
            color="inherit"
          >
            {isFetchingNotes ? (
              <CircularProgress size={19} color="inherit" />
            ) : (
              <RefreshIcon />
            )}
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => (ctx.listView = !ctx.listView)}
          >
            {ctx.listView ? <GridIcon /> : <ListIcon />}
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => (ctx.darkMode = !ctx.darkMode)}
          >
            {ctx.darkMode ? <SunIcon /> : <MoonIcon />}
          </IconButton>
          <UserMenu />
        </div>
      </Toolbar>
    </AppBar>
  );
});

export default NavBar;
