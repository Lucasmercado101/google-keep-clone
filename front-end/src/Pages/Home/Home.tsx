import { useContext, useEffect } from "react";
import { RouteChildrenProps } from "react-router";
import { GlobalStateContext } from "../../StateProvider";
import { isLoggedIn } from "../../api";
import NavBar from "../../Components/NavBar/NavBar";

const Home: React.FC<RouteChildrenProps> = ({ history }) => {
  let ctx = useContext(GlobalStateContext);
  //TODO: notifications on the notes
  useEffect(() => {
    isLoggedIn()
      .then((data) => {
        ctx.userData = data;
      })
      .catch(() => history.replace("/"));
  }, []);

  return (
    <div>
      <NavBar />
    </div>
  );
};

export default Home;
