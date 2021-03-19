import { useContext, useEffect, useState } from "react";
import { RouteChildrenProps } from "react-router";
import { GlobalStateContext } from "../../StateProvider";
import { isLoggedIn } from "../../api";
import NavBar from "../../Components/NavBar/NavBar";

const Home: React.FC<RouteChildrenProps> = ({ history }) => {
  const [isLoading, setIsLoading] = useState(true);
  let ctx = useContext(GlobalStateContext);
  //TODO: notifications on the notes

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
    <div>
      <NavBar />
    </div>
  );
};

export default Home;
