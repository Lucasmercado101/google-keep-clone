import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  container: () => ({
    borderRadius: 8,
    border: "thin solid transparent",
    padding: theme.spacing(1, 2),
    minHeight: 180,
    maxHeight: 650,
    maxWidth: 600,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    background: theme.palette.background.default,
    zIndex: 1
  }),
  coloredNote: ({ color }: { color?: string }) => ({
    position: "relative",
    "&::after": {
      zIndex: -1,
      content: "''",
      position: "absolute",
      height: "100%",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: "100%",
      filter: "saturate(350%) opacity(0.25)",
      backgroundImage: color && `linear-gradient(${color}, ${color})`
    }
  })
}));

const EditNote: React.FC<any> = ({
  id,
  archived,
  content,
  pinned,
  title,
  color = "red",
  labels
}) => {
  const classes = useStyles({ color });
  return (
    <div className={clsx(classes.container, color && classes.coloredNote)}>
      {JSON.stringify(color)}
    </div>
  );
};

export default EditNote;
