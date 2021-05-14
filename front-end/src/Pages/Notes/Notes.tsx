import { makeStyles } from "@material-ui/core";
import NewNoteBar from "../../Components/NewNoteBar/NewNoteBar";
import { useGetPinnedNotes, useGetNormalNotes } from "../../Hooks/queries";
import NotesGrid from "../../Components/NotesGrid/NotesGrid";

const useStyles = makeStyles((theme) => ({
  newNoteContainer: {
    display: "grid",
    placeItems: "center",
    padding: theme.spacing(4, 0)
  },
  newNoteWrapper: {
    width: "100%",
    maxWidth: 600
  }
}));

const Notes: React.FC = () => {
  const classes = useStyles();

  const { data: pinnedNotes = [] } = useGetPinnedNotes();
  const { data: normalNotes } = useGetNormalNotes();

  return (
    <div>
      <div className={classes.newNoteContainer}>
        <div className={classes.newNoteWrapper}>
          <NewNoteBar />
        </div>
      </div>
      {pinnedNotes.length ? (
        <>
          {pinnedNotes && <NotesGrid title="Pinned" notes={pinnedNotes} />}
          {normalNotes && <NotesGrid title="Others" notes={normalNotes} />}
        </>
      ) : (
        normalNotes && <NotesGrid notes={normalNotes} />
      )}
    </div>
  );
};

export default Notes;
