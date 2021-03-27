import { Chip, makeStyles } from "@material-ui/core";
import { label } from "../../api";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
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
  onDelete: (labelId: number) => void;
  maxShown?: number;
} & React.HTMLProps<HTMLDivElement>;

const Tags: React.FC<props> = ({
  labels,
  onDelete,
  maxShown,
  ...otherProps
}) => {
  const classes = useStyles();

  let labelsToShow: label[] = [...labels];

  if (maxShown && maxShown > 1) {
    if (labels.length <= maxShown)
      labelsToShow = [...labels].splice(0, maxShown);
    else labelsToShow = [...labels].splice(0, maxShown - 1);
  } else if (maxShown && maxShown === 1) {
    labelsToShow = [...labels].splice(0, 1);
  }

  return (
    <div {...otherProps}>
      {labelsToShow.map((label) => (
        //TODO: make it so chip doesn't expand when hovered on
        <Chip
          classes={{ root: classes.tag }}
          label={label.name}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onDelete={() => onDelete(label.id)}
          deleteIcon={<CloseIcon className={classes.removeLabelButton} />}
        />
      ))}
      {!!maxShown && labels.length > maxShown && (
        <div className={classes.moreTag}> +{labels.length - maxShown} </div>
      )}
    </div>
  );
};

export default Tags;
