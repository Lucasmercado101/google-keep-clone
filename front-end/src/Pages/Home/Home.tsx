import { useContext, useEffect } from "react";
import { RouteChildrenProps } from "react-router";
import { GlobalStateContext } from "../../StateProvider";
import { isLoggedIn } from "../../api";

const Home: React.FC<RouteChildrenProps> = ({ history }) => {
  let ctx = useContext(GlobalStateContext);

  useEffect(() => {
    isLoggedIn()
      .then((data) => {
        ctx.userData = data;
      })
      .catch(() => history.replace("/"));
  }, []);

  return <div></div>;
};

export default Home;
