import { Typography, InputBase, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(2)
  },
  searchBarWrapper: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.disabled
  },
  searchBar: {
    fontSize: "0.9rem"
  },
  searchBarIcon: {
    height: 17,
    width: 17
  }
}));

type props = {
  newLabelName: string;
  setNewLabelName: (newLabelName: string) => void;
};

const SearchBarHeader: React.FC<props> = ({
  newLabelName,
  setNewLabelName
}) => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <Typography variant="subtitle1">Label note</Typography>
      <div className={classes.searchBarWrapper}>
        <InputBase
          value={newLabelName}
          onChange={(e) => setNewLabelName(e.target.value)}
          inputProps={{ className: classes.searchBar }}
          placeholder="Enter label name"
        />
        <SearchIcon className={classes.searchBarIcon} color="inherit" />
      </div>
    </div>
  );
};

export default SearchBarHeader;
