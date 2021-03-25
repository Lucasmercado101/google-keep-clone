import { Chip, makeStyles } from "@material-ui/core";
import { label } from "../../api";
import CloseIcon from "@material-ui/icons/Close";
import { useRemoveLabelFromNote } from "../../Hooks/queries";

const useStyles = makeStyles((theme) => ({
  tagContainer: {
    padding: theme.spacing(0, 2),
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1)
  },
  tag: {
    border: `thin solid ${theme.palette.text.disabled}`,
    padding: 0,
    margin: 0,
    maxHeight: 25,
    minHeight: 25,
    minWidth: 45,
    background: "transparent",
    "&:hover, &:focus": {
      background: "transparent"
    },
    "&:hover $removeLabelButton": {
      display: "inline-block"
    }
  },
  removeLabelButton: {
    height: "70%",
    display: "none"
  },
  moreTag: {
    display: "grid",
    placeItems: "center",
    border: `thin solid ${theme.palette.text.disabled}`,
    maxHeight: 25,
    minHeight: 25,
    padding: "0 8px",
    pointerEvents: "none"
  }
}));

type props = {
  labels: label[];
  noteId: number;
};

const Tags: React.FC<props> = ({ labels, noteId }) => {
  const classes = useStyles();
  const removeLabelFromNote = useRemoveLabelFromNote();

  let labelsToShow: label[] = [];

  if (labels.length <= 3) labelsToShow = [...labels].splice(0, 3);
  else labelsToShow = [...labels].splice(0, 2);

  return (
    <div className={classes.tagContainer}>
      {labelsToShow.map((label) => (
        <Chip
          classes={{ root: classes.tag }}
          label={label.name}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onDelete={() => {
            removeLabelFromNote(noteId, label.id);
          }}
          deleteIcon={<CloseIcon className={classes.removeLabelButton} />}
        />
      ))}
      {labels.length > 3 && (
        <div className={classes.moreTag}> +{labels.length - 3} </div>
      )}
    </div>
  );
};

export default Tags;
