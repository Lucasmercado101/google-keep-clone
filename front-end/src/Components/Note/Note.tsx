import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    maxWidth: 240,
    borderRadius: 8,
    border: `thin solid ${theme.palette.text.disabled}`,
    padding: theme.spacing(1, 2),
    minHeight: 100,
    maxHeight: 450,
    height: "100%"
  },
  title: {
    fontWeight: 500,
    marginBottom: 5
  },
  content: {}
}));
// about 50 chars max title

type props = {
  title?: string;
  content?: string;
  archived: boolean;
  pinned: boolean;
  id: number;
};

const Note: React.FC<props> = ({ id, archived, content, pinned, title }) => {
  const classes = useStyles();

  if (title) {
    // maximum 50 char title
    title = title.length > 50 ? `${title.substr(0, 47).trim()}...` : title;
  }

  if (content) {
    // maximum 235 content
    content =
      content.length > 235 ? `${content.substr(0, 232).trim()}...` : content;
  }

  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="subtitle1" component="h4">
        {title}
      </Typography>
      <Typography className={classes.content}>{content}</Typography>
    </div>
  );
};

export default Note;
