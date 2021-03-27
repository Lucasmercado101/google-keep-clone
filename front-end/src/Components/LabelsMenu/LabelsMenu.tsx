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
import { label } from "../../api";
import SearchBarHeader from "./SearchBarHeader";

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

type props = {
  selectedLabels?: number[];
  onSelectLabel: (selectedLabels: number[]) => void;
};

const LabelsMenu: React.FC<props> = ({ selectedLabels, onSelectLabel }) => {
  const classes = useStyles();
  const [newLabelName, setNewLabelName] = useState("");
  const [newlySelectedLabels, setNewlySelectedLabels] = useState(
    selectedLabels || []
  );

  const { data: labelsData = [] } = useGetLabels();

  return (
    <Paper elevation={3} className={classes.container}>
      <SearchBarHeader
        newLabelName={newLabelName}
        setNewLabelName={setNewLabelName}
      />
      <List classes={{ root: classes.listRoot }} className={classes.list}>
        {labelsData
          .filter((label: label) =>
            label.name.toLowerCase().includes(newLabelName.toLowerCase())
          )
          .map((label: label) => (
            <ListItem
              key={label.id}
              classes={{ gutters: classes.listItemContainer }}
              className={classes.listItem}
              button
              disableRipple
              disableTouchRipple
              dense
              onClick={() => {
                const newLabels =
                  newlySelectedLabels.findIndex(
                    (stateLabel) => stateLabel === label.id
                  ) === -1
                    ? [...newlySelectedLabels, label.id]
                    : newlySelectedLabels.filter(
                        (stateLabel) => stateLabel !== label.id
                      );
                setNewlySelectedLabels(newLabels);
                onSelectLabel(newLabels);
              }}
            >
              <ListItemIcon className={classes.iconContainer}>
                <Checkbox
                  className={classes.icon}
                  edge="start"
                  checked={
                    newlySelectedLabels.findIndex(
                      (stateLabel) => stateLabel === label.id
                    ) !== -1
                  }
                  tabIndex={-1}
                  style={{ pointerEvents: "none" }}
                  color="default"
                />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.listItemText }}>
                {label.name}
              </ListItemText>
            </ListItem>
          ))}
      </List>
      {!labelsData.find(
        (label: label) => label.name.toLowerCase() === newLabelName
      ) &&
        newLabelName && <NewLabelButton newLabelName={newLabelName} />}
    </Paper>
  );
};

export default LabelsMenu;
