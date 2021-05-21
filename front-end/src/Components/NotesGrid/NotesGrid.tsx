import Note from "../Note/Note";
import Masonry from "react-masonry-css";
import { makeStyles, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    marginBottom: theme.spacing(7)
  },
  notesGrid: {
    display: "flex",
    width: "100%",
    alignItems: "flex-start",
    margin: "auto"
  },
  notesGridItem: {
    maxWidth: 240,
    width: 240,
    height: "100%",
    marginLeft: theme.spacing(1),
    backgroundClip: "padding-box",
    "& > div": {
      marginBottom: theme.spacing(1) // space between items
    }
  },
  title: {
    textTransform: "uppercase",
    margin: theme.spacing(0, 0, 1, 3),
    color: theme.palette.text.secondary
  }
}));

const breakpointColumnsObj = {
  default: 7,
  2100: 6,
  1700: 5,
  1500: 4,
  1250: 3,
  1050: 2,
  800: 1
};

type props = {
  notes: any[] | null | undefined;
  title?: string;
};

const Notes: React.FC<props> = ({ notes, title }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Typography variant="caption" component="small" className={classes.title}>
        {title}
      </Typography>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={classes.notesGrid}
        columnClassName={classes.notesGridItem}
      >
        {notes &&
          notes.map((notesProps) => (
            <Note key={notesProps.id} {...notesProps} />
          ))}
      </Masonry>
    </Container>
  );
};

export default Notes;
