import {
  InputBase,
  makeStyles,
  Paper,
  IconButton,
  Hidden
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    color: theme.palette.text.secondary,
    flexGrow: 1,
    maxWidth: 700
  },
  searchIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.primary
  }
}));

function SearchBar() {
  const classes = useStyles();
  return (
    <>
      <Hidden smDown>
        <Paper elevation={0} className={classes.container}>
          <IconButton className={classes.searchIcon}>
            <SearchIcon />
          </IconButton>
          <InputBase placeholder="Search" />
        </Paper>
      </Hidden>
      <Hidden mdUp>
        <IconButton
          style={{ marginLeft: "auto", marginRight: 0 }}
          color="inherit"
          className={classes.searchIcon}
        >
          <SearchIcon />
        </IconButton>
      </Hidden>
    </>
  );
}

export default SearchBar;
