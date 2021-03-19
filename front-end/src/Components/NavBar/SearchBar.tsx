import { InputBase, makeStyles, Paper, IconButton } from "@material-ui/core";
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
    marginRight: theme.spacing(1)
  }
}));

function SearchBar() {
  const classes = useStyles();
  return (
    <Paper elevation={0} className={classes.container}>
      <IconButton color="inherit" className={classes.searchIcon}>
        <SearchIcon />
      </IconButton>
      <InputBase placeholder="Search" />
    </Paper>
  );
}

export default SearchBar;
