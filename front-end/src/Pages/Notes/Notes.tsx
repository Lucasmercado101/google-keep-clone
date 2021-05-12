import { makeStyles } from "@material-ui/core";
import NewNoteBar from "../../Components/NewNoteBar/NewNoteBar";
import { useGetPinnedNotes } from "../../Hooks/queries";
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

  return (
    <div>
      <div className={classes.newNoteContainer}>
        <div className={classes.newNoteWrapper}>
          <NewNoteBar />
        </div>
      </div>
      {pinnedNotes.length && <NotesGrid title="Pinned" notes={pinnedNotes} />}
      {/* {notesData && notesData.pinned.length ? (
        <>
          <NotesGrid title="Pinned" notes={notesData.pinned} />
          {notesData.other && notesData.other.length > 0 && (
            <NotesGrid title="Others" notes={notesData.other} />
          )}
        </>
      ) : (
        notesData && <NotesGrid notes={notesData.other} />
      )} */}
    </div>
  );
};

export default Notes;
