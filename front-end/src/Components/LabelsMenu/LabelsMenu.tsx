import { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Paper,
  InputBase,
  Checkbox
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useGetLabels } from "../../Hooks/queries";
import NewLabelButton from "./NewLabelButton";

const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: 225,
    maxWidth: 225
  },
  header: {
    padding: theme.spacing(2)
  },
  listRoot: { padding: 0 },
  list: {
    maxHeight: 260,
    overflow: "auto"
  },
  listItem: {
    display: "flex"
  },
  listItemContainer: {
    paddingLeft: theme.spacing(1)
  },
  iconContainer: {
    height: 29,
    alignSelf: "flex-start",
    maxWidth: 25,
    minWidth: 0
  },
  icon: {
    transform: "scale(0.8)"
  },
  listItemText: {
    lineHeight: 1
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

function LabelsMenu() {
  const classes = useStyles();
  const [newLabelName, setNewLabelName] = useState("");

  const { data: labelsData } = useGetLabels();

  return (
    <Paper elevation={3} className={classes.container}>
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
      <List classes={{ root: classes.listRoot }} className={classes.list}>
        {labelsData &&
          labelsData.map((label) => (
            <ListItem
              classes={{ gutters: classes.listItemContainer }}
              className={classes.listItem}
              button
              disableRipple
              disableTouchRipple
              dense
            >
              <ListItemIcon className={classes.iconContainer}>
                <Checkbox
                  className={classes.icon}
                  edge="start"
                  tabIndex={-1}
                  style={{ pointerEvents: "none" }}
                />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.listItemText }}>
                {label.name}
              </ListItemText>
            </ListItem>
          ))}
      </List>
      {newLabelName && <NewLabelButton newLabelName={newLabelName} />}
    </Paper>
  );
}

export default LabelsMenu;
