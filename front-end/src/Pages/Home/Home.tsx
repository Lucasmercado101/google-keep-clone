import { useContext, useEffect, useState } from "react";
import { RouteChildrenProps } from "react-router";
import { GlobalStateContext } from "../../StateProvider";
import { isLoggedIn } from "../../api";
import NavBar from "../../Components/NavBar/NavBar";
import { makeStyles } from "@material-ui/core";
// import { useFetchAllMyNotes } from "../../Hooks/queries";
import Drawer from "../../Components/LeftDrawer/LeftDrawer";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Archived from "../Archived/Archived";
import Notes from "../Notes/Notes";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    position: "relative"
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
    paddingTop: theme.spacing(8),
    height: "auto",
    flexGrow: 1,
    display: "flex"
  }
}));

const Home: React.FC<RouteChildrenProps> = ({ history }) => {
  // const { data: notesData } = useFetchAllMyNotes();
  const [isLoading, setIsLoading] = useState(true);
  let ctx = useContext(GlobalStateContext);
  const { path } = useRouteMatch();
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
      <div className={classes.content}>
        <Drawer />
        <div style={{ flexGrow: 1, zIndex: 1, position: "relative" }}>
          <Switch>
            <Route exact path="/notes/" component={Notes} />
            <Route exact path="/notes/archived" component={Archived} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Home;
