import { useState, useEffect, useRef } from "react";
import {
  makeStyles,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Typography,
  IconButton,
  Button,
  InputBase,
  Modal
} from "@material-ui/core";
import {
  useDeleteLabel,
  useGetLabels,
  usePostNewLabel,
  usePutLabel
} from "../../Hooks/queries";
import {
  Label as LabelIcon,
  Delete as TrashIcon,
  Edit as EditIcon,
  Check as ConfirmIcon,
  Add as AddIcon,
  Close as CancelIcon
} from "@material-ui/icons";
import clsx from "clsx";
import Footer from "./Footer";
import ConfirmDeletionModal from "./ConfirmDeletionModal";

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
  addNewLabelContainer: {
    listStyleType: "none"
  },
  textInputFocused: {
    borderBottom: `thin solid ${theme.palette.text.secondary}`,
    marginBottom: -1
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
  const putLabel = usePutLabel();
  const postNewLabel = usePostNewLabel();
  const [labelToDeleteId, setLabelToDeleteId] = useState<null | number>();
  const [
    isDeleteConfirmationModalOpen,
    setIsDeleteConfirmationModalOpen
  ] = useState(false);
  const [newLabelsData, setNewLabelsData] = useState<{} | any>({});
  const [newLabelName, setNewLabelName] = useState("");
  const [isWritingNewName, setIsWritingNewName] = useState(false);
  const newLabelInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let newLabels: any = {};
    labelsData?.forEach((label) => (newLabels[label.id] = label.name));
    setNewLabelsData(newLabels || {});
  }, [labelsData]);

  return (
    <>
      <Paper className={classes.container}>
        <div className={classes.labelsList}>
          <Typography className={classes.title}>Edit labels</Typography>

          <ListItem classes={{ container: classes.addNewLabelContainer }}>
            <ListItemIcon className={classes.listItemIcon}>
              <IconButton color="inherit" size="small">
                {isWritingNewName ? (
                  <CancelIcon />
                ) : (
                  <AddIcon
                    onClick={() => {
                      setNewLabelName("");
                      newLabelInputRef?.current?.focus();
                    }}
                  />
                )}
              </IconButton>
            </ListItemIcon>

            <InputBase
              placeholder="Create new label"
              inputProps={{
                className: classes.listItemText,
                onFocus: () => setIsWritingNewName(true),
                ref: newLabelInputRef
              }}
              value={newLabelName}
              onChange={(e) => setNewLabelName(e.target.value)}
            />
            <ListItemSecondaryAction>
              {isWritingNewName && (
                <IconButton
                  onClick={() => {
                    if (newLabelName) {
                      postNewLabel(newLabelName);
                      setNewLabelName("");
                      setIsWritingNewName(false);
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

          {labelsData && (
            <List>
              {labelsData.map((label) => (
                <ListItem className={classes.listItem}>
                  <ListItemIcon
                    onClick={() => {
                      setLabelToDeleteId(label.id);
                      setIsDeleteConfirmationModalOpen(true);
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
                    onFocus={() => {
                      setIsEditing(label.id);
                      setIsWritingNewName(false);
                    }}
                    inputProps={{ className: classes.listItemText }}
                    value={newLabelsData[label.id]}
                    onChange={(e) =>
                      setNewLabelsData({
                        ...newLabelsData,
                        [label.id]: e.target.value
                      })
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton size="small" edge="end" aria-label="delete">
                      {isEditing === label.id ? (
                        <ConfirmIcon
                          onClick={() =>
                            putLabel(label.id, newLabelsData[label.id])
                          }
                          className={classes.listItemIcon}
                        />
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
        <Footer onClickDone={onClose} />
      </Paper>
      <ConfirmDeletionModal
        isOpen={isDeleteConfirmationModalOpen}
        setIsOpen={setIsDeleteConfirmationModalOpen}
        onConfirm={() => {
          setIsDeleteConfirmationModalOpen(false);
          deleteLabel(labelToDeleteId!);
          setLabelToDeleteId(null);
        }}
      />
    </>
  );
};

export default EditLabelsMenu;
