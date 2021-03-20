import { useContext, useEffect, useState } from "react";
import { RouteChildrenProps } from "react-router";
import { GlobalStateContext } from "../../StateProvider";
import { isLoggedIn } from "../../api";
import NavBar from "../../Components/NavBar/NavBar";
import { makeStyles } from "@material-ui/core";
import NotesGrid from "../NotesGrid/NotesGrid";
import NewNoteBar from "../../Components/NewNoteBar/NewNoteBar";
import { useFetchAllMyNotes } from "../../Hooks/queries";
import Drawer from "../../Components/LeftDrawer/LeftDrawer";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    height: "100vh",
    overflow: "auto",
    display: "flex",
    flexDirection: "column"
  },
  newNoteContainer: {
    display: "grid",
    placeItems: "center",
    padding: theme.spacing(4, 0)
  },
  newNoteWrapper: {
    width: "100%",
    maxWidth: 600
  },
  content: {
    height: "auto",
    flexGrow: 1,
    display: "flex"
  }
}));

const Home: React.FC<RouteChildrenProps> = ({ history }) => {
  const { data: notesData } = useFetchAllMyNotes();
  const [isLoading, setIsLoading] = useState(true);
  let ctx = useContext(GlobalStateContext);
  //TODO: notifications on the notes

  const classes = useStyles();

  useEffect(() => {
    isLoggedIn()
      .then((data) => {
        setIsLoading(false);
        ctx.userData = data;
      })
      .catch(() => history.replace("/"));
  }, []);

  if (isLoading) return null;

  const pinnedNotes = notesData?.filter(
    (note) => note.pinned && !note.archived
  );
  const otherNotes = notesData?.filter(
    (note) => !note.pinned && !note.archived
  );

  return (
    <div className={classes.pageContainer}>
      <div>
        <NavBar />
      </div>
      <div className={classes.content}>
        <Drawer />
        <div style={{ flexGrow: 1 }}>
          <div className={classes.newNoteContainer}>
            <div className={classes.newNoteWrapper}>
              <NewNoteBar />
            </div>
          </div>
          {pinnedNotes && pinnedNotes.length > 0 ? (
            <>
              <NotesGrid title="Pinned" notes={pinnedNotes} />
              {otherNotes && otherNotes.length > 0 && (
                <NotesGrid title="Others" notes={otherNotes} />
              )}
            </>
          ) : (
            <NotesGrid notes={notesData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
