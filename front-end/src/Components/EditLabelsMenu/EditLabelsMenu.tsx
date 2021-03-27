import { useState } from "react";
import {
  makeStyles,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Typography,
  IconButton,
  Divider,
  Button,
  InputBase,
  Modal
} from "@material-ui/core";
import { useDeleteLabel, useGetLabels } from "../../Hooks/queries";
import {
  Label as LabelIcon,
  Delete as TrashIcon,
  Edit as EditIcon,
  Check as ConfirmIcon
} from "@material-ui/icons";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  title: { padding: theme.spacing(2, 2, 0, 2) },
  container: {
    width: "100%",
    maxWidth: 300,
    maxHeight: 500,
    height: "100%"
  },
  labelsList: { maxHeight: 420, overflowY: "auto" },
  listItem: {
    width: "100%",
    "&:hover $deleteLabel": {
      display: "block"
    },
    "&:hover $labelIcon": {
      display: "none"
    }
  },
  listItemText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "95%",
    "&:focus": {
      borderBottom: `thin solid ${theme.palette.text.secondary}`,
      marginBottom: -1
    }
  },
  listItemIcon: {
    color: theme.palette.text.secondary
  },
  deleteLabel: {
    display: "none"
  },
  labelIcon: {
    display: "initial"
  },
  doneButton: {
    color: theme.palette.text.primary,
    marginLeft: "auto"
  },
  footer: {
    minHeight: 70,
    maxHeight: 70
  },
  divider: {
    color: theme.palette.text.secondary
  },
  buttonWrapper: {
    display: "flex",
    padding: theme.spacing(2)
  },
  confirmMenuModal: {
    display: "grid",
    placeItems: "center"
  },
  confirmPaperWrapper: {
    width: 270,
    "&:hover, &:focus": {
      outline: "none"
    },
    [theme.breakpoints.up("sm")]: {
      width: 430
    }
  },
  confirmPaper: {
    padding: theme.spacing(3, 3, 2, 3)
  },
  confirmModalButton: {
    textTransform: "none",
    padding: theme.spacing(1, 3)
  },
  confirmButton: {
    color: theme.palette.secondary.main
  },
  confirmModalButtons: {
    marginTop: 15,
    display: "flex",
    gap: 15,
    justifyContent: "flex-end"
  }
}));

type props = {
  onClose: () => void;
};

const EditLabelsMenu: React.FC<props> = ({ onClose }) => {
  const classes = useStyles();
  const { data: labelsData } = useGetLabels();
  const [isEditing, setIsEditing] = useState<null | number>();
  const deleteLabel = useDeleteLabel();
  const [labelToDeleteId, setLabelToDeleteId] = useState<null | number>();
  const [isDeleteLabelModalOpen, setIsDeleteLabelModalOpen] = useState(false);

  return (
    <>
      <Paper className={classes.container}>
        <div className={classes.labelsList}>
          <Typography className={classes.title}>Edit labels</Typography>
          {labelsData && (
            <List>
              {labelsData.map((label) => (
                <ListItem className={classes.listItem}>
                  <ListItemIcon
                    onClick={() => {
                      setLabelToDeleteId(label.id);
                      setIsDeleteLabelModalOpen(true);
                    }}
                  >
                    <IconButton size="small">
                      {isEditing === label.id ? (
                        <TrashIcon className={classes.listItemIcon} />
                      ) : (
                        <>
                          <LabelIcon
                            className={clsx(
                              classes.listItemIcon,
                              classes.labelIcon
                            )}
                          />
                          <TrashIcon
                            className={clsx(
                              classes.listItemIcon,
                              classes.deleteLabel
                            )}
                          />
                        </>
                      )}
                    </IconButton>
                  </ListItemIcon>
                  <InputBase
                    onFocus={() => setIsEditing(label.id)}
                    onBlur={() => setIsEditing(null)}
                    inputProps={{ className: classes.listItemText }}
                    value={label.name}
                  />
                  <ListItemSecondaryAction>
                    <IconButton size="small" edge="end" aria-label="delete">
                      {isEditing === label.id ? (
                        <ConfirmIcon className={classes.listItemIcon} />
                      ) : (
                        <EditIcon className={classes.listItemIcon} />
                      )}
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </div>
        <div className={classes.footer}>
          <Divider className={classes.divider} />
          <div className={classes.buttonWrapper}>
            <Button onClick={onClose} className={classes.doneButton}>
              Done
            </Button>
          </div>
        </div>
      </Paper>
      <Modal
        open={isDeleteLabelModalOpen}
        onClose={() => setIsDeleteLabelModalOpen(false)}
        className={classes.confirmMenuModal}
      >
        <div className={classes.confirmPaperWrapper}>
          <Paper className={classes.confirmPaper}>
            <Typography variant="body2">
              We’ll delete this label and remove it from all of your Keep notes.
              Your notes won’t be deleted.
            </Typography>
            <div className={classes.confirmModalButtons}>
              <Button
                className={classes.confirmModalButton}
                onClick={() => setIsDeleteLabelModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className={clsx(
                  classes.confirmModalButton,
                  classes.confirmButton
                )}
                onClick={() => {
                  setIsDeleteLabelModalOpen(false);
                  deleteLabel(labelToDeleteId!);
                  setLabelToDeleteId(null);
                }}
              >
                Delete
              </Button>
            </div>
          </Paper>
        </div>
      </Modal>
    </>
  );
};

export default EditLabelsMenu;
