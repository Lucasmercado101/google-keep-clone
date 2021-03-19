import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {
  ViewAgendaOutlined as ListIcon,
  SettingsOutlined as SettingsIcon,
  RefreshOutlined as RefreshIcon,
  AccountCircle as UserIcon,
  Note as NoteIcon
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  iconButtons: {
    marginRight: 15
  },
  right: {
    marginLeft: "auto",
    display: "flex"
  },
  logo: {
    display: "flex",
    alignItems: "center"
  },
  logoIcon: {
    transform: "rotate(-90deg)",
    marginRight: theme.spacing(1)
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="transparent">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.logo}>
            <NoteIcon
              fontSize="large"
              className={classes.logoIcon}
              color="inherit"
            />
            <Typography component="span" variant="h5">
              Meep
            </Typography>
          </div>
          <div className={classes.right}>
            <div className={classes.iconButtons}>
              <IconButton color="inherit">
                <RefreshIcon />
              </IconButton>
              <IconButton color="inherit">
                <ListIcon />
              </IconButton>
              <IconButton color="inherit">
                <SettingsIcon />
              </IconButton>
            </div>
            <IconButton color="inherit">
              <UserIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
