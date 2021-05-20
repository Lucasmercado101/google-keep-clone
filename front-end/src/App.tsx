import { useEffect, useLayoutEffect } from "react";
import Login from "./Pages/Login/Login";
import { observer } from "mobx-react-lite";
import Register from "./Pages/Register/Register";
import { statesTypes, sendTypes } from "./routerMachine";
import { useRouteNode } from "react-router5";
import NotesHome from "./Pages/Home";
import { useRouterFSM } from "./RouterContext";
import HomeMachineContext from "./Pages/Home/homeMachine/homeMachineContext";

const App = () => {
  const [state, send] = useRouterFSM();
  const { route } = useRouteNode("");

  useLayoutEffect(() => {
    switch (route.name) {
      case "register":
        send(sendTypes.GO_TO_REGISTER);
        break;
      case "login":
        send(sendTypes.GO_TO_LOGIN);
        break;
      case "notes":
        send(sendTypes.LOGGED_IN_SUCCESSFULLY);
        break;
      default:
        send(sendTypes.GO_TO_LOGIN);
        break;
    }
  }, [route.name]);

  switch (true) {
    case state.matches(statesTypes.LOGIN):
      return <Login />;
    case state.matches(statesTypes.REGISTER):
      return <Register />;
    case state.matches(statesTypes.NOTES_MAIN):
      return (
        <HomeMachineContext>
          <NotesHome />
        </HomeMachineContext>
      );
    default:
      return null;
  }
};

export default App;
