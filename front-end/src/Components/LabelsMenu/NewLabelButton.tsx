import React from "react";
import { makeStyles, ButtonBase, Divider } from "@material-ui/core";
import { usePostNewLabel } from "../../Hooks/queries";
import AddIcon from "@material-ui/icons/Add";

type props = {
  newLabelName: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    justifyContent: "flex-start"
  },
  divider: {
    background: theme.palette.text.disabled
  },
  createNewTagWrapper: {
    alignItems: "flex-start",
    gap: 10,
    display: "flex",
    padding: "0 1rem",
    paddingTop: 8,
    fontSize: "0.8rem",
    paddingBottom: 3,
    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
    }
  },
  addIcon: {
    height: 20,
    width: 20
  },
  toCreateText: {
    fontWeight: 600,
    wordBreak: "break-all"
  },
  newTagContent: {
    margin: 0,
    textAlign: "left"
  }
}));

const NewLabelButton: React.FC<props> = ({ newLabelName }) => {
  const postNewLabel = usePostNewLabel();
  const classes = useStyles();
  return (
    <>
      <Divider className={classes.divider} />
      <ButtonBase
        classes={{ root: classes.root }}
        onClick={() => postNewLabel(newLabelName)}
        disableTouchRipple
        focusRipple
        className={classes.createNewTagWrapper}
      >
        <AddIcon className={classes.addIcon} />
        <p className={classes.newTagContent}>
          Create <q className={classes.toCreateText}>{newLabelName}</q>
        </p>
      </ButtonBase>
    </>
  );
};

export default NewLabelButton;
