import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    maxWidth: 240,
    border: `thin solid ${theme.palette.text.disabled}`,
    borderRadius: 8,
    padding: theme.spacing(1, 2),
    minHeight: 100,
    maxHeight: 440,
    height: "100%"
  }
}));

type props = {
  title: string;
  content: string;
  archived: boolean;
  pinned: boolean;
  id: number;
};

const Note: React.FC<props> = ({ id, archived, content, pinned, title }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant="subtitle1" component="h4">
        {title}
      </Typography>
      <Typography>{content}</Typography>
    </div>
  );
};

export default Note;
