import { useState, useRef } from "react";
import {
  ListItem,
  ListItemIcon,
  IconButton,
  InputBase,
  ListItemSecondaryAction,
  makeStyles,
  ClickAwayListener
} from "@material-ui/core";

import {
  Add as AddIcon,
  Close as CancelIcon,
  Check as ConfirmIcon
} from "@material-ui/icons";

import { usePostNewLabel } from "../../Hooks/queries";

const useStyles = makeStyles((theme) => ({
  container: {
    listStyleType: "none"
  },
  listItemIcon: {
    color: theme.palette.text.secondary
  },
  input: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "95%",
    "&:focus": {
      borderBottom: `thin solid ${theme.palette.text.secondary}`,
      marginBottom: -1
    }
  }
}));

const NewLabelInput: React.FC = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [newLabelName, setNewLabelName] = useState("");
  const postNewLabel = usePostNewLabel();
  const inputRef = useRef<HTMLInputElement>(null);

  const classes = useStyles();
  return (
    <ClickAwayListener onClickAway={() => setIsWriting(false)}>
      <ListItem classes={{ container: classes.container }}>
        <ListItemIcon className={classes.listItemIcon}>
          <IconButton color="inherit" size="small">
            {isWriting ? (
              <CancelIcon onClick={() => setIsWriting(false)} />
            ) : (
              <AddIcon
                onClick={() => {
                  setNewLabelName("");
                  inputRef?.current?.focus();
                }}
              />
            )}
          </IconButton>
        </ListItemIcon>

        <InputBase
          placeholder="Create new label"
          inputProps={{
            className: classes.input,
            onFocus: () => setIsWriting(true),
            ref: inputRef
          }}
          value={newLabelName}
          onChange={(e) => setNewLabelName(e.target.value)}
        />
        <ListItemSecondaryAction>
          {isWriting && (
            <IconButton
              onClick={() => {
                if (newLabelName) {
                  postNewLabel(newLabelName);
                  setNewLabelName("");
                  setIsWriting(false);
                }
              }}
              className={classes.listItemIcon}
              size="small"
            >
              <ConfirmIcon />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </ListItem>
    </ClickAwayListener>
  );
};

export default NewLabelInput;
