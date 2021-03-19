import { useContext, useEffect, useState } from "react";
import { RouteChildrenProps } from "react-router";
import { GlobalStateContext } from "../../StateProvider";
import { isLoggedIn } from "../../api";
import NavBar from "../../Components/NavBar/NavBar";
import { makeStyles } from "@material-ui/core";
import Notes from "../Notes/Notes";
import NewNoteBar from "../../Components/NewNoteBar/NewNoteBar";
import EditNote from "../../Components/EditNote/EditNote";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    height: "100vh",
    overflow: "auto"
  },
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

const Home: React.FC<RouteChildrenProps> = ({ history }) => {
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

  return (
    <div className={classes.pageContainer}>
      <NavBar />
      <div>
        {/* Menu on the left here */}
        <div className={classes.newNoteContainer}>
          <div className={classes.newNoteWrapper}>
            <NewNoteBar />
          </div>
        </div>
        <Notes />
      </div>
    </div>
  );
};

export default Home;
