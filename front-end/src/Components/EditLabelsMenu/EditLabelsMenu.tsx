import { useState, useEffect } from "react";
import {
  makeStyles,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Typography,
  IconButton,
  InputBase
} from "@material-ui/core";
import { useDeleteLabel, useGetLabels, usePutLabel } from "../../Hooks/queries";
import {
  Label as LabelIcon,
  Delete as TrashIcon,
  Edit as EditIcon,
  Check as ConfirmIcon
} from "@material-ui/icons";
import clsx from "clsx";
import Footer from "./Footer";
import ConfirmDeletionModal from "./ConfirmDeletionModal";
import NewLabelInput from "./NewLabelInput";

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
  input: {
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
  const [labelToDeleteId, setLabelToDeleteId] = useState<null | number>();
  const [
    isDeleteConfirmationModalOpen,
    setIsDeleteConfirmationModalOpen
  ] = useState(false);
  const [newLabelsData, setNewLabelsData] = useState<{} | any>({});

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
          <NewLabelInput />

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
                    }}
                    inputProps={{ className: classes.input }}
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
